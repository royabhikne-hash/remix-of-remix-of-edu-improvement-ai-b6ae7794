import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import heroImage from "@/assets/hero-students.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Pre-compute all transforms to avoid inline creation
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "15%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, reducedMotion ? 1 : 0]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "50%"]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "40%"]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.15,
        delayChildren: reducedMotion ? 0 : 0.2,
      },
    },
  }), [reducedMotion]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.6, ease: [0, 0, 0.2, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-primary-light/50 to-background"
      />

      {/* Decorative Elements with Parallax - Only on desktop */}
      {!reducedMotion && (
        <>
          <motion.div
            style={{ y: decorY1 }}
            className="absolute top-40 left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: decorY2 }}
            className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl"
          />
        </>
      )}

      <div className="section-container relative z-10 py-8 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            style={reducedMotion ? undefined : { y: textY, opacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-tight mb-4 md:mb-6"
            >
              Improving How Students Study —{" "}
              <span className="text-primary">
                With Trust, Clarity, and Accountability
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
            >
              A digital study companion that helps students develop better
              self-study habits while keeping schools and parents genuinely
              informed about academic progress.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12"
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="group text-sm md:text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="heroSecondary" 
                size="lg" 
                className="text-sm md:text-base"
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Meet the Team
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            style={reducedMotion ? undefined : { y: imageY }}
            initial={{ opacity: 0, scale: 0.95, x: reducedMotion ? 0 : 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: reducedMotion ? 0 : 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Indian students studying together with modern learning tools"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: reducedMotion ? 0 : 0.8 }}
              className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-card p-3 md:p-4 rounded-xl shadow-card border border-border"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm md:text-base">Study Insights</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Updated in real-time
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Only on desktop */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
