import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CTASection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-primary-light/50" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
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
              className="group text-sm md:text-base shadow-glow"
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
