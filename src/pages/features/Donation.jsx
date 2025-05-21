import React from 'react'
import { motion } from "framer-motion";
import useScrollAnimations from '../../components/AnimasiScroll';
import { HandHeart } from "lucide-react";

function Donation() {
  // Get scroll animations from hook
  const { refs, controls, sectionVariants } = useScrollAnimations();
  // Animation variants defined here (not in hooks)
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  
  return (
    <div className="bg-[#f6fefc] dark:bg-[#010907] text-[#01130c] dark:text-[#ecfef7]"
      id="content"
      ref={refs.container}
    >
      {/* Hero Section */}
            <motion.section
              ref={refs.hero}
              initial="visible"
              animate={controls.hero}
              variants={sectionVariants}
              className="relative pt-28 pb-6 px-4 md:px-8 lg:px-16"
            >
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  variants={itemVariants}
                  className="inline-block border-2 border-[#1ff498] dark:border-[#0be084] text-[#01130c] dark:text-[#ecfef7] px-4 py-1 rounded-full mb-4"
                >
                  <span className="flex items-center text-sm font-medium">
                    <HandHeart className="w-4 h-4 mr-2" />
                    Donation
                  </span>
                </motion.div>
      
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-bold mb-4"
                >
                  Donasi{" "}
                  <span className="bg-gradient-to-r from-[#1ff498] to-[#50b7f7] bg-clip-text text-transparent">
                    Membantu
                  </span>
                </motion.h1>
      
                <motion.p
                  variants={itemVariants}
                  className="text-[#01130c]/70 dark:text-[#ecfef7]/70 max-w-2xl mx-auto"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, cumque molestiae ea facilis facere amet quibusdam,
                  magni numquam accusamus quo praesentium. Ad, cumque consequatur! Possimus iure cumque aut expedita dolor!
                </motion.p>
              </div>
            </motion.section>
    </div>
  )
}

export default Donation