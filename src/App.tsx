/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { AdminGallery } from './components/AdminGallery';
import { MainGallery } from './components/MainGallery';
import { AboutUs } from './components/AboutUs';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const ADMIN_EMAIL = "aigerakabane81983521523@gmail.com";

export default function App() {
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      unsub();
    };
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  if (isAdminView) {
    return (
      <div className="min-h-screen selection:bg-brand-accent selection:text-white bg-brand-black">
        <div className="p-4 bg-brand-black border-b border-white/10 flex justify-between items-center">
          <a href="#" className="text-white font-black italic uppercase text-xs hover:text-brand-accent flex items-center gap-2">
            ← Voltar para o Site
          </a>
          <div className="text-[10px] text-brand-accent font-black italic uppercase">Painel de Controle Ativo</div>
        </div>
        <AdminGallery />
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar user={user} isAdmin={isAdmin} />
      <main>
        <Hero />
        <Marquee />
        <ProductGrid />
        <AboutUs />
        <MainGallery />
      </main>
      <Footer />
      {/* Hidden Admin Entry per request - will remove later if desired */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <a href="#admin" className="bg-brand-accent text-black px-3 py-1 text-[10px] font-black uppercase italic shadow-xl">
            Admin
          </a>
        </div>
      )}
    </div>
  );
}
