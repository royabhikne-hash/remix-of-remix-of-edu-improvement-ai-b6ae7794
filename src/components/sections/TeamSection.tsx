import { motion } from "framer-motion";
import { useMemo } from "react";
import { Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import abhishekRoyImage from "@/assets/abhishek-roy.jpg";
import ashvethPawarImage from "@/assets/ashveth-pawar.jpg";
import deepikaSharmaImage from "@/assets/deepika-sharma.jpg";
import subhamImage from "@/assets/subham.jpg";
import zulfequarAhmadImage from "@/assets/zulfequar-ahmad.jpg";
import shivrajYadavImage from "@/assets/shivraj-yadav.jpg";
import sambharamImage from "@/assets/sambharam.jpg";

const TeamSection = () => {
  const reducedMotion = useReducedMotion();

  const coreTeam = [
    {
      name: "Abhishek Roy",
      role: "Founder & CEO",
      mission:
        "Education should empower, not overwhelm. Every student deserves clarity.",
      image: abhishekRoyImage,
      linkedin: "https://www.linkedin.com/in/abhishek-roy-8286663a1",
    },
    {
      name: "Ashveth Pawar",
      role: "Co-Founder & Chief Technology Officer",
      mission:
        "Leads overall technical architecture, system scalability, and AI integration.",
      image: ashvethPawarImage,
      linkedin: "https://www.linkedin.com/in/ashveth-pawar-820921327",
    },
    {
      name: "Deepika Sharma",
      role: "Backend Developer",
      mission:
        "Handles backend development, database design, APIs, and server-side logic.",
      image: deepikaSharmaImage,
      linkedin: "https://www.linkedin.com/in/deepika-sharma-3b7348219",
    },
    {
      name: "Shubham Singh",
      role: "Frontend Developer",
      mission:
        "Builds student-facing and school dashboard interfaces with mobile-first focus.",
      image: subhamImage,
      linkedin: "#",
    },
  ];

  const opsTeam = [
    {
      name: "Sambharam G",
      role: "Co-Founder & Chief Operating Officer",
      mission:
        "Leads overall operations, strategic partnerships, and ensures seamless execution across all teams.",
      image: sambharamImage,
      linkedin: "https://www.linkedin.com/in/sambhram-g-b2826b371",
    },
    {
      name: "Zulfequar Ahmad",
      role: "Co-Founder & Ground Operations Team",
      mission:
        "Works directly with schools for demos, onboarding, feedback collection, and daily coordination.",
      image: zulfequarAhmadImage,
      linkedin: "#",
    },
    {
      name: "Shivraj Kumar Yadav",
      role: "Co-Founder & Ground Operations Team",
      mission:
        "Manages school onboarding strategy, partnerships, and execution on the ground.",
      image: shivrajYadavImage,
      linkedin: "#",
    },
  ];

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }), [reducedMotion]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reducedMotion ? 0.2 : 0.5 },
    },
  }), [reducedMotion]);

  const TeamMemberCard = ({ member }: { member: typeof coreTeam[0] }) => (
    <motion.div
      variants={cardVariants}
      className="group text-center"
    >
      <div className="relative mb-3 md:mb-6 overflow-hidden rounded-xl md:rounded-2xl">
        <img
          src={member.image}
          alt={member.name}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
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
    </motion.div>
  );

  return (
    <section
      id="team"
      className="section-padding bg-muted/30 relative overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
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
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-foreground mt-2 md:mt-3 mb-4 md:mb-6">
            The People Behind Study Buddy AI
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Educators, technologists, and parents who believe in the power of
            transparent, supportive learning.
          </p>
        </motion.div>

        {/* Core Team */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {coreTeam.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Operations & Ground Team */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: 0.2 }}
          className="text-center mt-16 mb-10"
        >
          <span className="inline-block text-primary font-medium text-xs md:text-sm uppercase tracking-wide">
            Operations & Ground Team
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {opsTeam.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Team Statement */}
        <p className="text-center text-muted-foreground text-sm md:text-base italic mt-12 max-w-3xl mx-auto">
          "A team combining strong technology execution with deep on-ground school-level understanding to build a real improvement system for students."
        </p>
      </div>
    </section>
  );
};

export default TeamSection;
