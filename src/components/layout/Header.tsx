import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import studyBuddyLogo from "@/assets/study-buddy-logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Who We Serve", href: "#who-we-serve" },
    { label: "Why Us", href: "#why-us" },
    { label: "Team", href: "#team" },
  ];

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img 
              src={studyBuddyLogo} 
              alt="Study Buddy AI" 
              className="w-10 h-10 rounded-xl object-cover"
              loading="eager"
            />
            <span className="font-heading text-xl text-foreground hidden sm:block">
              Study Buddy AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Contact Us
            </Button>
            <Button variant="hero" size="sm">
              Request Demo
            </Button>
            <a href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Admin
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Simple transition, no framer-motion */}
      {isMenuOpen && (
        <div
          className={`lg:hidden bg-card border-b border-border ${
            reducedMotion ? "" : "animate-in fade-in slide-in-from-top-2 duration-200"
          }`}
        >
          <div className="section-container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                Contact Us
              </Button>
              <Button variant="hero" className="w-full">
                Request Demo
              </Button>
              <a href="/admin" onClick={closeMenu}>
                <Button variant="ghost" className="w-full text-muted-foreground">
                  Admin
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
