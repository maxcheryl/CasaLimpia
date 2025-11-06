import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  "Gestiona tu horario y disponibilidad",
  "Recibe pagos seguros y puntuales",
  "Accede a una base de clientes amplia",
  "Sin costos de inscripción",
];

const ProfessionalsCTA = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div
            ref={titleRef}
            className={`text-center mb-12 transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ¿Eres Especialista en Limpieza?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Únete a CasaLimpia y aumenta tus ingresos trabajando de forma
              independiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {benefits.map((benefit, index) => {
              const { ref, isVisible } = useScrollAnimation();
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`flex items-start gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              );
            })}
          </div>

          <div
            ref={ctaRef}
            className={`text-center space-y-4 transition-all duration-700 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              to="/offer-services"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Button size="lg" className="text-lg px-8 py-6 hover-scale">
                Regístrate como Profesional
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Comienza a recibir solicitudes en menos de 24 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsCTA;
