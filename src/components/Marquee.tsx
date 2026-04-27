import { motion } from 'motion/react';

export const Marquee = () => {
  const words = ["STREETWEAR", "RECIFE", "BOMB ART", "ORIGINAL", "URBAN CULTURE"];
  
  return (
    <div className="bg-brand-accent py-4 overflow-hidden flex whitespace-nowrap border-y-4 border-black z-20 relative transform -rotate-1">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {words.map((word) => (
              <span key={word} className="text-black font-display font-black italic text-3xl tracking-tighter uppercase flex items-center">
                {word} <span className="mx-6 text-black/30">💣</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
