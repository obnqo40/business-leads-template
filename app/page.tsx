import { Benefits } from "@/components/Benefits";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <HowItWorks />
        <Reviews />
        <LeadForm />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
