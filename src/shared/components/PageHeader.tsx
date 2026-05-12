import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconClassName?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconClassName,
  actions,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-full bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-border flex flex-col md:flex-row items-center justify-between gap-6",
        className
      )}
    >
      <div className="flex items-center gap-5 md:gap-6 w-full md:w-auto">
        <div className={cn(
          "h-14 w-14 md:h-16 md:w-16 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner border border-border/50 bg-secondary/30",
          iconClassName
        )}>
          <Icon size={28} className="text-primary" />
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="text-xl md:text-2xl font-heading font-black text-primary tracking-tighter leading-tight truncate">
            {title}
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="h-0.5 w-6 bg-primary/20 rounded-full" />
            <p className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] truncate">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {actions}
      </div>
    </motion.div>
  );
};
