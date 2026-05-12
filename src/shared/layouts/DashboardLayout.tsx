import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Responsive Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full max-w-[1600px] mx-auto"
          >
            {children}
          </motion.div>
        </main>
        
        <footer className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between px-6 lg:px-10 gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/50 backdrop-blur-sm">
          <p>© 2026 MediPlus Pro - Gestión Médica Premium</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Soporte Técnico</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
