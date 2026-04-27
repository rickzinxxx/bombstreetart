import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Loader2, Camera } from 'lucide-react';

export const MainGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, "gallery");
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter((item: any) => item.category === "gallery" || !item.category)
        .sort((a: any, b: any) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t2 - t1;
        });
      setImages(items);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao carregar Galeria:", err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (!loading && images.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Camera className="text-brand-accent w-8 h-8" />
          <h2 className="text-4xl md:text-6xl font-display font-black italic uppercase text-white">GALERIA <span className="text-brand-accent">BOMB.</span></h2>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center text-white/20 italic">
            <Loader2 className="animate-spin mb-2" /> Carregando galeria...
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative group overflow-hidden border border-white/10"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full transition-all duration-500"
                />
                {(item.title || item.location) && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-black italic text-xs uppercase">{item.title}</p>
                    <p className="text-brand-accent font-bold italic text-[8px] uppercase">{item.location}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
