import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import deepCleanImage from "@/assets/ofrecer.jpeg";
import regularImage from "@/assets/seguridad.png";
import officeImage from "@/assets/contratar.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    title: "Contratar Servicios",
    description:
      "Encuentra y reserva fácilmente profesionales de limpieza verificados. Personaliza tu pedido según tus necesidades y disponibilidad.",
    image: deepCleanImage,
    features: [
      "Filtra por tipo de limpieza y horario",
      "Consulta perfiles y valoraciones",
      "Reserva en minutos",
      "Confirmación inmediata del servicio",
    ],
  },
  {
    title: "Seguridad en Transacciones",
    description:
      "Tu seguridad es nuestra prioridad. Protegemos tanto a clientes como a profesionales con un sistema de pagos seguro y verificado.",
    image: regularImage,
    features: [
      "Pagos encriptados",
      "Verificación de identidad",
      "Protección contra fraudes",
      "Soporte ante disputas",
    ],
  },
  {
    title: "Ofrecer Servicios",
    description:
      "Regístrate como profesional y comienza a ofrecer tus servicios de limpieza. Gestiona tus reservas, pagos y evaluaciones desde un solo lugar.",
    image: officeImage,
    features: [
      "Crea tu perfil profesional",
      "Recibe solicitudes de clientes",
      "Administra tus horarios",
      "Recibe pagos seguros por cada trabajo",
    ],
  },
];

const Services = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simplificamos el Mundo de la Limpieza
          </h2>
          <p className="text-xl text-muted-foreground">
            Gestiona tus servicios de forma eficiente y segura, tanto si
            contratas como si ofreces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
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
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/*
                {index === 0 && (
                  <Link to="/workers">
                    <Button className="w-full" size="lg">
                      Solicitar Servicio
                    </Button>
                  </Link>
                )}
                */}
                
              </CardContent>
            </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
