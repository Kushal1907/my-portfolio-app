import { Section } from "../App"; // Assuming Section is exported from App.js or a common components file
import profilePhotoFromFile from "../Kushal Arora_Photo.jpg"; // Adjusted path

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

export default AboutPage;
