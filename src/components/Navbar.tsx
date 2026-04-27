import { motion } from 'motion/react';
import { ShoppingBag, Instagram, Send } from 'lucide-react';
import { BRAND_INFO } from '../constants';

import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  isAdmin: boolean;
}

export const Navbar = ({ user, isAdmin }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-bottom border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-brand-accent flex items-center justify-center font-display font-black text-xl text-black transform -rotate-3 italic underline">
            B
          </div>
          <span className="font-display font-black text-xl italic tracking-tighter uppercase">
            BOMB <span className="text-brand-accent">STREET ART</span>
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8 mr-4">
            <a href="#products" className="text-white hover:text-brand-accent transition-colors text-[10px] font-black italic uppercase tracking-widest">Coleção</a>
            <a href="#about" className="text-white hover:text-brand-accent transition-colors text-[10px] font-black italic uppercase tracking-widest">Sobre Nós</a>
          </div>
          {isAdmin && (
            <motion.a
              whileHover={{ y: -2 }}
              href="#admin"
              className="text-brand-accent hover:text-white transition-colors text-[10px] font-black italic uppercase tracking-widest"
            >
              ADM
            </motion.a>
          )}
          <motion.a
            whileHover={{ y: -2 }}
            href={`https://instagram.com/${BRAND_INFO.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-brand-accent transition-colors"
          >
            <Instagram size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${BRAND_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-accent text-black px-6 py-2 rounded-none font-display font-black italic text-xs tracking-widest"
          >
            <Send size={14} />
            <span>CONTATO</span>
          </motion.a>
        </div>
      </div>
    </nav>
  );
};
