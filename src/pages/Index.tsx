import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ProfessionalsCTA from "@/components/ProfessionalsCTA";
import ContactSupport from "@/components/ContactSupport";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <ProfessionalsCTA />
      <ContactSupport />
      <Footer />
    </div>
  );
};

export default Index;
