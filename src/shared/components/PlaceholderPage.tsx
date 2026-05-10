import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-6"
      >
        <div className="p-6 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xl shadow-primary/5">
          <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Módulo listo para implementación. Esta sección está siendo preparada para ofrecer la mejor experiencia médica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl border border-dashed border-muted-foreground/20 bg-muted/50 animate-pulse flex items-center justify-center">
              <div className="h-2 w-24 bg-muted-foreground/10 rounded-full" />
            </div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs font-medium uppercase tracking-widest text-primary/50"
        >
          Premium Interface Ready
        </motion.div>
      </motion.div>
    </div>
  );
};
