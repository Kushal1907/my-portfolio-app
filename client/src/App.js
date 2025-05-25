import {
  ArrowUp,
  Briefcase, // Used in HeroSection (will be in HomePage.js)
  Code,
  Facebook, // Used in NavLinks
  Github,
  Home as HomeIcon,
  Linkedin,
  Loader2, // Used in ContactPage (will be in its own file)
  Mail, // Used in NavLinks
  Menu,
  Moon, // Used in ContactPage (will be in its own file)
  Sun,
  User, // Used in NavLinks
  X,
} from "lucide-react";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
// profilePhotoFromFile and sendContactMessage will be used within their respective page components
// import profilePhotoFromFile from "./Kushal Arora_Photo.jpg"; // Moved to AboutPage.js
// import { sendContactMessage } from "./api"; // Moved to ContactPage.js
import ParticlesBackground from "./components/ParticlesBackground"; // Assuming this path is correct

// Lazy load page components
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

// Utility Component to Scroll to Top on Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Section Component (can be kept here or moved to a common components folder)
export const Section = ({ children, className = "", id }) => (
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

// Footer Component
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

// ScrollToTopButton Component
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

// Loading Fallback Component for Suspense
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 4.5rem)",
      color: "var(--text-primary)",
    }}>
    <Loader2 size={48} className="animate-spin" />
    <span style={{ marginLeft: "1rem", fontSize: "1.2rem" }}>
      Loading Page...
    </span>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
