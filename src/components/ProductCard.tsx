import React from 'react';
import { motion } from 'motion/react';
import { Send, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { BRAND_INFO } from '../constants';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappMessage = encodeURIComponent(
    `Salve! Vi a ${product.name} no site e tenho interesse. Ainda disponível?`
  );

  return (
    <div className="group relative bg-[#0D0D0D] p-2 border-2 border-white/5 hover:border-brand-accent transition-colors">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-accent text-black px-2 py-1 text-[10px] font-black uppercase italic tracking-widest">
            {product.category}
          </span>
        </div>
        
        {/* Overlay Action */}
        <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <a
            href={`https://wa.me/${BRAND_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-accent text-black py-4 font-display font-black text-xs italic tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl"
          >
            <ShoppingCart size={16} />
            ADQUIRIR AGORA
          </a>
        </div>
      </div>

      <div className="p-4 bg-black/40 backdrop-blur-sm mt-2">
        <h3 className="font-display font-black italic text-lg mb-1 group-hover:text-brand-accent transition-colors tracking-tight uppercase">
          {product.name}
        </h3>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase font-bold italic">Valor do Drop</span>
            <span className="font-display font-black italic text-2xl text-white">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <Send size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
