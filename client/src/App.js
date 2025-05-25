import {
  ArrowUp,
  Briefcase,
  CheckCircle,
  Code,
  Facebook,
  Github,
  Home as HomeIcon,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import profilePhotoFromFile from "./Kushal Arora_Photo.jpg";
import { sendContactMessage } from "./api";
import ParticlesBackground from "./components/ParticlesBackground";

// Utility Component to Scroll to Top on Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Section Component
const Section = ({ children, className = "", id }) => (
  <section id={id} className={`section ${className}`}>
    <div className="section-container"> {children}</div>
  </section>
);

// NavItem Component
const NavItem = ({ to, page, children, Icon, isMobile, closeMobileMenu }) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to === "/" && location.pathname.startsWith("/#"));
  return (
    <Link
      to={to}
      onClick={() => {
        if (isMobile && closeMobileMenu) {
          closeMobileMenu();
        }
      }}
      className={`nav-item ${
        isActive ? "nav-item-active" : "nav-item-default"
      } ${isMobile ? "nav-item-mobile" : ""}`}
      aria-current={isActive ? "page" : undefined}>
      {Icon && <Icon size={18} className="nav-item-icon" />}
      {children}
    </Link>
  );
};

// Theme Toggle Button Component
const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="theme-toggle-button"
    aria-label={
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    }
    title={
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    }>
    {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
  </button>
);

