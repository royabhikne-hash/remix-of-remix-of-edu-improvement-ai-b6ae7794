import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Lightbulb, Target, Share2, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SolutionSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    { icon: Lightbulb, title: "Digital Study Companion", description: "A supportive presence during self-study that helps students stay focused and engaged." },
    { icon: Target, title: "Structured Self-Study", description: "Encourages disciplined, methodical study habits that lead to better understanding." },
    { icon: CheckCircle2, title: "Reflection & Clarity", description: "Helps students assess their own understanding and identify areas that need attention." },
    { icon: Share2, title: "Meaningful Progress Signals", description: "Shares clear, actionable insights with schools and parents—no confusion, no guesswork." },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.15 } },
  }), [reducedMotion]);

  const featureVariants = useMemo(() => ({
    hidden: { opacity: 0, x: reducedMotion ? 0 : -40, filter: reducedMotion ? "blur(0px)" : "blur(6px)" },
    visible: {
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { duration: reducedMotion ? 0.2 : 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section ref={sectionRef} id="solution" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/30 to-transparent" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reducedMotion ? 0.3 : 0.7 }}
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wide">
              Our Solution
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-3 mb-6">
              A Smarter Way to Support Student Learning
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Study Buddy AI is not a teaching platform or online tuition.
              It's a thoughtful study companion that enhances self-study while
              creating transparency for everyone invested in a student's success.
            </p>

            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-6">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={featureVariants} className="flex gap-4 group">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300"
                    whileHover={reducedMotion ? {} : { scale: 1.15, rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dashboard Visual with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : 50, rotateY: reducedMotion ? 0 : 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: reducedMotion ? 0.3 : 1, delay: reducedMotion ? 0 : 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative"
            style={{ perspective: "1200px" }}
            whileHover={reducedMotion ? {} : { rotateY: -5, scale: 1.02, transition: { duration: 0.4 } }}
          >
            <div className="relative glass-strong rounded-2xl p-8 shadow-elevated">
              <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 gap-4 h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="border-r border-foreground" />
                  ))}
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Study Progress</p>
                    <p className="text-2xl font-heading text-foreground">This Week</p>
                  </div>
                  <motion.div
                    className="w-16 h-16 rounded-full border-4 border-primary bg-primary/10 flex items-center justify-center"
                    animate={reducedMotion ? {} : { rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-xl font-bold text-primary">78%</span>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {["Mathematics", "Science", "English"].map((subject, i) => (
                    <div key={subject}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{subject}</span>
                        <span className="text-muted-foreground">{[85, 72, 90][i]}%</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${[85, 72, 90][i]}%` } : {}}
                          transition={{ duration: reducedMotion ? 0.3 : 1.5, delay: reducedMotion ? 0 : 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
                          className="h-full rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div
                  className="bg-primary-light rounded-xl p-4 mt-6"
                  whileHover={reducedMotion ? {} : { scale: 1.02 }}
                >
                  <p className="text-sm font-medium text-primary">Weekly Insight</p>
                  <p className="text-foreground mt-1">
                    Focus improved by 15% compared to last week. Great progress in Mathematics!
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.8 }}
              className="absolute -top-4 -right-4 glass-strong px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
              whileHover={reducedMotion ? {} : { scale: 1.1, y: -3 }}
            >
              <span className="gradient-text">Real-time Updates ✓</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
