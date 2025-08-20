"use client";
import Image from "next/image";
import { GiPointing } from "react-icons/gi";
import { MdOutlineWork } from "react-icons/md";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Mock data - replace with your actual images
const workCategories = {
  "branding": {
    title: "Branding et Identité Visuelle",
    images: [
      "/ident/1.webp",
      "/ident/2.webp",
      "/ident/3.webp",
      "/ident/nekm.webp",
      "/png/test.webp",
      "/ident/5.webp",
    ]
  },
  "packaging": {
    title: "Packaging Products",
    images: [
      "/pack/alura1.webp",
      "/pack/alura2.webp",
      "/pack/behar1.webp",
      "/pack/behar2.webp",
      "/pack/mariebelle.webp",
      "/pack/soufFine1.webp",

    ]
  },
  "print": {
    title: "Print (Affiches, Brochures, Dépliants, Roll up banner...)",
    images: [
      "/print/brochure1.jpg",
      "/print/card.jpg",
      "/print/carte2.jpg",
      "/print/menu1.jpg",
      "/print/menu2.jpg",
      "/print/notebook1.jpg",
      "/print/poster2.jpg",
      "/print/rollup.jpg",
    ]
  },
  "social": {
    title: "Social Media Posts",
    images: [
      "/res/bledArt.webp",
      "/res/innovation1.webp",    
      "/res/yusraPosts.webp",    
      "/res/yusraPosts2.webp",    
      "/res/produitBio1.webp",    
    ]
  },
  "events": {
    title: "Events (Projets Complets)",
    images: [
      "/event/A3Poster.jpg",
      "/event/Cuptalentueux.jpg",
      "/event/affiche1.jpg",
      "/event/badge.jpg",
      "/event/ibturenMug.jpg",
      "/event/idcard.jpg",
      "/event/poster3.jpg",
      "/event/rollup.jpg",
      "/event/ticket1.jpg",
      "/event/ticket2.jpg",
   ]
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#374a9a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm z-50  bg-[#374a9a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">

              <button
                onClick={() => scrollToSection('about')}
                className={`text-white text-sm font-medium transition-colors duration-200 hover:text-yellow-500 ${
                  activeSection === 'about' ? 'border-b-white border-b-4' : ''
                }`}
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className={`text-white text-sm font-medium transition-colors duration-200  hover:text-yellow-500${
                  activeSection === 'work' ? 'border-b-white border-b-4' : ''                }`}
              >
                Travaux
              </button>
            </div>
            
            <div className="h-12 w-auto">
              <Image
                src="/png/signaturePw.webp"
                width={120}
                height={48}
                alt="Ghiles Meradji Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </nav>



      {/* About Section */}
      <section id="about" className="pt-16 bg-white">
      <div className=" flex flex-col w-full bg-white sm:flex-row border-b-4 border-t-3 border-dashed border-black h-[100%] ">
        <div className="relative">
         <Image
          src="/png/picQuiSuisJe.webp"
          width={1000}
          height={1000}
          alt="Picture of the author"
          loading="lazy"
         />
        </div>
        <div className="flex flex-col justify-center items-start pl-0 sm:pl-20 sm:pr-3 "> 
          <h1 className="font-dancing text-[#374a9a] text-2xl border-b-[4px] border-b-[#374a9a] w-max ">Moi, Ghiles Meradji, </h1>
          <p className="text-black">
             je propose des solutions créatives en design graphique 
             (identité visuelle, packaging, supports de communication) et en community 
             management (gestion de réseaux sociaux, création de contenus, campagnes 
             digitales). Mon objectif : aider les marques et entrepreneurs à développer
             leur image et à communiquer efficacement.
          </p> 
        </div>
      </div>      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-[#374a9a] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
           <div className="flex flex-row justify-center">
           <MdOutlineWork className="text-white text-3xl "/>
            <h2 className=" text-white text-3xl font-bold  mb-4">
              Mes Travaux
            </h2>
           </div>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Découvrez une sélection de mes projets dans différents domaines du design graphique
            </p>
          </div>

          <div className="space-y-10 ">
            {Object.entries(workCategories).map(([key, category]) => (
              <div key={key} className="space-y-8 ">
                <div className="flex items-center gap-3">
                  <GiPointing className="text-3xl text-white"/>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
                    {category.title}
                  </h3>
                  <div className="h-px flex-1 border-t-4 border-dashed border-white/60"></div>
                </div>
                  <Carousel className="w-full overflow-hidden">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {category.images.map((img, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                          <Image
                            src={img}
                            alt={`${category.title} ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover rounded-xl bg-[#404a9f]"
                            loading="lazy"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                     <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-[#374a9a]" 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </CarouselPrevious>
                    
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-[#374a9a]" 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </CarouselNext>
                  </Carousel>
                                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-dashed border-black py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Image
                src="/png/signatureP.webp"
                width={80}
                height={32}
                alt="Ghiles Meradji"
                className="h-8 w-auto object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">
                © 2025 Ghiles Meradji. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
