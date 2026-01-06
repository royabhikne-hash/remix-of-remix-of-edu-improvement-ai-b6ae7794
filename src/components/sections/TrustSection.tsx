import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Handshake, UserCheck, Lock, Building2 } from "lucide-react";

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const patternOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.08, 0.03]);

  const trustPillars = [
    {
      icon: Handshake,
      title: "Built for Schools, Not Against Them",
      description:
        "We work alongside educational institutions, enhancing rather than disrupting their processes.",
    },
    {
      icon: UserCheck,
      title: "Teacher-Supportive, Not Teacher-Replacing",
      description:
        "Teachers remain central to education. We support their work with better student insights.",
    },
    {
      icon: Lock,
      title: "Student Safety & Data Privacy Focused",
      description:
        "Comprehensive data protection policies ensure student information is always secure.",
    },
    {
      icon: Building2,
      title: "Institution-Ready Platform",
      description:
        "Enterprise-grade infrastructure designed for schools and educational boards.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-foreground text-primary-foreground relative overflow-hidden"
    >
      {/* Animated background pattern with parallax */}
      <motion.div
        style={{ y: backgroundY, opacity: patternOpacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
      />

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
            className="inline-block text-secondary font-medium text-sm uppercase tracking-wide"
          >
            Our Commitment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading mt-3 mb-6"
          >
            Trust & Responsibility
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 leading-relaxed"
          >
            Education technology comes with responsibility. We take that
            seriously in everything we build.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: { duration: 0.2 },
              }}
              className="flex gap-5 p-6 rounded-xl border border-primary-foreground/10 hover:border-primary-foreground/25 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 flex items-center justify-center transition-colors"
              >
                <pillar.icon className="w-7 h-7 text-secondary" />
              </motion.div>
              <div>
                <h3 className="text-xl font-heading mb-2 group-hover:text-secondary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
