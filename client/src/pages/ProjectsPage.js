import { Github, Home as HomeIcon } from "lucide-react"; // Import icons used here
import { Section } from "../App"; // Assuming Section is exported from App.js or a common components file

// ProjectCard Component (can also be moved to its own file if preferred)
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
        "A portfolio website is like an online resume. Potential clients and hiring managers can easily find you online and check your previous projects and skills",
      imageUrl:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUtY29tbWVyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "https://kushal-arora-portfolio.onrender.com",
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

export default ProjectsPage;
