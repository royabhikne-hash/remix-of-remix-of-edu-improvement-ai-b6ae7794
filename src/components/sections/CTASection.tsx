import { motion } from "framer-motion";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CTASection = () => {
  const reducedMotion = useReducedMotion();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.7 },
    },
  }), [reducedMotion]);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-primary-light/50" />

      {/* Static decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-primary/5" />

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4 md:mb-6">
            Let's Improve Student Study Habits Together
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-10">
            Let's create better, more transparent learning experiences for students together.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="group text-sm md:text-base"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              Contact Our Team
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No commitment required. We'll show you exactly how it works.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
