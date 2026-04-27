import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, Bomb, ShoppingBag, Loader2 } from 'lucide-react';
import { BRAND_INFO } from '../constants';
import TextCursorProximity from './ui/text-cursor-proximity';
import { useRef, useState, useEffect } from 'react';
import { GradientMesh } from './ui/gradient-mesh';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, "gallery");
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter((item: any) => item.category === "hero")
        .sort((a: any, b: any) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t2 - t1;
        })
        .slice(0, 4);
      
      setGalleryImages(items);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao carregar Hero:", err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const fallbackImages = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
    'https://images.unsplash.com/photo-1517462964521-f002f33b15f9',
    'https://images.unsplash.com/photo-1510620864353-832869894a97',
    'https://images.unsplash.com/photo-1525448198276-0f27d345358b'
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen md:min-h-[120vh] flex items-center justify-center pt-24 md:pt-24 pb-12 md:pb-0 overflow-hidden px-6 bg-brand-black">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GradientMesh 
          colors={["#000000", "#111111", "#EFFF00"]}
          distortion={8}
          speed={0.2}
          scale={2}
          grain={0.1}
        />
        <div className="absolute inset-0 bg-brand-black/60" />
      </div>

      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex flex-col justify-center select-none pointer-events-none opacity-[0.07] leading-[0.8] z-1 ml-[-50px]">
        <motion.h1 
          animate={{ x: [-20, 20] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="text-[40vw] md:text-[35vw] font-black italic uppercase text-white"
        >
          BOMB
        </motion.h1>
        <motion.h1 
          animate={{ x: [20, -20] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="text-[40vw] md:text-[35vw] font-black italic uppercase text-white ml-10 md:ml-20"
        >
          STREET
        </motion.h1>
      </div>

      <div className="relative max-w-6xl mx-auto w-full z-10 text-center">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-brand-accent text-black text-[10px] font-black uppercase mb-6 italic tracking-widest">
              Coleção 2024 / {BRAND_INFO.origin}
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black italic leading-[0.8] mb-8 flex flex-col items-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              <TextCursorProximity
                label="DIRETAMENTE"
                className="will-change-transform"
                styles={{
                  transform: { from: "scale(1)", to: "scale(1.05)" },
                  color: { from: "#FFFFFF", to: "#EFFF00" },
                }}
                falloff="gaussian"
                radius={300}
                containerRef={containerRef}
              />
              <span className="flex flex-wrap items-center justify-center">
                <span className="mr-6 text-white">DAS</span>
                <TextCursorProximity
                  label="RUAS"
                  className="text-brand-accent shadow-brand-accent/20 will-change-transform"
                  styles={{
                    transform: { from: "scale(1)", to: "scale(1.2) rotate(-3deg)" },
                    color: { from: "#EFFF00", to: "#FFFFFF" },
                  }}
                  falloff="gaussian"
                  radius={350}
                  containerRef={containerRef}
                />
              </span>
            </h1>
          </motion.div>

          {/* Direct Image Grid - Firestore Dynamic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center text-white/20 italic">
                <Loader2 className="animate-spin mb-2" /> Carregando visual...
              </div>
            ) : (
              [0, 1, 2, 3].map((idx) => {
                const item = galleryImages[idx];
                const imageSrc = item?.url || fallbackImages[idx] + '?q=80&w=800&auto=format&fit=crop';
                
                return (
                  <motion.div
                    key={item?.id || `fallback-${idx}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="relative aspect-[3/4] border-2 border-white/10 overflow-hidden group shadow-2xl"
                  >
                    <img 
                      src={imageSrc}
                      alt={item?.title || `Street Style ${idx + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4 pb-8">
                      <span className="text-black font-black italic text-xs tracking-tighter bg-white px-2 py-1 mb-1">
                        {item?.location || "RECIFE/PE"}
                      </span>
                      {item?.title && (
                        <span className="text-[10px] text-brand-black font-black uppercase italic bg-brand-accent px-1">
                          {item.title}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-accent text-brand-black px-12 py-8 rounded-none font-display font-black text-2xl italic hover:bg-white hover:text-black transition-all transform flex items-center justify-center gap-4 group shadow-[0_20px_50px_rgba(239,255,0,0.3)]"
            >
              <span>VER COLEÇÃO</span>
              <span className="text-3xl transition-transform group-hover:translate-x-3">→</span>
            </button>
            <a 
              href={`https://wa.me/${BRAND_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-12 py-8 rounded-none font-display font-black text-2xl italic hover:border-brand-accent hover:text-brand-accent transition-all flex items-center justify-center gap-4 group"
            >
              CATÁLOGO
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};
