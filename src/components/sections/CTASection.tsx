import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
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

      {/* Animated concentric circles */}
      {!reducedMotion && (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/15"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-primary/5"
          />
        </>
      )}

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mb-4 md:mb-6">
            Let's Improve Student Study Habits Together
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-10">
            Let's create better, more transparent learning experiences for students together.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <motion.div whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
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
            </motion.div>
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
