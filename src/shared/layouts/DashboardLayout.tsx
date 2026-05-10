import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-foreground">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
        
        <footer className="h-14 border-t border-border flex items-center justify-between px-8 text-xs text-muted-foreground">
          <p>© 2026 MediPlus Pro - Sistema de Gestión Médica Avanzada</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Soporte</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
