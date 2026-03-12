import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name, school_name: "Franchise Inquiry",
        email: result.data.email, message: result.data.message,
      });
      if (error) throw error;
      toast({ title: "Inquiry Submitted!", description: "Thank you for your interest. We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ title: "Submission Failed", description: "There was an error submitting your inquiry. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-gradient-to-b from-background to-primary-light/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-4">
            Get Our Franchise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4">
            Interested in a Franchise?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Fill out the form below or reach out to us directly
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <motion.a href="tel:+917091165195" className="flex items-center gap-2 hover:text-primary transition-colors" whileHover={{ scale: 1.05 }}>
              <Phone className="w-5 h-5" /><span>+91 7091165195</span>
            </motion.a>
            <motion.a href="tel:+919155352921" className="flex items-center gap-2 hover:text-primary transition-colors" whileHover={{ scale: 1.05 }}>
              <Phone className="w-5 h-5" /><span>+91 9155352921</span>
            </motion.a>
            <motion.a href="mailto:royabhikne@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors" whileHover={{ scale: 1.05 }}>
              <Mail className="w-5 h-5" /><span>royabhikne@gmail.com</span>
            </motion.a>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /><span>Kishanganj, Bihar, India</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-strong rounded-2xl p-8 shadow-elevated space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-foreground">Your Name</Label>
              <Input id="name" placeholder="Enter your full name" value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4 text-muted-foreground" />Email Address
              </Label>
              <Input id="email" type="email" placeholder="your.email@school.edu" value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)} className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />Your Message
              </Label>
              <Textarea id="message" placeholder="Tell us about your school and what you're looking for..." rows={5}
                value={formData.message} onChange={(e) => handleChange("message", e.target.value)}
                className={errors.message ? "border-destructive" : ""} />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" variant="hero" size="xl" className="w-full shadow-glow" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : (<><Send className="w-5 h-5" />Submit Inquiry</>)}
              </Button>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground">
              We typically respond within 24 hours on business days.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
