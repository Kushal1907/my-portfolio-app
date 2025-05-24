// src/components/ParticlesBackground.js
import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log("Particles container loaded:", container);
  }, []);

  const particleOptions = useMemo(() => {
    const isLight = theme === "light";

    // Define colors with better contrast for the light theme
    // For light theme, use darker grays. For dark theme, use lighter grays.
    const particleColor = isLight ? "#4A5568" : "#94a3b8"; // Light: Darker Gray (like Tailwind gray-600), Dark: slate-400
    const lineColor = isLight ? "#A0AEC0" : "#475569"; // Light: Medium Gray (like Tailwind gray-500), Dark: slate-600

    // Optionally, you can also adjust opacities based on theme, or globally increase them slightly
    const particleGeneralOpacity = 9.6; // Slightly increased base opacity for particles
    const linkGeneralOpacity = 9.9; // Slightly increased base opacity for links

    return {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 5.7, // Keep grab opacity higher
              color: lineColor, // Uses the themed line color
            },
          },
          push: {
            quantity: 2,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: lineColor,
          distance: 120,
          enable: true,
          opacity: linkGeneralOpacity, // Use general link opacity
          width: 1,
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 40,
        },
        opacity: {
          value: particleGeneralOpacity, // Use general particle opacity
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
    };
  }, [theme]); // Recompute options when theme changes

  if (!particleOptions) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
    />
  );
};

export default ParticlesBackground;
