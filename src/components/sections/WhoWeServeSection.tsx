import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, School, Users, Check } from "lucide-react";

const WhoWeServeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const audiences = [
    {
      icon: GraduationCap,
      title: "For Students",
      description: "Build confidence and clarity in your self-study journey",
      benefits: [
        "Confidence during self-study sessions",
        "Better clarity of concepts",
        "Awareness of strengths and improvement areas",
        "Structured approach to learning",
      ],
      color: "primary" as const,
    },
    {
      icon: School,
      title: "For Schools",
      description: "Gain visibility into student engagement and progress",
      benefits: [
        "Visibility into student study behavior",
        "Academic progress insights at scale",
        "Centralized and simple monitoring",
        "Data-driven intervention support",
      ],
      color: "accent" as const,
    },
    {
      icon: Users,
      title: "For Parents",
      description: "Stay informed and connected to your child's learning",
      benefits: [
        "Transparent proof of study effort",
        "Regular progress updates",
        "Peace of mind about engagement",
        "Clear communication with schools",
      ],
      color: "secondary" as const,
    },
  ];

  const colorVariants = {
    primary: {
      bg: "bg-primary/10",
      icon: "text-primary",
      check: "text-primary",
      hover: "group-hover:bg-primary/20",
    },
    accent: {
      bg: "bg-accent/10",
      icon: "text-accent",
      check: "text-accent",
      hover: "group-hover:bg-accent/20",
    },
    secondary: {
      bg: "bg-secondary/20",
      icon: "text-secondary",
      check: "text-secondary",
      hover: "group-hover:bg-secondary/30",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      id="who-we-serve"
      ref={sectionRef}
      className="section-padding bg-muted/30 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-medium text-xs md:text-sm uppercase tracking-wide"
          >
            Who We Serve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-2 md:mt-3 mb-4 md:mb-6"
          >
            Built for Everyone in the Education Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Study Buddy AI bridges the gap between students, schools, and
            parents—creating a unified approach to better academic outcomes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-4 md:gap-8"
          style={{ perspective: "1000px" }}
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              variants={cardVariants}
              whileHover={{
                y: -12,
                transition: { duration: 0.3 },
              }}
              className="group bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative corner */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 ${colorVariants[audience.color].bg} rounded-bl-[100%] opacity-50`}
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${colorVariants[audience.color].bg} ${colorVariants[audience.color].hover} flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300`}
              >
                <audience.icon
                  className={`w-6 h-6 md:w-8 md:h-8 ${colorVariants[audience.color].icon}`}
                />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                {audience.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">{audience.description}</p>

              <ul className="space-y-2 md:space-y-3">
                {audience.benefits.map((benefit, benefitIndex) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 + benefitIndex * 0.05 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <Check
                      className={`w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0 ${colorVariants[audience.color].check}`}
                    />
                    <span className="text-sm md:text-base text-foreground/90">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
