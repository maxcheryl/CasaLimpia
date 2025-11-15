import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, Clock, CalendarIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import MariaImg from "../assets/Maria.jpeg";
import MasterCImg from "../assets/Master_Chief.jpeg";
import LaraCImg from "../assets/Lara_Croft.jpeg";
import LeonImg from "../assets/Leon_S._Kennedy.jpeg";
import JoelImg from "../assets/Joel_Miller.jpeg";
import GordonFImg from "../assets/Gordon_Freeman.jpeg";
import CurlyImg from "../assets/Curly.jpeg";
import AnakinImg from "../assets/Anakin_Skywalker.jpeg";

interface Worker {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  verified: boolean;
  services: string[];
  experience: string;
}

const workers: Worker[] = [
  {
    id: 8,
    name: "Anakin Skywalker",
    image: AnakinImg,
    rating: 4.7,
    reviewCount: 95,
    hourlyRate: 5600,
    location: "Tatooine",
    verified: true,
    services: ["Limpieza doméstica general", "Limpieza profunda", "Limpieza de vidrios o ventanales"],
    experience: "5 años de experiencia",
  },
  {
    id: 1,
    name: "María",
    image: MariaImg,
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 6000,
    location: "Silent Hill",
    verified: true,
    services: ["Limpieza profunda", "Desinfección y sanitización", "Limpieza de tapices y alfombras"],
    experience: "5 años de experiencia",
  },
  {
    id: 2,
    name: "Master Chief",
    image: MasterCImg,
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 4000,
    location: "UNSC Pillar of Autumn",
    verified: true,
    services: ["Limpieza de bodegas o garajes", "Limpieza de electrodomésticos", "Limpieza de autos"],
    experience: "7 años de experiencia",
  },
  {
    id: 3,
    name: "Lara Croft",
    image: LaraCImg,
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 5200,
    location: "Desierto de Atacama",
    verified: true,
    services: ["Limpieza doméstica general", "Limpieza de piscinas", "Limpieza de muebles"],
    experience: "8 años de experiencia",
  },
  {
    id: 4,
    name: "Leon S. Kennedy",
    image: LeonImg,
    rating: 4.7,
    reviewCount: 82,
    hourlyRate: 7400,
    location: "Washington D.C.",
    verified: true,
    services: ["Limpieza doméstica general", "Limpieza profunda", "Limpieza de vidrios o ventanales"],
    experience: "4 años de experiencia",
  },
  {
    id: 5,
    name: "Joel Miller",
    image: JoelImg,
    rating: 4.9,
    reviewCount: 143,
    hourlyRate: 2500,
    location: "Jackson, Wyoming.",
    verified: true,
    services: ["Limpieza de terrazas", "Limpieza profunda", "Limpieza de cortinas"],
    experience: "6 años de experiencia",
  },
  {
    id: 6,
    name: "Gordon Freeman",
    image: GordonFImg,
    rating: 4.6,
    reviewCount: 71,
    hourlyRate: 6000,
    location: "Nuevo México",
    verified: false,
    services: ["Limpieza post-construcción", "Limpieza doméstica general"],
    experience: "3 años de experiencia",
  },
  {
    id: 7,
    name: "Curly",
    image: CurlyImg,
    rating: 4.8,
    reviewCount: 109,
    hourlyRate: 4500,
    location: "Nave Interestelar",
    verified: true,
    services: ["Limpieza doméstica general", "Limpieza profunda", "Limpieza de vidrios o ventanales"],
    experience: "6 años de experiencia",
  },
];

