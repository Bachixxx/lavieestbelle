'use client';

import { useState } from 'react';
import { useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Trash2 } from 'lucide-react';
import { addDoc, deleteDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

const { firestore: db } = initializeFirebase();

interface Testimonial {
    id: string;
    author: string;
    role: string;
    text: string;
    rating: number;
    createdAt: number;
}

export function TestimonialsManager() {
    const { data: testimonials, loading } = useCollection<Testimonial>('testimonials');
    const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        author: '',
        role: 'Cliente',
        text: '',
        rating: 5
    });

    const handleAdd = async () => {
        try {
            await addDoc(collection(db, 'testimonials'), {
                ...newTestimonial,
                createdAt: Date.now()
            });
            setIsAdding(false);
            setNewTestimonial({ author: '', role: 'Cliente', text: '', rating: 5 });
            toast({ title: "Témoignage ajouté" });
        } catch (error) {
            console.error("Error adding testimonial:", error);
            toast({ title: "Erreur lors de l'ajout", variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return;
        try {
            await deleteDoc(doc(db, 'testimonials', id));
            toast({ title: "Témoignage supprimé" });
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast({ title: "Erreur lors de la suppression", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-primary">Gestion des Témoignages</h2>
                    <p className="text-muted-foreground">Ajoutez ou supprimez les avis afficher sur la page d'accueil.</p>
                </div>
                <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "default"}>
                    {isAdding ? "Annuler" : "Ajouter un témoignage"}
                </Button>
            </div>

            {isAdding && (
                <Card className="bg-secondary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle>Nouveau Témoignage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Auteur</Label>
                                <Input
                                    value={newTestimonial.author}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                                    placeholder="Prénom ou Nom"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Rôle (ex: Cliente Fidel, Visiteur...)</Label>
                                <Input
                                    value={newTestimonial.role}
                                    onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Note (1-5)</Label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                                        className={`transition-all hover:scale-110 ${star <= newTestimonial.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                                    >
                                        <Star className="w-8 h-8" fill={star <= newTestimonial.rating ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea
                                value={newTestimonial.text}
                                onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                                placeholder="Le contenu du témoignage..."
                                className="min-h-[100px]"
                            />
                        </div>
                        <Button onClick={handleAdd} className="w-full">Enregistrer le témoignage</Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {loading ? <p>Chargement...</p> : testimonials?.map((testimonial) => (
                    <Card key={testimonial.id} className="relative group hover:shadow-lg transition-all">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        {testimonial.author}
                                        <span className="text-sm font-normal text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">{testimonial.role}</span>
                                    </CardTitle>
                                    <div className="flex text-primary mt-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-muted-foreground/20"}`} />
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDelete(testimonial.id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground italic">&ldquo;{testimonial.text}&rdquo;</p>
                            <p className="text-xs text-muted-foreground/50 mt-4 text-right">
                                {new Date(testimonial.createdAt).toLocaleDateString()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
