import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Inicio", section: "hero" },
    { label: "Servicios", section: "services" },
    { label: "Testimonios", section: "testimonials" },
    { label: "Soporte", section: "support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm animate-[fade-in_0.5s_ease-out]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* 
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
             <span className="text-xl font-bold text-foreground">CasaLimpia</span>
            */}
            <div className="flex p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
             <img src="/public/logo.png" alt="Casa Limpia Logo" className="h-6 w-10 object-contain" />
              <span className="text-xl font-bold text-white">CasaLimpia</span>
            </div>
                
          </button>
          {location.pathname === "/" && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/auth")}
              className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Iniciar Sesión
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <div className="flex flex-col gap-4">
              {location.pathname === "/" && navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  className="text-foreground hover:text-primary transition-colors font-medium text-left px-4 py-2 hover:bg-secondary/50 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2 space-y-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="w-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
