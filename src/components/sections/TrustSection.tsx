import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Handshake, UserCheck, Lock, Building2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TrustSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const trustPillars = [
    { icon: Handshake, title: "Built for Schools, Not Against Them", description: "We work alongside educational institutions, enhancing rather than disrupting their processes." },
    { icon: UserCheck, title: "Teacher-Supportive, Not Teacher-Replacing", description: "Teachers remain central to education. We support their work with better student insights." },
    { icon: Lock, title: "Student Safety & Data Privacy Focused", description: "Comprehensive data protection policies ensure student information is always secure." },
    { icon: Building2, title: "Institution-Ready Platform", description: "Enterprise-grade infrastructure designed for schools and educational boards." },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.15 } },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, x: reducedMotion ? 0 : -50, rotateY: reducedMotion ? 0 : -10 },
    visible: {
      opacity: 1, x: 0, rotateY: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  }), [reducedMotion]);

  return (
    <section ref={sectionRef} className="section-padding bg-foreground text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        animate={reducedMotion ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={reducedMotion ? {} : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30, filter: reducedMotion ? "blur(0px)" : "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-medium text-sm uppercase tracking-wide">
            Our Commitment
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mt-3 mb-6">
            Trust & Responsibility
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed">
            Education technology comes with responsibility. We take that seriously in everything we build.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
          style={{ perspective: "1200px" }}
        >
          {trustPillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              whileHover={reducedMotion ? {} : { scale: 1.03, rotateY: 3, transition: { duration: 0.3 } }}
              className="flex gap-5 p-6 rounded-xl border border-primary-foreground/10 hover:border-primary-foreground/25 bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-all duration-300 group backdrop-blur-sm"
            >
              <motion.div
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 flex items-center justify-center transition-colors"
                whileHover={reducedMotion ? {} : { rotate: [0, -15, 15, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
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
