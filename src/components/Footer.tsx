import { motion } from 'motion/react';
import { Instagram, Send, MapPin, Package, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../constants';

export const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-accent flex items-center justify-center font-display font-black text-xl text-black transform -rotate-3 italic underline">
                B
              </div>
              <span className="font-display font-black text-2xl italic tracking-tighter uppercase">
                BOMB <span className="text-brand-accent">STREET ART</span>
              </span>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed italic">
              Elevando a cultura das ruas através da arte e do vestuário. Nascidos em Recife, para o mundo.
            </p>
            <div className="flex gap-4">
               <a href={`https://instagram.com/${BRAND_INFO.instagram}`} target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors bg-white/5">
                <Instagram size={20} />
               </a>
               <a href={`https://wa.me/${BRAND_INFO.whatsapp}`} target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors bg-white/5">
                <Send size={20} />
               </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-black italic text-xs tracking-widest text-brand-accent uppercase">Garantia</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white/60 italic font-bold">
                <div className="w-1.5 h-1.5 bg-brand-accent rotate-45" />
                <span>Envio para todo Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 italic font-bold">
                <div className="w-1.5 h-1.5 bg-brand-accent rotate-45" />
                <span>Qualidade certificada</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 italic font-bold">
                <div className="w-1.5 h-1.5 bg-brand-accent rotate-45" />
                <span>Base em Recife, PE</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <h4 className="font-display font-black italic text-xs tracking-widest text-brand-accent uppercase">Newsletter Drops</h4>
            <div className="relative flex">
              <input 
                type="email" 
                placeholder="SEU MELHOR EMAIL" 
                className="flex-1 bg-white/5 border-2 border-white/10 py-5 px-6 focus:outline-none focus:border-brand-accent transition-colors font-display text-xs tracking-widest italic"
              />
              <button className="bg-brand-accent text-black px-8 font-display font-black italic text-xs hover:bg-white transition-all uppercase">
                CADASTRAR
              </button>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] italic font-black">Fique por dentro de todos os novos drops.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-10 bg-brand-accent text-black gap-4 transform -skew-x-2">
          <p className="text-[11px] font-black uppercase italic tracking-widest">
            © {new Date().getFullYear()} {BRAND_INFO.name}. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black uppercase italic tracking-widest border-l-2 border-black/20 pl-4 leading-none">
              MADE IN RECIFE [081]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
