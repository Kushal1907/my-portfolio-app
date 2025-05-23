import {
  ArrowUp,
  Briefcase,
  Code,
  Github,
  Home,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  Twitter,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import "./App.css";

import profilePhotoFromFile from "./Kushal Arora_Photo.jpg";

import { sendContactMessage } from "./api";

const Section = ({ children, className = "", id }) => (
  <section id={id} className={`section ${className}`}>
    <div className="section-container"> {children}</div>
  </section>
);

const NavItem = ({
  href,
  page,
  currentPage,
  setCurrentPage,
  children,
  Icon,
  isMobile,
  closeMobileMenu,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      setCurrentPage(page);
      if (isMobile && closeMobileMenu) {
        closeMobileMenu();
      }
      setTimeout(() => {
        const element = document.getElementById(page);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (href === "#home" || page === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 0);
    }}
    className={`nav-item ${
      currentPage === page ? "nav-item-active" : "nav-item-default"
    } ${isMobile ? "nav-item-mobile" : ""}`}>
    {Icon && <Icon size={18} className="nav-item-icon" />}
    {children}
  </a>
);

// Theme Toggle Button Component
const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="theme-toggle-button"
    aria-label={
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    }
    title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"} // Tooltip
  >
    {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
  </button>
);

const Navbar = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "#home", page: "home", text: "Home", Icon: Home },
    { href: "#projects", page: "projects", text: "Projects", Icon: Briefcase },
    { href: "#about", page: "about", text: "About", Icon: User },
    { href: "#contact", page: "contact", text: "Contact", Icon: Mail },
  ];

  // Effect for handling window resize and scroll events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Navbar changes style after 20px scroll
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    // Initial check for scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Effect for preventing body scroll when mobile menu is open
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
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("home");
                setIsMobileMenuOpen(false);
                setTimeout(
                  () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  0
                );
              }}
              className="navbar-brand">
              <Code size={28} className="navbar-brand-icon" />
              KUSHAL ARORA {/* Replace with your actual name/brand */}
            </a>
          </div>
          <div className="navbar-links-desktop">
            <div className="navbar-links-list">
              {navLinks.map((link) => (
                <NavItem
                  key={link.page}
                  {...link}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
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
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}{" "}
              {/* Icon size matched CSS */}
            </button>
          </div>
        </div>
      </div>
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <NavItem
              key={link.page}
              {...link}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isMobile
              closeMobileMenu={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ setCurrentPage }) => (
  <div className="hero-section">
    <div className="hero-content">
      <h1 className="hero-title animate-fadeInUp stagger-delay-1">
        Welcome to My Portfolio
      </h1>
      <p className="hero-subtitle animate-fadeInUp stagger-delay-2">
        I'm a passionate developer creating modern and interactive web
        experiences. Explore my work and get to know me better.
      </p>
      <div className="hero-buttons animate-fadeInUp stagger-delay-3">
        <button
          onClick={() => setCurrentPage("projects")}
          className="button button-primary hero-button-work">
          View My Work
        </button>
        <button
          onClick={() => setCurrentPage("contact")}
          className="button button-secondary hero-button-contact">
          Get In Touch
        </button>
      </div>
    </div>
  </div>
);

const HomePage = ({ setCurrentPage }) => (
  <div id="home">
    <HeroSection setCurrentPage={setCurrentPage} />
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
            icon: Code,
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
            Live Demo <Home size={16} className="link-icon" />
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
      title: "Portfoilio Website",
      description:
        "A portfolio website is like an online résumé. Potential clients and hiring managers can easily find you online and check your previous projects and skills",
      imageUrl:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUtY29tbWVyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
      repoLink: "#",
    },
    {
      title: "MERN CHAT APP",
      description: "Web Application to chat online with friends.",
      imageUrl:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      liveLink: "#",
      repoLink: "https://github.com/Kushal1907/Mern-Chat-App",
    },
    {
      title: "SIGN LANGUAGE TO TEXT AND SPEECH CONVERSION ",
      description:
        "A website where users may converse, exchange information, and create web content. ",
      imageUrl:
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydGZvbGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      techStack: ["AI", "Machine Learning", "Python"],
      liveLink: "#",
      repoLink: "https://github.com/Kushal1907/SIGN-LANGUAGE-CONVERTOR",
    },
    {
      title: "STUDENT DATABASE MANAGEMENT SYSTEM ",
      description:
        "Student database management system manages attendance, administrative, and other major website controls.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["HTML5", "CSS3", "JS", "REACT", "Node.js", "SQL"],
      liveLink: "#",
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
  const initialBio = `Hello! I'm <strong>Kushal Arora</strong>, a passionate and creative <strong>Creative Frontend Developer</strong> based in <strong>The Digital Realm</strong>.<br/>I thrive on turning complex problems into <strong>elegant, user-friendly solutions</strong>. My journey in web development started with a fascination for how interactive digital experiences are built, and it has grown into a deep-seated passion.<br/>I specialize in <strong>React, Node.js, and modern JavaScript frameworks</strong>. I'm always eager to learn new technologies and methodologies to enhance my skill set and deliver cutting-edge results.<br/>When I'm not coding, you can find me exploring new tech, reading books, or working on personal creative projects.`;
  const skills = [
    "React",
    "JavaScript (ES6+)",
    "TypeScript",
    "Node.js & Express",
    "MongoDB & SQL",
    "HTML5 & CSS3",
    "TailwindCSS & SCSS",
    "Git & GitHub Actions",
    "REST & GraphQL APIs",
    "UI/UX Principles",
    "Responsive Design",
    "Framer Motion",
  ];

  // Fallback image URL if the imported image fails or for default
  const fallbackPhotoUrl =
    "https://placehold.co/400x480/1e293b/94a3b8?text=Kushal+Arora";

  return (
    <Section id="about" className="about-section">
      <h2 className="section-title animate-fadeInUp">About Me</h2>
      <div className="about-grid">
        <div className="about-image-container animate-fadeInLeft stagger-delay-1">
          <img
            src={profilePhotoFromFile || fallbackPhotoUrl} // Use imported image, fallback if needed
            alt="Kushal Arora"
            className="about-image"
            onError={(e) => {
              // If the imported image also fails (e.g., path issue in build), use a generic placeholder
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
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setResponseMsg("");
    setErrorMsg("");
    try {
      const response = await sendContactMessage(formData);
      setResponseMsg(
        response.data.msg || "Message sent successfully! I'll be in touch soon."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(
        "Contact form submission error:",
        err.response || err.message || err
      );
      setErrorMsg(
        err.response?.data?.msg ||
          "Oops! Something went wrong. Please try again or contact me directly."
      );
    }
    setIsSending(false);
  };
  return (
    <Section id="contact" className="contact-section">
      <h2 className="section-title animate-fadeInUp">Get In Touch</h2>
      <div className="contact-form-container animate-zoomIn stagger-delay-1">
        <p className="contact-intro-text">
          Have a project in mind, a question, or just want to say hi? Feel free
          to reach out!
        </p>
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
          {responseMsg && <p className="form-success-message">{responseMsg}</p>}
          {errorMsg && <p className="form-error-message">{errorMsg}</p>}
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
    </Section>
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
            label: "GitHub",
          },
          {
            href: "https://www.linkedin.com/in/kushal1907/",
            icon: Linkedin,
            label: "LinkedIn",
          },
          {
            href: "https://twitter.com/yourusername", // Replace with your actual Twitter
            icon: Twitter,
            label: "Twitter",
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
            aria-label={`Visit my ${social.label} profile`}>
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

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Adjust this value as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      aria-label="Scroll to top"
      title="Scroll to top" // Tooltip
    >
      <ArrowUp size={24} />
    </button>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  // Theme state: try to load from localStorage, default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Effect to apply theme to HTML element and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Effect for scrolling to top on page change (if not a hash link navigation)
  useEffect(() => {
    const currentHash = window.location.hash.substring(1);
    if (currentHash !== currentPage && currentPage === "home") {
      window.scrollTo(0, 0);
    } else if (currentHash !== currentPage && !currentHash) {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div key="home">
            <HomePage setCurrentPage={setCurrentPage} />
          </div>
        );
      case "projects":
        return (
          <div key="projects">
            <ProjectsPage />
          </div>
        );
      case "about":
        return (
          <div key="about">
            <AboutPage />
          </div>
        );
      case "contact":
        return (
          <div key="contact">
            <ContactPage />
          </div>
        );
      default:
        return (
          <div key="defaultHome">
            <HomePage setCurrentPage={setCurrentPage} />
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="main-content">{renderPage()}</main>
      <Footer />
      <ScrollToTopButton /> {/* Add the scroll to top button here */}
    </div>
  );
}

export default App;
