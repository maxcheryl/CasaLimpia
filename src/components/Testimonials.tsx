import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import DovakhiinImg from "../assets/Dovahkiin.jpg";
import DoomImg from "../assets/Doomslayer.jpeg";
import ObiwanImg from "../assets/Obiwan.jpeg";
import FeldesparImg from "../assets/Feldespar.jpeg";
import HarryImg from "../assets/HarryMason.jpeg";
import ChewbaccaImg from "../assets/Chewbacca.jpg";
import CJImg from "../assets/CJ.jpeg";
import ArthurImg from "../assets/ArthurM.jpeg";
import EllieImg from "../assets/Ellie.jpeg";

const testimonials = [
  {
    name: "Chewbacca",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "Rrrrghhh… Graaawrrrghhh! (Traducción: Servicio increíble. Dejaron el Halcón Milenario tan limpio que Han pensó que era una nave nueva. Hasta el compartimento secreto quedó reluciente).",
    image: ChewbaccaImg,
  },
  {
    name: "CJ",
    role: "Trabajador Independiente",
    rating: 5,
    comment:
      "Ah, acá vamos otra vez… Pero esta vez limpiando casas, no metiéndome en líos. CasaLimpia me tiene ganando dinero honesto, y hasta mi mamá estaría orgullosa. Eso sí, si me hacen limpiar otra mansión en Vinewood, renuncio.",
    image: CJImg,
  },
  {
    name: "Obi-wan Kenobi",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "Un servicio elegante para tiempos más civilizados. El trabajador llegó justo a tiempo, como si sintiera una perturbación en la suciedad de mi casa. Ahora mi departamento brilla más que un sable de luz recién pulido. CasaLimpia, you were the chosen one!",
    image: ObiwanImg,
  },
  {
    name: "Dovahkiin",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "Excelente servicio. El personal es muy profesional y puntual. Mi casa queda impecable cada vez. Hace poco me fui de exploración por 2 semanas y cuando llegue toda mi casa estaba impecable, hasta mi armadura de ébano limpiaron.",
    image: DovakhiinImg,
  },
  {
    name: "Ellie",
    role: "Trabajador Independiente",
    rating: 5,
    comment:
      "Al principio pensé que limpiar casas no podía ser tan difícil… hasta que encontré un hongo creciendo detrás del sofá. Pero bueno, nada que un buen trapo y un poco de desinfectante no puedan arreglar. Al menos acá no tengo que preocuparme de chasqueadores, solo de polvo. Cinco estrellas.",
    image: EllieImg,
  },
  {
    name: "Doom Slayer",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "No hablo mucho, pero esta app… funciona. Después de una larga jornada limpiando el Infierno, llego a casa y no hay ni una mota de polvo. Ni un demonio se atrevería a ensuciar después de ver cómo dejan todo. Servicio rápido, eficiente y sin necesidad de usar la escopeta.",
    image: DoomImg,
  },
  {
    name: "Feldespar",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "Volví de una exploración espacial pensando que encontraría polvo estelar por todas partes… ¡pero no! Los de CasaLimpia dejaron mi nave más reluciente que una supernova recién nacida. Si me pierdo en el espacio otra vez, al menos sé que mi casa estará más limpia que el Observatorio.",
    image: FeldesparImg,
  },
  {
    name: "Arthur Morgan",
    role: "Trabajador Independiente",
    rating: 5,
    comment:
      "Bueno... debo admitir que al principio no confiaba mucho en eso de limpiar casas con una 'aplicación mágica'. Pero resulta que paga bien, y la gente queda más feliz que un caballo con avena fresca. Supongo que hasta un forajido puede ganarse la vida honradamente de vez en cuando.",
    image: ArthurImg,
  },
  {
    name: "Harry Mason",
    role: "Cliente Regular",
    rating: 5,
    comment:
      "Después de todo lo que he vivido en Silent Hill, pensé que ninguna mancha podría quitarse… pero los de CasaLimpia demostraron lo contrario. Dejaron mi casa tan limpia que hasta los fantasmas se fueron por falta de polvo. Casi me da miedo lo impecable que quedó.",
    image: HarryImg,
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<any>();
  const rafRef = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  // Configuración de autoplay
  const AUTOPLAY_MS = 3000;

  // Creamos array extendido para loop infinito real
  const extendedTestimonials = [
    ...testimonials.slice(-3),
    ...testimonials,
    ...testimonials.slice(0, 3),
  ];

  useEffect(() => {
    if (!api) return;

    const slides = () => api.slideNodes();
    const total = testimonials.length;

    const updateSlides = () => {
      const nodeList: HTMLElement[] = slides();
      const selectedIndex = api.selectedScrollSnap();

      nodeList.forEach((slide: HTMLElement, index: number) => {
        // distancia para efecto 3D
        let distance = Math.abs(selectedIndex - index);
        if (distance > extendedTestimonials.length / 2)
          distance = extendedTestimonials.length - distance;

        const scale = Math.max(0.7, 1 - distance * 0.15);
        const opacity = Math.max(0.25, 1 - distance * 0.35);
        const rotateY = (selectedIndex - index) * 20;
        const translateZ = -80 * distance;

        slide.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        slide.style.opacity = `${opacity}`;
        slide.style.transition =
          "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s";
      });
    };

    const onScrollRAF = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const loop = () => {
        updateSlides();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    };

    const stopScrollRAF = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      updateSlides();
    };

    // Loop infinito real: saltos al llegar a los clones
    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      if (index < 3) api.scrollTo(index + total, false);
      else if (index >= total + 3) api.scrollTo(index - total, false);
    };

    api.on("init", updateSlides);
    api.on("reInit", updateSlides);
    api.on("select", () => {
      updateSlides();
      handleSelect();
    });
    api.on("settle", updateSlides);
    api.on("scroll", onScrollRAF);
    api.on("dragEnd", stopScrollRAF);

    // Centramos al inicio en la primera real
    api.scrollTo(3, false);

    // Autoplay
    if (AUTOPLAY_MS > 0) {
      autoplayRef.current = window.setInterval(() => {
        api.scrollNext();
      }, AUTOPLAY_MS);
    }

    return () => {
      stopScrollRAF();
      api.off("init", updateSlides);
      api.off("reInit", updateSlides);
      api.off("select", handleSelect);
      api.off("settle", updateSlides);
      api.off("scroll", onScrollRAF);
      api.off("dragEnd", stopScrollRAF);
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [api]);

  return (
    <section id="testimonials" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 px-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Testimonios reales de clientes y trabajadores satisfechos
          </p>
        </div>

        <div className="relative" style={{ perspective: "1000px" }}>
          <Carousel
            setApi={setApi}
            opts={{ align: "center", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="flex gap-0">
              {extendedTestimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 md:p-4 h-full">
                    <Card className="border-2 h-full min-h-[380px] md:min-h-[500px] bg-gradient-to-b from-background to-primary/5 flex flex-col shadow-card">
                      <CardContent className="pt-5 px-3 pb-4 md:pt-6 md:px-6 md:pb-6 flex-1 flex flex-col">
                        <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-primary/20"
                          />
                          <div className="flex gap-1">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400"
                                />
                              )
                            )}
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground italic flex-1 leading-relaxed px-4 md:px-0">
                            "{testimonial.comment}"
                          </p>
                          <div>
                            <p className="font-semibold text-foreground text-sm md:text-base">
                              {testimonial.name}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