// Navbar Component
const Navbar = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    { to: "/", page: "home", text: "Home", Icon: HomeIcon },
    { to: "/projects", page: "projects", text: "Projects", Icon: Briefcase },
    { to: "/about", page: "about", text: "About", Icon: User },
    { to: "/contact", page: "contact", text: "Contact", Icon: Mail },
  ];
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMobileMenuOpen]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen)
        setIsMobileMenuOpen(false);
    };
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);
  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand-section">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="navbar-brand">
              {/* Reverted to Code icon */}
              <Code size={28} className="navbar-brand-icon" />
              KUSHAL ARORA
            </Link>
          </div>
          <div className="navbar-links-desktop">
            <div className="navbar-links-list">
              {navLinks.map((link) => (
                <NavItem
                  key={link.page}
                  {...link}
                  closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="navbar-mobile-menu-toggle-section">
            <div className="mobile-theme-toggle-container">
              <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
              aria-label={
                isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-content">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu-content"
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <NavItem
              key={link.page}
              {...link}
              isMobile
              closeMobileMenu={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

// Enhanced HeroSection Component with Simplified Title
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
        {/* ✨ SIMPLIFIED HERO TITLE - Animation class added for consistency ✨ */}
        <h1 className="section-title animate-fadeInUp">
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

// HomePage Component
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

// ProjectCard, ProjectsPage, AboutPage, ContactPage, Footer, ScrollToTopButton components (remain unchanged)
// ... (Assume these components are here and correct as per your last version)
const ProjectCard = ({
  title,
  description,
  imageUrl,
  techStack,
  liveLink,
  repoLink,
  animationClass = "",
}) => (
  <div className={`project-card ${animationClass}`}>
    <div className="project-card-image-container">
      <img
        src={
          imageUrl ||
          `https://placehold.co/600x400/1e293b/94a3b8?text=${encodeURIComponent(
            title
          )}`
        }
        alt={title}
        className="project-card-image"
        onError={(e) => {
          e.target.src = `https://placehold.co/600x400/1e293b/94a3b8?text=Image+Error`;
        }}
        loading="lazy"
      />
    </div>
    <div className="project-card-content">
      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-description">{description}</p>
      <div className="project-card-tech-stack-section">
        <h4 className="project-card-tech-stack-heading">Tech Stack:</h4>
        <div className="tech-stack-list">
          {techStack.map((tech) => (
            <span key={tech} className="tech-stack-item">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="project-card-links">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link project-card-link-live">
            Live Demo <HomeIcon size={16} className="link-icon" />
          </a>
        )}
        {repoLink && (
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link project-card-link-repo">
            <Github size={16} className="link-icon-leading" /> Code
          </a>
        )}
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const projects = [
    {
      title: "PORTFOLIO WEBSITE",
      description:
        "A portfolio website is like an online résumé. Potential clients and hiring managers can easily find you online and check your previous projects and skills",
      imageUrl:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUtY29tbWVyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
      repoLink: "https://github.com/Kushal1907/my-portfolio-app",
    },
    {
      title: "MERN CHAT APP",
      description: "Web Application to chat online with friends.",
      imageUrl:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      liveLink: "https://github.com/Kushal1907/Mern-Chat-App",
      repoLink: "https://github.com/Kushal1907/Mern-Chat-App",
    },
    {
      title: "SIGN LANGUAGE TO TEXT AND SPEECH CONVERSION ",
      description:
        "A website where users may converse, exchange information, and create web content. ",
      imageUrl:
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      techStack: ["AI", "Machine Learning", "Python"],
      liveLink: "https://github.com/Kushal1907/SIGN-LANGUAGE-CONVERTOR",
      repoLink: "https://github.com/Kushal1907/SIGN-LANGUAGE-CONVERTOR",
    },
    {
      title: "STUDENT DATABASE MANAGEMENT SYSTEM ",
      description:
        "Student database management system manages attendance, administrative, and other major website controls.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["HTML5", "CSS3", "JS", "REACT", "Node.js", "SQL"],
      liveLink:
        "https://github.com/Kushal1907/Student-Database-Management-System",
      repoLink:
        "https://github.com/Kushal1907/Student-Database-Management-System",
    },
  ];
  return (
    <Section id="projects" className="projects-section">
      <h2 className="section-title animate-fadeInUp">My Work & Projects</h2>
      <div className="projects-grid stagger-children">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            animationClass={`animate-zoomIn stagger-delay-${
              (index % projects.length) + 1
            }`}
          />
        ))}
      </div>
    </Section>
  );
};

const AboutPage = () => {
  const initialBio = `Hello! I'm <strong>Kushal Arora</strong>, a passionate and <strong>Creative Frontend Developer</strong> based in The Digital Realm.<br/>I thrive on turning complex problems into elegant, user-friendly solutions. My journey in web development started with a fascination for how interactive digital experiences are built, and it has grown into a deep-seated passion.<br/>I specialize in React, Node.js, and modern JavaScript frameworks. I'm always eager to learn new technologies and methodologies to enhance my skill set and deliver cutting-edge results.<br/>When I'm not coding, you can find me exploring new tech, reading books, or working on personal creative projects.`;
  const skills = [
    "React",
    "JavaScript (ES6+)",
    "Node.js & Express",
    "MongoDB & SQL",
    "HTML5 & CSS3",
    "TailwindCSS",
    "Git & GitHub Actions",
    "UI/UX Principles",
    "Responsive Design",
  ];
  const fallbackPhotoUrl =
    "https://placehold.co/400x480/1e293b/94a3b8?text=Kushal+Arora";
  return (
    <Section id="about" className="about-section">
      <h2 className="section-title animate-fadeInUp">About Me</h2>
      <div className="about-grid">
        <div className="about-image-container animate-fadeInLeft stagger-delay-1">
          <img
            src={profilePhotoFromFile || fallbackPhotoUrl}
            alt="Kushal Arora, a creative frontend developer."
            className="about-image"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x480/1e293b/94a3b8?text=Photo+Error`;
            }}
            loading="lazy"
          />
        </div>
        <div className="about-text-content animate-fadeInRight stagger-delay-2">
          <div
            className="about-bio"
            dangerouslySetInnerHTML={{ __html: initialBio }}
          />
          <h3 className="about-skills-title">My Skills</h3>
          <div className="skills-list stagger-children">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className={`skill-item animate-fadeInUp stagger-delay-${
                  (index % 6) + 1
                }`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setShowToast(false);
    try {
      const response = await sendContactMessage(formData);
      const successMessage =
        response.data.msg ||
        "Message sent successfully! I'll be in touch soon.";
      setToastType("success");
      setToastMessage(successMessage);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(
        "Contact form submission error:",
        err.response || err.message || err
      );
      const errorMessage =
        err.response?.data?.msg ||
        "Oops! Something went wrong. Please try again.";
      setToastType("error");
      setToastMessage(errorMessage);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    }
    setIsSending(false);
  };
  return (
    <>
      {showToast && (
        <div
          className={`toast-notification show ${toastType}`}
          role={toastType === "error" ? "alert" : "status"}>
          {toastType === "success" ? (
            <CheckCircle size={20} className="toast-icon" />
          ) : (
            <XCircle size={20} className="toast-icon" />
          )}
          {toastMessage}
          <button
            onClick={() => setShowToast(false)}
            className="toast-close-button"
            aria-label="Close notification">
            <X size={18} />
          </button>
        </div>
      )}
      <Section id="contact" className="contact-section">
        <h2 className="section-title animate-fadeInUp">Get In Touch</h2>
        <div className="contact-content-grid animate-fadeInUp stagger-delay-1">
          <div className="contact-details">
            <h3 className="contact-details-heading">Reach Me Directly</h3>
            <p
              className="contact-intro-text"
              style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities. Feel free to reach out via email or phone.
            </p>
            <ul className="contact-info-list">
              <li>
                <Mail size={20} className="contact-info-icon" />
                <a href="mailto:kusharora19072001@gmail.com">
                  kusharora19072001@gmail.com
                </a>
              </li>
              <li>
                <Phone size={20} className="contact-info-icon" />
                <a href="tel:+919817864314">+91 9817864314</a>
              </li>
              <li>
                <MapPin size={20} className="contact-info-icon" />
                <span>Ambala, Haryana, India</span>
              </li>
            </ul>
            <p className="contact-page-form-cta">
              Or, use the form to send a message:
            </p>
          </div>
          <div className="contact-form-wrapper">
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group animate-fadeInUp stagger-delay-2">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group animate-fadeInUp stagger-delay-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group animate-fadeInUp stagger-delay-4">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    className="form-textarea"
                    placeholder="Let's build something amazing..."
                    value={formData.message}
                    onChange={handleChange}
                    required></textarea>
                </div>
                <div className="animate-fadeInUp stagger-delay-5">
                  <button
                    type="submit"
                    className={`button button-submit contact-submit-button ${
                      isSending ? "sending" : ""
                    }`}
                    disabled={isSending}>
                    {isSending ? (
                      <Loader2
                        size={20}
                        className="animate-spin button-icon-leading"
                      />
                    ) : (
                      <Send size={20} className="button-icon-leading" />
                    )}
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

const Footer = () => (
  <footer className="footer animate-fadeInUp">
    <div className="footer-container">
      <div className="social-links">
        {[
          {
            href: "https://github.com/Kushal1907",
            icon: Github,
            label: "GitHub profile of Kushal Arora",
          },
          {
            href: "https://www.linkedin.com/in/kushal1907/",
            icon: Linkedin,
            label: "LinkedIn profile of Kushal Arora",
          },
          {
            href: "https://www.facebook.com/yourfacebookusername",
            icon: Facebook,
            label: "Facebook profile of Kushal Arora",
          },
        ].map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link animate-fadeInUp stagger-delay-${
              index + 1
            }`}
            aria-label={social.label}>
            <social.icon />
          </a>
        ))}
      </div>
      <p className="footer-copyright animate-fadeInUp stagger-delay-4">
        &copy; {new Date().getFullYear()} Kushal Arora. All rights reserved.
      </p>
      <p className="footer-credits animate-fadeInUp stagger-delay-5">
        Built with React & ❤️. Designed with creativity.
      </p>
    </div>
  </footer>
);

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      aria-label="Scroll to top"
      title="Scroll to top">
      <ArrowUp size={24} />
    </button>
  );
};

// Main App Component
function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to Main Content
      </a>
      <ParticlesBackground theme={theme} />
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="*"
            element={
              <Section
                id="not-found"
                className="not-found-section"
                style={{ textAlign: "center", padding: "5rem 1rem" }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Link
                  to="/"
                  className="button button-primary"
                  style={{ marginTop: "1.5rem" }}>
                  Go to Homepage
                </Link>
              </Section>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
