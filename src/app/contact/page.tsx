'use client';

import Image from 'next/image';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

import { Card, CardContent } from '@/components/ui/card';
import { getImageById } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactInfo {
    id: string;
    address: string;
    phone: string;
    email: string;
    openingHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    }
}

function ContactPageSkeleton() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-12">
            <div className="container mx-auto max-w-7xl px-4 space-y-12">
                <div className="text-center">
                    <Skeleton className="h-12 w-64 mx-auto" />
                    <Skeleton className="h-6 w-96 mx-auto mt-4" />
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
        </div>
    )
}

const defaultContactInfo: ContactInfo = {
    id: 'default',
    address: 'Chemin des Vignes 12, 1293 Bellevue, Suisse',
    phone: '+41 79 370 77 65',
    email: 'info@lavieestbelle.ch',
    openingHours: {
        weekdays: '09:00 - 19:00',
        saturday: '09:00 - 17:00',
        sunday: 'Fermé'
    }
};

export default function ContactPage() {
    const mapImage = getImageById('contact-map');
    const { data: contactInfo, loading } = useDoc<ContactInfo>('contactInfo/info');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo?.address || defaultContactInfo.address)}`;


    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <div className="bg-secondary/30 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight font-heading text-primary mb-4"
                    >
                        Nous Contacter
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
                    >
                        Une question ? Envie de prendre soin de vous ? Nous sommes à votre écoute pour vous conseiller.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 -mt-10 pb-24 relative z-10">

                {(loading ? <ContactPageSkeleton /> : (
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="lg:col-span-7 bg-background rounded-3xl p-8 md:p-12 shadow-xl border border-border/40"
                        >
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-foreground">Envoyez-nous un message</h2>
                            <ContactForm />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="lg:col-span-5 space-y-8"
                        >
                            <Card className="h-full border-0 shadow-xl bg-primary/5 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardContent className="p-8 md:p-10 space-y-10">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold mb-6 text-primary flex items-center gap-3">
                                            <MapPin className="h-6 w-6" /> Coordonnées
                                        </h3>
                                        <div className="space-y-4 pl-9">
                                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block text-lg hover:text-primary transition-colors leading-relaxed">
                                                {contactInfo?.address || defaultContactInfo.address}
                                            </a>
                                            <a href={`tel:${(contactInfo?.phone || defaultContactInfo.phone).replace(/\s/g, '')}`} className="block text-lg hover:text-primary transition-colors">
                                                {contactInfo?.phone || defaultContactInfo.phone}
                                            </a>
                                            <a href={`mailto:${contactInfo?.email || defaultContactInfo.email}`} className="block text-lg hover:text-primary transition-colors">
                                                {contactInfo?.email || defaultContactInfo.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-heading font-bold mb-6 text-primary flex items-center gap-3">
                                            <Clock className="h-6 w-6" /> Horaires
                                        </h3>
                                        <div className="space-y-3 pl-9 text-muted-foreground text-lg">
                                            <div className="flex justify-between border-b border-primary/10 pb-2">
                                                <span>Lundi - Vendredi</span>
                                                <span className="font-medium text-foreground">{contactInfo?.openingHours.weekdays || defaultContactInfo.openingHours.weekdays}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-primary/10 pb-2">
                                                <span>Samedi</span>
                                                <span className="font-medium text-foreground">{contactInfo?.openingHours.saturday || defaultContactInfo.openingHours.saturday}</span>
                                            </div>
                                            <div className="flex justify-between pt-1">
                                                <span>Dimanche</span>
                                                <span className="font-medium text-foreground">{contactInfo?.openingHours.sunday || defaultContactInfo.openingHours.sunday}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                ))}

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-12 md:mt-24 rounded-3xl overflow-hidden shadow-2xl relative h-[450px] md:h-[550px]"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2758.7381205014076!2d6.152751975795461!3d46.255433680300634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65ca6471a41b%3A0xd2c90f416c0d17e3!2sRte%20de%20Lausanne%20341%2C%201293%20Bellevue!5e0!3m2!1sfr!2sch!4v1767978463551!5m2!1sfr!2sch"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </motion.div>
            </div>
        </div>
    );
}
