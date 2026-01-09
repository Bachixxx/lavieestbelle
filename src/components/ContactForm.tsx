"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "@/app/actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
})

export function ContactForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values);
    if (result.success) {
      toast({
        title: "Message envoyé !",
        description: "Merci, nous vous répondrons dans les plus brefs délais.",
      })
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-foreground/80">Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    {...field}
                    className="rounded-none border-x-0 border-t-0 border-b border-primary/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg placeholder:text-muted-foreground/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-foreground/80">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre adresse e-mail"
                    {...field}
                    className="rounded-none border-x-0 border-t-0 border-b border-primary/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg placeholder:text-muted-foreground/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-foreground/80">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px] resize-none rounded-none border-x-0 border-t-0 border-b border-primary/20 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary transition-colors text-lg placeholder:text-muted-foreground/50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full md:w-auto px-8 rounded-full shadow-lg hover:shadow-xl transition-all" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Form>
  )
}
