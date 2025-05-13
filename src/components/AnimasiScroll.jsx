import { useState, useEffect, useRef, useCallback } from "react";
import { useAnimation, useInView } from "framer-motion";

const useScrollAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const animationFrameId = useRef(null);
  const lastScrollY = useRef(0);

  // Section refs
  const refs = {
    container: useRef(null),
    hero: useRef(null),
    quotes: useRef(null),
    trust: useRef(null),
    features: useRef(null),
    whyChooseUs: useRef(null),
    faq: useRef(null),
    testimoni: useRef(null),
    cta: useRef(null),
  };

  // Optimized intersection observer thresholds
  const observerOptions = {
    rootMargin: '0px 0px -15% 0px', // Triggers when 15% of element is visible
    threshold: 0.05
  };

  // Track section visibility with optimized thresholds
  const isContainerInView = useInView(refs.container, { 
    once: false,
    ...observerOptions
  });
  const isHeroInView = useInView(refs.hero, { 
    once: false,
    amount: 0.15, // Lower threshold for hero section
    margin: "0px 0px -20% 0px"
  });

  const isQuotesInView = useInView(refs.quotes, observerOptions);
  const isTrustInView = useInView(refs.trust, observerOptions);
  const isFeaturesInView = useInView(refs.features, observerOptions);
  const isWhyChooseUsInView = useInView(refs.whyChooseUs, observerOptions);
  const isFaq = useInView(refs.faq, observerOptions);
  const isTestimoni = useInView(refs.testimoni, observerOptions);
  const isCtaInView = useInView(refs.cta, { 
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px" // Earlier trigger for CTA
  });

  // Animation controls with initial states
  const controls = {
    hero: useAnimation(),
    quotes: useAnimation(),
    trust: useAnimation(),
    features: useAnimation(),
    whyChooseUs: useAnimation(),
    faq: useAnimation(),
    testimoni: useAnimation(),
    cta: useAnimation(),
  };

  // Lightweight variants optimized for performance
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, // Reduced movement distance
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Smoother easing
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  // Text variants for child elements
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  // Stagger container with optimized timing
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1, // Reduced initial delay
      },
    },
  };

  // Efficient scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      
      // Only update if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) > 30) {
        setIsVisible(currentScrollY > 100);
        updateActiveSection();
        lastScrollY.current = currentScrollY;
      }
    });
  }, []);

  // Active section detection
  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + (window.innerHeight / 3);
    
    const sections = Object.entries(refs)
      .filter(([key]) => key !== 'container')
      .map(([key, ref]) => ({
        key,
        top: ref.current?.offsetTop || 0,
        height: ref.current?.offsetHeight || 0,
      }))
      .sort((a, b) => a.top - b.top);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (scrollPosition >= section.top && scrollPosition < section.top + section.height) {
        if (activeSection !== section.key) {
          setActiveSection(section.key);
        }
        break;
      }
    }
  }, [activeSection]);

  // Initialize animations on mount
  useEffect(() => {
    // Set initial states
    controls.hero.set("hidden");
    controls.quotes.set("hidden");
    controls.trust.set("hidden");
    controls.features.set("hidden");
    controls.whyChooseUs.set("hidden");
    controls.faq.set("hidden");
    controls.testimoni.set("hidden");
    controls.cta.set("hidden");

    // Initial check
    updateActiveSection();
  }, []);

  // Scroll event listener with optimized passive handling
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll]);

  // Animation triggers with cleanup
  useEffect(() => {
    if (isHeroInView) controls.hero.start("visible");
    if (isQuotesInView) controls.quotes.start("visible");
    if (isTrustInView) controls.trust.start("visible");
    if (isFeaturesInView) controls.features.start("visible");
    if (isWhyChooseUsInView) controls.whyChooseUs.start("visible");
    if (isFaq) controls.faq.start("visible");
    if (isTestimoni) controls.testimoni.start("visible");
    if (isCtaInView) controls.cta.start("visible");
  }, [
    isHeroInView,
    isQuotesInView,
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
    textVariants,
    staggerContainer,
    visibility: {
      isContainerInView,
      isHeroInView,
      isQuotesInView,
      isTrustInView,
      isFeaturesInView,
      isWhyChooseUsInView,
      isFaq,
      isTestimoni,
      isCtaInView,
    }
  };
};

export default useScrollAnimations;