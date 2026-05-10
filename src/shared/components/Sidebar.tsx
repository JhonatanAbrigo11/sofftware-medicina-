import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Sparkles, 
  Scissors, 
  Package, 
  CreditCard, 
  Settings, 
  ChevronLeft, 
  Menu,
  HeartPulse,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/shared/utils';
import { useAuthStore } from '@/store/useAuthStore';
import type { UserRole } from '@/shared/types/auth';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  collapsed: boolean;
  roles?: UserRole[];
}

const sidebarItems: SidebarItemProps[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Pacientes', href: '/patients' },
  { icon: Home, label: 'Casa de Recuperación', href: '/recovery-house' },
  { icon: Sparkles, label: 'Medicina Estética', href: '/aesthetic-clinic' },
  { icon: Scissors, label: 'Cirugías', href: '/surgeries' },
  { icon: Package, label: 'Inventario', href: '/inventory' },
  { icon: CreditCard, label: 'Pagos', href: '/payments' },
  { icon: Settings, label: 'Ajustes', href: '/settings', roles: ['ADMIN'] },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="p-4 bg-primary text-primary-foreground rounded-full shadow-2xl">
          <Menu size={24} />
        </button>
      </div>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className={cn(
          "h-screen sticky top-0 bg-background border-r border-border flex flex-col transition-all duration-300 hidden lg:flex",
          "shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
        )}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <HeartPulse className="text-primary-foreground" size={24} />
                </div>
                <span className="font-bold text-xl tracking-tight">MediPlus</span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mx-auto">
              <HeartPulse className="text-primary-foreground" size={24} />
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground absolute -right-3 top-20 bg-background border border-border shadow-sm"
          >
            <ChevronLeft size={16} className={cn("transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-none">
          {filteredItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={22} className={cn("shrink-0", !collapsed && "mr-1")} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
              {collapsed && (
                <div className="absolute left-16 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer / User Info */}
        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-muted/50",
            collapsed && "justify-center"
          )}>
            <img 
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} 
              alt="Avatar" 
              className="w-10 h-10 rounded-lg bg-background border border-border"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate">{user?.name}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{user?.role}</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
