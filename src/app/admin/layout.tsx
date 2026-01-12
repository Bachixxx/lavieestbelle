'use client';

import { useAuth } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { logOut } from '@/firebase/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logOut();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
                    <div className="font-bold text-lg">
                        <Link href="/admin">Admin Dashboard</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline-block">
                            {user.email}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link href="/">Voir le site</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}
