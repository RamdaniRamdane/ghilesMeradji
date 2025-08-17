"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - replace with your actual images
const workCategories = {
  "branding": {
    title: "Branding et Identité Visuelle",
    images: [
      "/ident/1.jpg",
      "/ident/2.jpg",
      "/ident/3.png",
    ]
  },
  "packaging": {
    title: "Packaging Products",
    images: [
      "/pack/alura1.jpg",
      "/pack/alura2.jpg",
      "/pack/behar1.jpg",
      "/pack/behar2.jpg",

    ]
  },
  "print": {
    title: "Print (Affiches, Brochures, Dépliants, Roll up banner...)",
    images: [
      "/png/test.png",
      "/png/test.png",    ]
  },
  "social": {
    title: "Social Media Posts",
    images: [
      "/res/bledArt.jpg",
      "/res/innovation1.jpg",    
      "/res/yusraPosts.jpg",    
      "/res/yusraPosts2.jpg",    
    ]
  },
  "events": {
    title: "Events (Projets Complets)",
    images: [
      "/png/test.png",
      "/png/test.png",    ]
  }
};

function Carousel({ images, autoPlay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-100 rounded-lg overflow-hidden group">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`Work ${index + 1}`}
              fill
              className="object-contain"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlmYTJhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === 'about' ? 'font-bold' : ' hover:font-bold'
                }`}
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === 'work' ? 'font-bold' : ' hover:font-bold'                }`}
              >
                Travaux
              </button>
            </div>
            
            <div className="h-12 w-auto">
              <Image
                src="/png/signatureP.png"
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
          src="/png/picQuiSuisJe.png"
          width={1000}
          height={1000}
          alt="Picture of the author"
         />
        </div>
        <div className="flex flex-col justify-center items-start pl-0 sm:pl-20 sm:pr-3 "> 
          <h1 className="font-custom text-[#374a9a] text-2xl font-bold border-b-[4px] border-b-[#374a9a] w-max ">Moi, Ghiles Meradji, </h1>
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
      <section id="work" className="py-20 bg-[#374a9a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold  mb-4">
              Mes Travaux
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Découvrez une sélection de mes projets dans différents domaines du design graphique
            </p>
          </div>

          <div className="space-y-20">
            {Object.entries(workCategories).map(([key, category]) => (
              <div key={key} className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-200 text-center">
                  {category.title}
                </h3>
                <Carousel images={category.images} />
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
                src="/png/signatureP.png"
                width={80}
                height={32}
                alt="Ghiles Meradji"
                className="h-8 w-auto object-contain"
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
