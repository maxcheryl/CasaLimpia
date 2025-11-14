import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    category: "Servicios",
    questions: [
      {
        question: "¿Qué tipos de servicios ofrece CasaLimpia?",
        answer:
          "CasaLimpia ofrece servicios de limpieza domiciliaria adaptados a tus necesidades: limpieza general, profunda, post-obra, por mudanza, cocinas, baños y ventanas. Todos los servicios son realizados por profesionales verificados de nuestra plataforma.",
      },
      {
        question: "¿Los trabajadores llevan sus propios materiales de limpieza?",
        answer:
          "Sí, la mayoría de los trabajadores traen sus propios materiales. Sin embargo, durante la reserva puedes indicar si prefieres que utilicen tus productos o herramientas. CasaLimpia busca que el servicio se adapte completamente a tus preferencias.",
      },
    ],
  },
  {
    category: "Reservas y Pagos",
    questions: [
      {
        question: "¿Puedo cancelar o reprogramar una reserva?",
        answer:
          "Sí, puedes cancelar o reprogramar tu reserva directamente desde la app hasta 24 horas antes del servicio sin penalización. Si la cancelación se realiza con menos tiempo, puede aplicarse una tarifa compensatoria.",
      },
      {
        question: "¿Cuándo se realiza el cobro del servicio?",
        answer:
          "El pago se retiene de manera segura al momento de la reserva y solo se libera al trabajador una vez que confirmes la correcta finalización del servicio. De esta forma garantizamos transparencia y confianza para ambas partes.",
      },
    ],
  },
  {
    category: "Seguridad y Verificación",
    questions: [
      {
        question: "¿Cómo verifica CasaLimpia a los trabajadores?",
        answer:
          "Todos los trabajadores deben pasar un proceso de verificación que incluye validación de identidad, antecedentes y experiencia. Los perfiles verificados se identifican con un distintivo en la app, brindando mayor confianza a los clientes.",
      },
      {
        question: "¿CasaLimpia ofrece algún tipo de seguro o protección?",
        answer:
          "CasaLimpia promueve que todos los trabajadores cuenten con seguro de responsabilidad civil. Además, las transacciones y datos personales están protegidos mediante protocolos de seguridad certificados.",
      },
    ],
  },
  {
    category: "Para Trabajadores",
    questions: [
      {
        question: "¿Cuándo recibo el pago de mis servicios?",
        answer:
          "Los pagos se liberan automáticamente 48 horas después de que el cliente confirme la finalización del servicio. Los fondos se transfieren a la cuenta bancaria registrada en tu perfil.",
      },
      {
        question: "¿Puedo definir mi tarifa y horario de trabajo?",
        answer:
          "Sí, en CasaLimpia cada trabajador es independiente. Puedes definir tu tarifa por hora y establecer los días y horarios disponibles. La app actualizará automáticamente tu disponibilidad para que los clientes puedan reservarte.",
      },
    ],
  },
];
const FAQ = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Preguntas Frecuentes
              </h1>
              <p className="text-xl text-muted-foreground">
                Encuentra respuestas rápidas a las preguntas más comunes sobre
                CasaLimpia
              </p>
            </div>

            <div className="space-y-12">
              {faqs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        value={`${idx}-${qIdx}`}
                        className="border-2 rounded-lg px-6 hover:border-primary/50 transition-colors"
                      >
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border-2">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¿No encontraste tu respuesta?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo de soporte está listo para ayudarte
              </p>
              <Button
                size="lg"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("support")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Contactar Soporte
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
