'use client';

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    folderName?: string;
    currentImageUrl?: string;
    className?: string;
    label?: string;
}

export function ImageUpload({
    onUploadComplete,
    folderName = 'images',
    currentImageUrl,
    className,
    label = "Image"
}: ImageUploadProps) {
    const { storage, app } = useFirebase();
    console.log("ImageUpload context:", { hasStorage: !!storage, hasApp: !!app }); // DEBUG
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!storage) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Le service de stockage n'est pas initialisé.",
            });
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                variant: "destructive",
                title: "Format invalide",
                description: "Veuillez sélectionner une image (JPG, PNG, WEBP).",
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                variant: "destructive",
                title: "Fichier trop volumineux",
                description: "L'image ne doit pas dépasser 5 Mo.",
            });
            return;
        }

        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        setIsUploading(true);
        setProgress(0);

        const storageRef = ref(storage, `${folderName}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error("Upload error details:", error);
                console.error("Storage ref:", storageRef);
                setIsUploading(false);
                toast({
                    variant: "destructive",
                    title: "Erreur d'upload",
                    description: `Impossible d'uploader l'image: ${error.message}`,
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setIsUploading(false);
                    onUploadComplete(downloadURL);
                    setPreviewUrl(downloadURL); // Use the strict remote URL
                    toast({
                        title: "Image uploadée",
                        description: "L'image a été enregistrée avec succès.",
                    });
                });
            }
        );
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onUploadComplete('');
    };

    return (
        <div className={cn("space-y-4", className)}>
            {label && <p className="text-sm font-medium text-foreground">{label}</p>}

            {!previewUrl ? (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/5 border-primary/20 hover:bg-secondary/10 hover:border-primary/50 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            <ImagePlus className="w-10 h-10 mb-4 text-primary/40 group-hover:text-primary transition-colors" />
                            <p className="mb-2 text-sm text-foreground/70"><span className="font-semibold text-primary">Cliquez pour uploader</span> ou glissez-déposez</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (Max 5Mo)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </label>
                </div>
            ) : (
                <div className="relative rounded-lg overflow-hidden border border-border bg-background w-full h-64 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                    />

                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full shadow-md"
                            onClick={handleRemove}
                            disabled={isUploading}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {isUploading && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 p-6">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            <Progress value={progress} className="w-full h-2" />
                            <p className="text-sm font-medium">{Math.round(progress)}%</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
