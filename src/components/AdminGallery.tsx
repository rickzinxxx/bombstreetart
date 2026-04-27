import React, { useState, useEffect } from 'react';
import { auth, db, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { Plus, Trash2, LogOut, Lock, Globe, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ADMIN_EMAIL = "aigerakabane81983521523@gmail.com";

export const AdminGallery = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("RECIFE/PE");
  const [newCategory, setNewCategory] = useState("gallery");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      const q = collection(db, "gallery");
      const unsub = onSnapshot(q, (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Sort manually by createdAt to avoid index requirement
        docs.sort((a: any, b: any) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t2 - t1;
        });
        setItems(docs);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, "gallery");
      });
      return () => unsub();
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("A imagem é muito grande! Por favor, use imagens menores que 1MB.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewUrl(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    try {
      await addDoc(collection(db, "gallery"), {
        url: newUrl,
        title: newTitle,
        location: newLocation,
        category: newCategory,
        createdAt: serverTimestamp(),
      });
      setNewUrl("");
      setNewTitle("");
      alert("Postado com sucesso!");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "gallery");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateCategory = async (id: string, cat: string) => {
    try {
      await updateDoc(doc(db, "gallery", id), { category: cat });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, "gallery");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "gallery", id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, "gallery");
    }
  };

  if (loading) return <div className="p-20 text-white font-display italic">Carregando...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-16 h-16 text-brand-accent mb-6" />
        <h2 className="text-4xl font-display font-black text-white italic mb-4">ACESSO RESTRITO</h2>
        <p className="text-white/50 mb-8 max-w-md">Esta área é exclusiva para administração do conteúdo do site.</p>
        <button 
          onClick={signInWithGoogle}
          className="bg-brand-accent text-brand-black font-black italic px-8 py-4 uppercase flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-display font-black text-white italic uppercase tracking-tighter">Painel Admin</h1>
            <p className="text-brand-accent text-sm font-bold italic">{user.email}</p>
          </div>
          <button 
            onClick={logout}
            className="text-white/50 hover:text-white flex items-center gap-2 text-sm font-bold uppercase italic"
          >
            <LogOut size={16} /> Sair
          </button>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-12 bg-white/5 p-8 border border-white/10">
              <h3 className="text-xl font-display font-black text-white italic uppercase mb-6 flex items-center gap-2">
                <Plus size={20} className="text-brand-accent" /> Adicionar Imagem
              </h3>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/50 font-black uppercase mb-1">Anexar Imagem (Máx 1MB)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-brand-black border border-white/20 p-2 text-white text-xs focus:border-brand-accent outline-none file:bg-brand-accent file:border-none file:px-2 file:py-1 file:mr-4 file:text-[10px] file:font-black file:italic file:uppercase"
                  />
                </div>
                <div className="flex items-center gap-2 py-2">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="text-[8px] text-white/30 font-bold">OU USE URL</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 font-black uppercase mb-1">URL da Imagem</label>
                  <input 
                    type="url" 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-brand-black border border-white/20 p-3 text-white text-sm focus:border-brand-accent outline-none"
                    required
                  />
                </div>
                {newUrl && (
                  <div className="aspect-video w-full border border-white/10 overflow-hidden bg-black/40">
                    <img src={newUrl} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <label className="block text-[10px] text-white/50 font-black uppercase mb-1">Onde exibir no site? (Categoria)</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-brand-black border border-white/20 p-3 text-white text-sm focus:border-brand-accent outline-none uppercase font-bold italic"
                  >
                    <option value="hero">Destaque (Topo do Site)</option>
                    <option value="collection">Coleção (Produtos)</option>
                    <option value="gallery">Galeria (Geral)</option>
                  </select>
                  <p className="text-[9px] text-brand-accent mt-1 italic">* Destaque exibe as 4 fotos principais.</p>
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 font-black uppercase mb-1">Título</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Estilo de Rua"
                    className="w-full bg-brand-black border border-white/20 p-3 text-white text-sm focus:border-brand-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 font-black uppercase mb-1">Localização</label>
                  <input 
                    type="text" 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-brand-black border border-white/20 p-3 text-white text-sm focus:border-brand-accent outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={uploading || !newUrl}
                  className="w-full bg-brand-accent text-brand-black font-black italic p-4 uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Processando..." : "Publicar no Site"}
                </button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-display font-black text-white italic uppercase mb-6">Imagens Publicadas ({items.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative aspect-[3/4] border border-white/10 overflow-hidden"
                  >
                    <img src={item.url} alt="" className="w-full h-full object-cover transition-all" />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-end">
                          <div className="w-full">
                            <p className="text-[10px] text-white font-black italic uppercase truncate">{item.title || "Sem título"}</p>
                            <p className="text-[8px] text-brand-accent font-bold italic">{item.location}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag size={8} className="text-white/50" />
                            <select 
                              value={item.category || "gallery"}
                              onChange={(e) => handleUpdateCategory(item.id, e.target.value)}
                              className="text-[7px] bg-white text-black px-1 font-black uppercase mb-0.5 outline-none cursor-pointer"
                            >
                              <option value="hero">HERO</option>
                              <option value="collection">COLLECTION</option>
                              <option value="gallery">GALLERY</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <div className="col-span-full border-2 border-dashed border-white/10 p-20 flex flex-col items-center justify-center text-white/20 italic font-display">
                  <Globe className="mb-4 opacity-50" />
                  Nenhuma imagem postada.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
