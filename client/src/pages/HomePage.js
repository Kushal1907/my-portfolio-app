import { Briefcase, Sparkles, User } from "lucide-react"; // Import icons used here
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "../App"; // Assuming Section is exported from App.js or a common components file

// Enhanced HeroSection Component with Typed Text Animation
const HeroSection = () => {
  const heroRef = useRef(null);
  const rotatingTexts = useMemo(
    () => ["I'm a Frontend Developer", "I'm a Full Stack Developer"],
    []
  );

  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentTypedText, setCurrentTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseBeforeDelete = 2000;
  const pauseBeforeTypingNext = 500;

  useEffect(() => {
    let typeTimer;
    const currentPhraseToType = rotatingTexts[textArrayIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        typeTimer = setTimeout(() => {
          setCurrentTypedText(currentPhraseToType.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextArrayIndex(
          (prevIndex) => (prevIndex + 1) % rotatingTexts.length
        );
        typeTimer = setTimeout(() => {}, pauseBeforeTypingNext);
      }
    } else {
      if (charIndex < currentPhraseToType.length) {
        typeTimer = setTimeout(() => {
          setCurrentTypedText(currentPhraseToType.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        typeTimer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
      }
    }
    return () => clearTimeout(typeTimer);
  }, [
    charIndex,
    isDeleting,
    textArrayIndex,
    rotatingTexts,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
    pauseBeforeTypingNext,
  ]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (
        !heroRef.current ||
        !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
      )
        return;
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const xPos = (clientX / offsetWidth - 0.5) * 30;
      const yPos = (clientY / offsetHeight - 0.5) * 30;
      const shapes = heroRef.current.querySelectorAll(".hero-bg-shape");
      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.2 + 1;
        shape.style.transform = `translate(${xPos / factor}px, ${
          yPos / factor
        }px)`;
      });
    };
    const currentHeroRef = heroRef.current;
    currentHeroRef?.addEventListener("mousemove", handleMouseMove);
    return () => {
      currentHeroRef?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="hero-section" ref={heroRef}>
      <Sparkles size={80} className="hero-bg-shape shape-1" />
      <Sparkles size={50} className="hero-bg-shape shape-2" />
      <Sparkles size={60} className="hero-bg-shape shape-3" />
      <div className="hero-content">
        <h1
          className="section-title animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}>
          WELCOME TO MY PORTFOLIO
        </h1>
        <p
          className="hero-rotating-text"
          style={{ animationDelay: "0.8s" }}
          aria-live="polite"
          aria-label={`Role: ${currentTypedText}`}>
          {currentTypedText}
          <span className="typing-cursor" aria-hidden="true"></span>
        </p>
        <p
          className="hero-subtitle animate-fadeInUp"
          style={{ animationDelay: "1.2s" }}>
          I'm a passionate developer creating modern and interactive web
          experiences. Explore my work and get to know me better.
        </p>
        <div
          className="hero-buttons animate-fadeInUp"
          style={{ animationDelay: "1.7s" }}>
          <Link
            to="/projects"
            className="button button-primary hero-button-work">
            View My Work
          </Link>
          <Link
            to="/contact"
            className="button button-secondary hero-button-contact">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => (
  <div>
    <HeroSection />
    <Section className="home-services-section" id="services">
      <h2 className="section-title animate-fadeInUp">What I Do</h2>
      <div className="services-grid stagger-children">
        {[
          {
            icon: Briefcase,
            title: "Web Development",
            desc: "Crafting responsive and dynamic websites using modern technologies.",
            animClass: "animate-zoomIn stagger-delay-1",
          },
          {
            icon: User,
            title: "UI/UX Design",
            desc: "Designing intuitive and engaging user interfaces with a focus on user experience.",
            animClass: "animate-zoomIn stagger-delay-2",
          },
          {
            icon: Briefcase,
            title: "Interactive Experiences",
            desc: "Building interactive elements and animations to bring designs to life.",
            animClass: "animate-zoomIn stagger-delay-3",
          },
        ].map((service) => (
          <div
            className={`service-card ${service.animClass}`}
            key={service.title}>
            <service.icon size={48} className="service-card-icon" />
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-description">{service.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

export default HomePage;
