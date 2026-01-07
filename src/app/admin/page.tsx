'use client';
import { useCollection } from "@/firebase";
import { type Service } from "@/lib/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function AdminTableRowSkeleton() {
    return (
        <TableRow>
            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
            <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
        </TableRow>
    )
}


export default function AdminPage() {
    const { data: services, loading } = useCollection<Service>('services');

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          Gestion des Soins
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Modifier les prix, durées et descriptions des prestations.
        </p>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du Soin</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
                <>
                    <AdminTableRowSkeleton />
                    <AdminTableRowSkeleton />
                    <AdminTableRowSkeleton />
                    <AdminTableRowSkeleton />
                </>
            )}
            {services?.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell><Badge variant="secondary" className="capitalize">{service.category}</Badge></TableCell>
                <TableCell>{service.duration || 'N/A'}</TableCell>
                <TableCell className="text-right">{service.price}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
