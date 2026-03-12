import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import heroImage from "@/assets/hero-students.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "15%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "20%"]);
  const imageRotateY = useTransform(scrollYProgress, [0, 0.5], [0, reducedMotion ? 0 : -5]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "50%"]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ["0%", reducedMotion ? "0%" : "40%"]);
  const decorScale = useTransform(scrollYProgress, [0, 0.5], [1, reducedMotion ? 1 : 1.2]);

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
    hidden: { opacity: 0, y: reducedMotion ? 0 : 40, filter: reducedMotion ? "blur(0px)" : "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reducedMotion ? 0.2 : 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
    >
      {/* Parallax Background with gradient mesh */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-primary-light/50 to-background"
      />

      {/* Animated gradient orbs */}
      {!reducedMotion && (
        <>
          <motion.div
            style={{ y: decorY1, scale: decorScale }}
            className="absolute top-40 left-10 w-48 md:w-80 h-48 md:h-80 rounded-full blur-3xl"
            animate={{
              background: [
                "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
                "radial-gradient(circle, hsl(262 83% 58% / 0.1) 0%, transparent 70%)",
                "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{ y: decorY2 }}
            className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
            animate={{
              background: [
                "radial-gradient(circle, hsl(160 84% 39% / 0.08) 0%, transparent 70%)",
                "radial-gradient(circle, hsl(217 91% 60% / 0.06) 0%, transparent 70%)",
                "radial-gradient(circle, hsl(160 84% 39% / 0.08) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}

      <div className="section-container relative z-10 py-8 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            style={reducedMotion ? undefined : { y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Learning Platform</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-tight mb-4 md:mb-6"
            >
              Improving How Students Study —{" "}
              <span className="gradient-text">
                With Trust, Clarity, and Accountability
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed"
            >
              An AI-powered study companion with board-wise MCQ tests, weekly assessments, 
              and district/school/coaching rankings — helping students build better self-study 
              habits while keeping schools, coaching centers, and parents informed.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12"
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="group text-sm md:text-base shadow-glow"
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

          {/* Hero Image with 3D perspective */}
          <motion.div
            style={reducedMotion ? undefined : { y: imageY, rotateY: imageRotateY }}
            initial={{ opacity: 0, scale: 0.9, x: reducedMotion ? 0 : 60, rotateY: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
            transition={{ duration: reducedMotion ? 0.3 : 1, delay: reducedMotion ? 0 : 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative"
            whileHover={reducedMotion ? {} : { scale: 1.02, rotateY: -3, transition: { duration: 0.3 } }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated" style={{ perspective: "1000px" }}>
              <img
                src={heroImage}
                alt="Indian students studying together with modern learning tools"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-primary/5" />
            </div>

            {/* Floating Card with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: reducedMotion ? 0 : 0.8 }}
              className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 glass-strong p-3 md:p-4 rounded-xl shadow-lg"
              whileHover={reducedMotion ? {} : { scale: 1.05, y: -5 }}
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

            {/* New floating badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : 1 }}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 glass-strong px-3 py-1.5 rounded-full shadow-lg"
              whileHover={reducedMotion ? {} : { scale: 1.1 }}
            >
              <span className="text-xs md:text-sm font-semibold gradient-text">✨ AI Powered</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
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
