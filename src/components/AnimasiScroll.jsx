import { useState, useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";

const useScrollAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Section refs
  const refs = {
    container: useRef(null),
    hero: useRef(null),
    trust: useRef(null),
    features: useRef(null),
    whyChooseUs: useRef(null),
    faq: useRef(null),
    testimoni: useRef(null),
    cta: useRef(null),
  };

  // Track section visibility
  const isContainerInView = useInView(refs.container, { once: false, amount: 0.1 });
  const isHeroInView = useInView(refs.hero, { once: false, amount: 0.2 });
  const isTrustInView = useInView(refs.trust, { once: false, amount: 0.1 });
  const isFeaturesInView = useInView(refs.features, { once: false, amount: 0.1 });
  const isWhyChooseUsInView = useInView(refs.whyChooseUs, { once: false, amount: 0.1 });
  const isFaq = useInView(refs.faq, { once: false, amount: 0.1 });
  const isTestimoni = useInView(refs.testimoni, { once: false, amount: 0.1 });
  const isCtaInView = useInView(refs.cta, { once: false, amount: 0.1 });

  // Animation controls
  const controls = {
    hero: useAnimation(),
    trust: useAnimation(),
    features: useAnimation(),
    whyChooseUs: useAnimation(),
    faq: useAnimation(),
    testimoni: useAnimation(),
    cta: useAnimation(),
  };

  // Section variants for animations
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
        staggerChildren: 0.05,
        when: "beforeChildren",
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      }
    }
  };

  // Handle active section detection
  useEffect(() => {
    const handleActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      setIsVisible(window.scrollY > 300);

      const sections = Object.entries(refs).map(([key, ref]) => ({
        key,
        top: ref.current?.offsetTop || 0,
        height: ref.current?.offsetHeight || 0,
      }));

      const currentSection = sections.find(section =>
        scrollPosition >= section.top &&
        scrollPosition < section.top + section.height
      );

      if (currentSection) {
        setActiveSection(currentSection.key);
      }
    };

    const debouncedScroll = debounce(handleActiveSection, 100);
    window.addEventListener("scroll", debouncedScroll);
    handleActiveSection(); // Initial check

    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  // Trigger animations when sections come into view
  useEffect(() => {
    if (isHeroInView) controls.hero.start("visible");
    if (isTrustInView) controls.trust.start("visible");
    if (isFeaturesInView) controls.features.start("visible");
    if (isWhyChooseUsInView) controls.whyChooseUs.start("visible");
    if (isFaq) controls.faq.start("visible");
    if (isTestimoni) controls.testimoni.start("visible");
    if (isCtaInView) controls.cta.start("visible");
  }, [
    isHeroInView,
    isTrustInView,
    isFeaturesInView,
    isWhyChooseUsInView,
    isFaq,
    isTestimoni,
    isCtaInView
  ]);

  return {
    refs,
    controls,
    isVisible,
    activeSection,
    sectionVariants,
    visibility: {
      isContainerInView,
      isHeroInView,
      isTrustInView,
      isFeaturesInView,
      isWhyChooseUsInView,
      isFaq,
      isTestimoni,
      isCtaInView,
    }
  };
};

// Simple debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default useScrollAnimations;
