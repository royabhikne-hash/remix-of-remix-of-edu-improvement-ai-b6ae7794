import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { BookOpen, Heart, Flag, Users, Shield, Award } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import TiltCard from "@/components/ui/TiltCard";

const WhyUsSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const reasons = [
    { icon: BookOpen, title: "Encourages Disciplined Self-Study", description: "Promotes consistent, focused study habits that build lasting academic skills." },
    { icon: Heart, title: "Builds Accountability Without Pressure", description: "Creates healthy transparency without adding stress or surveillance anxiety." },
    { icon: Flag, title: "Designed for Indian Education", description: "Built with deep understanding of Indian curriculum, exam patterns, and learning culture." },
    { icon: Users, title: "School-Aligned & Parent-Friendly", description: "Works with existing school systems and keeps parents meaningfully informed." },
    { icon: Shield, title: "Privacy-First & Student-Safe", description: "Student data protection is foundational—never compromised, always respected." },
    { icon: Award, title: "Institution-Ready Platform", description: "Scalable, reliable, and built for deployment across schools of all sizes." },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.1 } },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section ref={sectionRef} id="why-us" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium text-xs md:text-sm uppercase tracking-wide">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-2 md:mt-3 mb-4 md:mb-6">
            Why Study Buddy AI?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We've built more than a product—we've built a philosophy around
            responsible, effective education technology.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
        >
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={cardVariants}>
              <TiltCard className="h-full" maxTilt={10}>
                <div className="group glass-strong rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-card transition-all duration-500 h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 md:mb-4 transition-colors">
                    <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {reason.description}
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

export default WhyUsSection;
