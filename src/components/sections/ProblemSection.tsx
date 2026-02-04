import { motion } from "framer-motion";
import { useMemo } from "react";
import { EyeOff, HelpCircle, BarChart3 } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ProblemSection = () => {
  const reducedMotion = useReducedMotion();

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
        staggerChildren: reducedMotion ? 0 : 0.15,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.5 },
    },
  }), [reducedMotion]);

  return (
    <section
      id="problem"
      className="section-padding bg-muted/50 relative overflow-hidden"
    >
      {/* Static Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
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
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-4 md:gap-8"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              className="group bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
            >
              <div className="icon-container mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14">
                <problem.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-heading text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                {problem.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
