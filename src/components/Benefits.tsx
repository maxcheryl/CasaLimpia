import { Shield, Clock, Star, Users } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Personal Confiable",
    description: "Equipo verificado y capacitado profesionalmente",
  },
  {
    icon: Clock,
    title: "Puntualidad Garantizada",
    description: "Respetamos tu tiempo y agenda",
  },
  {
    icon: Star,
    title: "Calidad Superior",
    description: "Productos profesionales y técnicas especializadas",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Adaptamos el servicio a tus necesidades",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-muted-foreground">
            Nos destacamos por nuestro compromiso con la excelencia y satisfacción del cliente
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
