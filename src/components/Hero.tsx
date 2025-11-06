
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-cleaning.jpg";
import bgPattern from "@/assets/background-icons.png"; 

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-8 md:pt-16 md:pb-0"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(208.5_92.9%_33.3%)] to-[hsl(215.2_60.2%_60.2%_/_0.9)]"></div>

        <div
          className="absolute inset-0 opacity-70" 
          style={{
            backgroundImage: `url(${bgPattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "contain", 
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-8 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 items-center">
          <div className="space-y-6 md:space-y-8 text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 text-white text-sm md:text-base">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium">
                Servicios Profesionales de Limpieza
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Tu Casa Limpia
              <span className="block mt-2">Sin esfuerzo</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white/90">
              Servicios de limpieza domiciliarios profesionales. Confiables,
              eficientes y con atención al detalle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/workers")}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:shadow-xl hover:bg-white hover:text-primary transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                Solicitar Servicio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:shadow-xl hover:bg-white hover:text-primary transition-all duration-300 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                onClick={() => navigate("/offer-services")}
              >
                Ofrecer Servicios
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <img
              src={heroImage}
              alt="Servicios de limpieza profesional"
              className="rounded-2xl shadow-2xl w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