const Workers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Formulario de reserva
  const [bookingDate, setBookingDate] = useState<Date>();
  const [bookingTime, setBookingTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredWorkers =
    selectedLocation === "all"
      ? workers
      : workers.filter((worker) => worker.location === selectedLocation);

  const locations = [
    "all",
    ...Array.from(new Set(workers.map((w) => w.location))),
  ];

  const handleBookingSubmit = () => {
    // Validar que todos los campos requeridos estén completos
    if (!bookingDate || !bookingTime || !selectedService || !address.trim()) {
      return;
    }

    // Guardar los datos de la reserva en localStorage para usarlos después del login
    const bookingData = {
      worker: selectedWorker,
      date: bookingDate,
      time: bookingTime,
      service: selectedService,
      address: address,
      instructions: instructions,
    };
    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    // Redirigir al login
     toast({
        title: "¡Datos guardados!",
        description: "Inicia sesión o registrate para continuar.",
      });

      setTimeout(() => {
        navigate("/auth");
      }, 1000);
  };

  const isFormValid =
    bookingDate && bookingTime && selectedService && address.trim();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 mt-14">
              Encuentra tu Profesional Ideal
            </h1>
            <p className="text-xl text-muted-foreground">
              Todos nuestros trabajadores están verificados y tienen excelentes
              calificaciones
            </p>
          </div>

        {/* Filtro de Zonas - Versión Mejorada */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Selecciona una zona
              </h2>
            </div>
            
            {/* Vista Desktop: Botones con Contador */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedLocation === "all" ? "default" : "outline"}
                onClick={() => setSelectedLocation("all")}
                size="lg"
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Todas las zonas</span>
                <Badge 
                  variant="secondary" 
                  className="ml-2 relative z-10 bg-background/20 group-hover:bg-background/30"
                >
                  {workers.length}
                </Badge>
              </Button>
              {locations.slice(1).map((location) => {
                const count = workers.filter(w => w.location === location).length;
                return (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "outline"}
                    onClick={() => setSelectedLocation(location)}
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <MapPin className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">{location}</span>
                    <Badge 
                      variant="secondary" 
                      className="ml-2 relative z-10 bg-background/20 group-hover:bg-background/30"
                    >
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>

            {/* Vista Mobile: Select Mejorado */}
            <div className="md:hidden">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full h-14 text-base border-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <SelectValue placeholder="Selecciona una zona" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-base py-3">
                    <div className="flex items-center justify-between w-full">
                      <span>Todas las zonas</span>
                      <Badge variant="secondary" className="ml-2">
                        {workers.length}
                      </Badge>
                    </div>
                  </SelectItem>
                  {locations.slice(1).map((location) => {
                    const count = workers.filter(w => w.location === location).length;
                    return (
                      <SelectItem key={location} value={location} className="text-base py-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{location}</span>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {count}
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
              {/* Indicador de profesionales encontrados */}
              <div className="mt-3 text-center">
                <p className="text-sm text-muted-foreground">
                  {filteredWorkers.length} {filteredWorkers.length === 1 ? 'profesional encontrado' : 'profesionales encontrados'}
                </p>
              </div>
            </div>
          </div>  

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkers.map((worker) => (
              <Card
                key={worker.id}
                className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="relative">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    {worker.verified && (
                      <Badge className="absolute top-2 right-2 bg-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{worker.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{worker.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({worker.reviewCount} reseñas)
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{worker.location}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      {worker.experience}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {worker.services.map((service, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${worker.hourlyRate}
                      </p>
                      <p className="text-xs text-muted-foreground">por hora</p>
                    </div>
                    <Dialog
                      open={isDialogOpen && selectedWorker?.id === worker.id}
                      onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) {
                          setSelectedWorker(worker);
                          // Reset form
                          setBookingDate(undefined);
                          setBookingTime("");
                          setSelectedService("");
                          setAddress("");
                          setInstructions("");
                        } else {
                          setSelectedWorker(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">Reservar</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Reservar servicio con {worker.name}
                          </DialogTitle>
                          <DialogDescription>
                            Completa los datos de tu reserva para continuar
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          {/* Fecha */}
                          <div className="space-y-2">
                            <Label htmlFor="date">Fecha del servicio *</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !bookingDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {bookingDate
                                    ? format(bookingDate, "PPP", { locale: es })
                                    : "Selecciona una fecha"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={bookingDate}
                                  onSelect={setBookingDate}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Hora */}
                          <div className="space-y-2">
                            <Label htmlFor="time">Hora del servicio *</Label>
                            <Select
                              value={bookingTime}
                              onValueChange={setBookingTime}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una hora" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="08:00">08:00 AM</SelectItem>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                <SelectItem value="16:00">04:00 PM</SelectItem>
                                <SelectItem value="17:00">05:00 PM</SelectItem>
                                <SelectItem value="18:00">06:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Tipo de servicio */}
                          <div className="space-y-2">
                            <Label htmlFor="service">Tipo de servicio *</Label>
                            <Select
                              value={selectedService}
                              onValueChange={setSelectedService}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un servicio" />
                              </SelectTrigger>
                              <SelectContent>
                                {worker.services.map((service, idx) => (
                                  <SelectItem key={idx} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Dirección */}
                          <div className="space-y-2">
                            <Label htmlFor="address">Dirección *</Label>
                            <Input
                              id="address"
                              placeholder="Ingresa tu dirección"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>

                          {/* Instrucciones especiales */}
                          <div className="space-y-2">
                            <Label htmlFor="instructions">
                              Instrucciones especiales (opcional)
                            </Label>
                            <Textarea
                              id="instructions"
                              placeholder="Agrega cualquier información adicional"
                              value={instructions}
                              onChange={(e) => setInstructions(e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={handleBookingSubmit}
                            disabled={!isFormValid}
                            className="w-full"
                          >
                            Continuar con la reserva
                          </Button>
                          <p className="text-xs text-muted-foreground text-center">
                            Necesitas iniciar sesión para completar la reserva
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Workers;
