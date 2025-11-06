import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  Phone,
  HelpCircle,
  FileText,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const supportOptions = [
  {
    icon: Phone,
    title: "Soporte Telefónico",
    description: "Llámanos para asistencia inmediata",
    contact: "(123) 456-7890",
    availability: "",
  },
  {
    icon: Mail,
    title: "Email de Soporte",
    description: "Escríbenos tu consulta",
    contact: "soporte@casalimpia.com",
    availability: "Respuesta en 24 horas",
  },
  {
    icon: HelpCircle,
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas rápidas",
    contact: "Centro de ayuda",
    availability: "Disponible 24/7",
  },
];

const ContactSupport = () => {
  const navigate = useNavigate();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="support" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Centro de Soporte
          </h2>
          <p className="text-xl text-muted-foreground">
            Nuestro equipo de soporte está disponible para resolver tus dudas y
            ayudarte a aprovechar al máximo CasaLimpia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {supportOptions.map((option, index) => {
            const { ref, isVisible } = useScrollAnimation();
            return (
              <div
                key={index}
                ref={ref}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card
                  onClick={() => {
                    if (index === 2) {
                      navigate("/faq");
                    }
                  }}
                  className={`border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group h-full ${
                    index === 2 ? "cursor-pointer" : ""
                  }`}
                >
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="p-5 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <option.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl text-foreground">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {option.description}
                    </p>
                    <p className="font-medium text-foreground text-lg">
                      {option.contact}
                    </p>
                    {option.availability && (
                      <p className="text-sm text-muted-foreground">
                        {option.availability}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
            );
          })}
        </div>

        {/*
<div className="mt-16 text-center max-w-2xl mx-auto">
  <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
    <CardContent className="pt-6 pb-6">
      <h3 className="text-2xl font-bold text-foreground mb-3">
        ¿Necesitas Más Ayuda?
      </h3>
      <p className="text-muted-foreground mb-4">
        Crea un ticket de ayuda
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">(123) 456-7890</span>
        </div>
        <div className="hidden sm:block text-muted-foreground">•</div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">soporte@casalimpia.com</span>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
*/}
      </div>
    </section>
  );
};

export default ContactSupport;
