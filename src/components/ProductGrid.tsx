import { motion } from 'motion/react';
import { PRODUCTS, BRAND_INFO } from '../constants';
import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export const ProductGrid = () => {
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, "gallery");
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter((item: any) => item.category === "collection")
        .sort((a: any, b: any) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t2 - t1;
        });
      setDynamicProducts(items);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao carregar Produtos:", err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const allProducts = dynamicProducts.length > 0 
    ? dynamicProducts.map(p => ({
        id: p.id,
        name: p.title || "Coleção Street",
        price: "Sob consulta",
        image: p.url,
        category: p.location || "Street Art"
      }))
    : PRODUCTS;

  return (
    <section id="products" className="relative py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-black italic mb-4 leading-none uppercase">
            OS MAIS <span className="text-brand-accent">BRABOS.</span>
          </h2>
          <p className="text-white/40 italic font-bold max-w-md uppercase tracking-widest text-[10px] md:text-xs">
            As peças mais pedidas diretamente pras suas mãos. Lançamentos semanais exclusivos.
          </p>
        </motion.div>
        <div className="flex gap-4 items-center">
          <span className="text-brand-accent font-display font-black italic text-5xl tracking-tighter">01</span>
          <div className="h-12 w-1 bg-white/10" />
          <span className="text-white/20 font-display font-black italic text-5xl tracking-tighter">/03</span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center text-white/20 italic">
          <Loader2 className="animate-spin mb-2" /> Carregando produtos...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-20 md:mt-32 p-8 md:p-16 bg-[#0D0D0D] border-2 md:border-4 border-brand-accent transform -rotate-0 md:-rotate-1 text-center overflow-hidden relative group cursor-pointer">
        <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-5 transition-opacity" />
        <h3 className="text-2xl md:text-6xl font-black italic mb-4 md:mb-6 uppercase tracking-tighter">PROJETO PERSONALIZADO?</h3>
        <p className="text-white/60 mb-8 md:mb-10 max-w-2xl mx-auto italic font-bold uppercase tracking-widest text-[10px] md:text-sm px-4">
          Fazemos drops exclusivos para sua marca ou evento. Entre em contato para orçamentos de atacado ou personalização.
        </p>
        <a 
          href={`https://wa.me/${BRAND_INFO.whatsapp}`}
          target="_blank"
          className="inline-block bg-brand-accent text-black px-8 md:px-12 py-4 md:py-6 font-display font-black italic text-sm md:text-xl hover:bg-white transition-all transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
        >
          CHAMA NO WHATSAPP
        </a>
      </div>
    </section>
  );
};
