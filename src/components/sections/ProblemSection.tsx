import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { EyeOff, HelpCircle, BarChart3 } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import TiltCard from "@/components/ui/TiltCard";

const ProblemSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: EyeOff,
      title: "Progress Remains Invisible",
      description:
        "Students put in hours of study, but there's no clear way to measure or communicate their actual understanding and progress.",
    },
    {
      icon: HelpCircle,
      title: "Parents Lack Reliable Proof",
      description:
        "Without tangible evidence, parents are left wondering whether their child is truly engaged or just going through the motions.",
    },
    {
      icon: BarChart3,
      title: "Schools Need Better Data",
      description:
        "Institutions lack consistent, meaningful data about student engagement during self-study hours, making intervention difficult.",
    },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.2,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-padding bg-muted/50 relative overflow-hidden"
    >
      {/* Background decorations — desktop only */}
      {!reducedMotion && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl opacity-[0.03]"
          />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium text-xs md:text-sm uppercase tracking-wide">
            The Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-2 md:mt-3 mb-4 md:mb-6">
            The Real Problem with Self-Study
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Every day, millions of students sit down to study. But the gap
            between studying and truly learning remains invisible to everyone
            who matters.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-4 md:gap-8"
        >
          {problems.map((problem) => (
            <motion.div key={problem.title} variants={cardVariants}>
              <TiltCard className="h-full">
                <div className="group glass-strong rounded-xl md:rounded-2xl p-5 md:p-8 shadow-card hover:shadow-elevated transition-all duration-500 h-full">
                  <div className="icon-container mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14">
                    <problem.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl font-heading text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
