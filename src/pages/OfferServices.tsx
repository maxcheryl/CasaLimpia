import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

const serviceTypes = [
  { id: "general", label: "Limpieza doméstica general" },
  { id: "deep", label: "Limpieza profunda" },
  { id: "office", label: "Limpieza de terrazas" },
  { id: "windows", label: "Limpieza de vidrios o ventanales" },
  { id: "kitchen", label: "Desinfección y sanitización" },
  { id: "bathroom", label: "Limpieza de tapices y alfombras" },
  { id: "post-construction", label: "Limpieza post-construcción" },
  { id: "moving", label: "Limpieza de bodegas o garajes" },
  { id: "garden", label: "Limpieza de autos" },
  { id: "carpets", label: "Limpieza de electrodomésticos" },
  { id: "disinfection", label: "Limpieza de piscinas" },
  { id: "organization", label: "Limpieza de muebles" },
];

const formSchema = z.object({
  fullName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(10, "Teléfono debe tener al menos 10 dígitos").max(20),
  location: z.string().trim().min(2, "La ubicación es requerida").max(100),
  experience: z.string().trim().min(1, "La experiencia es requerida").max(50),
  hourlyRate: z.string().trim().min(1, "La tarifa es requerida"),
  services: z.array(z.string()).min(1, "Selecciona al menos un servicio"),
  description: z.string().trim().max(500, "La descripción no puede exceder 500 caracteres").optional(),
});

const OfferServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      experience: formData.get("experience") as string,
      hourlyRate: formData.get("hourlyRate") as string,
      services: selectedServices,
      description: formData.get("description") as string,
    };

    try {
      const validated = formSchema.parse(data);
      
      // Aquí se enviaría a la base de datos o API
      console.log("Datos validados:", validated);
      
      toast({
        title: "¡Datos guardados!",
        description: "Registrate para continuar.",
      });

      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error en el formulario",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ofrece tus Servicios de Limpieza
              </h1>
              <p className="text-xl text-muted-foreground">
                Completa el formulario y comienza a recibir solicitudes de clientes
              </p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Información del Profesional</CardTitle>
                <CardDescription>
                  Ingresa tus datos para crear tu perfil profesional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre Completo *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Dalí Morales"
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="dali@ejemplo.com"
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        required
                        maxLength={20}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación *</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Ciudad, País"
                        required
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Años de Experiencia *</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="5"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Tarifa por Hora *</Label>
                      <Input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="1"
                        max="100000"
                        placeholder="3000"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Servicios que Ofreces *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {serviceTypes.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <label
                            htmlFor={service.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedServices.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Selecciona al menos un servicio
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Descripción Adicional (opcional)
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Cuéntanos más sobre tu experiencia y servicios..."
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo 500 caracteres
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting || selectedServices.length === 0}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OfferServices;
