import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import TiltCard from "@/components/ui/TiltCard";
import abhishekRoyImage from "@/assets/abhishek-roy.jpg";
import druvaImage from "@/assets/druva.jpg";
import sambharamImage from "@/assets/sambharam.jpg";
import zulfequarAhmadImage from "@/assets/zulfequar-ahmad.jpg";
import adityaPaswanImage from "@/assets/aditya-paswan.jpg";
import anmolImage from "@/assets/anmol.jpg";

const TeamSection = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const team = [
    { name: "Abhishek Roy", role: "Founder & CEO", mission: "Education should empower, not overwhelm. Every student deserves clarity.", image: abhishekRoyImage, linkedin: "https://www.linkedin.com/in/abhishek-roy-8286663a1" },
    { name: "Druva SM", role: "Co-Founder & Chief Technology Officer", mission: "Building scalable AI systems that make quality education accessible to every student.", image: druvaImage, linkedin: "#" },
    { name: "Sambharam G", role: "Co-Founder & Managing Director (MD)", mission: "Drives strategic direction and innovation to expand Study Buddy AI's impact across education.", image: sambharamImage, linkedin: "https://www.linkedin.com/in/sambhram-g-b2826b371" },
    { name: "Zulfequar Ahmad", role: "Co-Founder & Chief Operating Officer (COO)", mission: "Leads overall operations, strategic partnerships, and ensures seamless execution across all teams.", image: zulfequarAhmadImage, linkedin: "#" },
    { name: "Anmol Yadav", role: "Co-Founder & Director of Operations (DOO)", mission: "Works directly with schools & coaching centers for demos, onboarding, and daily coordination.", image: anmolImage, linkedin: "#" },
    { name: "Priyanka", role: "Chief Marketing Officer (CMO)", mission: "Leads marketing strategy and brand growth to expand Study Buddy AI's reach across educational institutions.", image: "/placeholder.svg", linkedin: "#" },
    { name: "Aditya Paswan", role: "Group Ops Team", mission: "Supports group operations and coordination to streamline Study Buddy AI's outreach efforts.", image: adityaPaswanImage, linkedin: "#" },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.12 } },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: reducedMotion ? 0.2 : 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }), [reducedMotion]);

  return (
    <section ref={sectionRef} id="team" className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium text-xs md:text-sm uppercase tracking-wide">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-2 md:mt-3 mb-4 md:mb-6">
            The People Behind Study Buddy AI
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Educators, technologists, and visionaries who believe in the power of transparent, supportive learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              <TiltCard className="text-center" maxTilt={8}>
                <div className="group">
                  <div className="relative mb-3 md:mb-6 overflow-hidden rounded-xl md:rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass-strong rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-heading text-foreground mb-0.5 md:mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-xs md:text-sm mb-2 md:mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm italic leading-relaxed hidden sm:block">
                    "{member.mission}"
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground text-sm md:text-base italic mt-12 max-w-3xl mx-auto"
        >
          "A team combining strong technology execution with deep on-ground understanding to build a real improvement system for students across schools and coaching centers."
        </motion.p>
      </div>
    </section>
  );
};

export default TeamSection;
