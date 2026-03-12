import { useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import studyBuddyLogo from "@/assets/study-buddy-logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Who We Serve", href: "#who-we-serve" },
    { label: "Why Us", href: "#why-us" },
    { label: "Team", href: "#team" },
  ];

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong shadow-lg"
          : "bg-background/60 backdrop-blur-md border-b border-border/30"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
          >
            <img 
              src={studyBuddyLogo} 
              alt="Study Buddy AI" 
              className="w-10 h-10 rounded-xl object-cover"
              loading="eager"
            />
            <span className="font-heading text-xl text-foreground hidden sm:block">
              Study Buddy AI
            </span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium relative"
                whileHover={reducedMotion ? {} : { y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Contact Us</Button>
            <motion.div whileHover={reducedMotion ? {} : { scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="sm" className="shadow-glow">Request Demo</Button>
            </motion.div>
            <a href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Admin</Button>
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass-strong border-b border-border"
        >
          <div className="section-container py-4 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">Contact Us</Button>
              <Button variant="hero" className="w-full">Request Demo</Button>
              <a href="/admin" onClick={closeMenu}>
                <Button variant="ghost" className="w-full text-muted-foreground">Admin</Button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
