import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white dark:bg-gray-900">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1
        }}
      />
    </div>
  );
}
