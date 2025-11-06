import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 animate-[fade-in_0.6s_ease-out]">
      <div className="container mx-auto px-6">
        {/* Sección superior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + nombre */}
          <div className="flex items-center gap-3">
            <img
              src="/public/logo.png"
              alt="Casa Limpia Logo"
              className="h-12 w-16 object-contain"
            />
            <span className="text-2xl font-bold">CasaLimpia</span>
          </div>

          {/* Lema */}
          <p className="text-white/80 text-lg text-center md:text-left">
            Tu hogar, nuestro compromiso.
          </p>
        </div>

        {/* Separador */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60 gap-3">
            <p className="text-center md:text-left">
               2025 CasaLimpia. Todos los derechos de nadie.
            </p>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-teal" />
              <span>Dalí</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
