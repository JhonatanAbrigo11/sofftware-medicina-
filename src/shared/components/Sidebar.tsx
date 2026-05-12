import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  Menu,
  LogOut,
  Calendar,
  ShoppingCart,
  Wallet,
  X,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/shared/utils';
import { useAuthStore } from '@/store/useAuthStore';
import type { UserRole } from '@/shared/types/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles?: UserRole[];
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Administración',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Users, label: 'Pacientes', href: '/patients' },
      { icon: Calendar, label: 'Citas', href: '/appointments' },
      { icon: Package, label: 'Inventario', href: '/inventory' },
      { icon: CreditCard, label: 'Pagos', href: '/payments' },
      { icon: ShoppingCart, label: 'Compras', href: '/purchases' },
      { icon: Wallet, label: 'Gastos', href: '/expenses' },
    ]
  },
  {
    label: 'Doctor House',
    items: [
      { icon: Home, label: 'Casa de Recuperación', href: '/recovery-house' },
    ]
  },
  {
    label: 'Dream Skin',
    items: [
      { icon: Sparkles, label: 'Medicina Estética', href: '/aesthetic-clinic' },
    ]
  },
  {
    label: 'Cirugías',
    items: [
      { icon: Scissors, label: 'Cirugías', href: '/surgeries' },
    ]
  },
  {
    label: 'Configuración',
    items: [
      { icon: Settings, label: 'Ajustes', href: '/settings', roles: ['ADMIN'] },
    ]
  }
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const filteredGroups = sidebarGroups.map(group => ({
    ...group,
    items: group.items.filter(item => !item.roles || (user && item.roles.includes(user.role)))
  })).filter(group => group.items.length > 0);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    navigate('/login');
  };

  const NavContent = ({ isMobile = false }) => (
    <>
      <div className={cn(
        "flex items-center gap-3 transition-all duration-300",
        isMobile ? "p-6" : (collapsed ? "p-4 justify-center" : "p-6")
      )}>
        <div className={cn(
          "bg-white rounded-xl flex items-center justify-center shadow-lg border border-primary/5 overflow-hidden shrink-0 transition-all",
          (collapsed && !isMobile) ? "w-10 h-10" : "w-12 h-12"
        )}>
          <img src="/Images/Logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className={cn(
          "flex flex-col transition-all duration-300 overflow-hidden",
          (!isMobile && collapsed) ? "w-0 opacity-0" : "w-auto opacity-100"
        )}>
          <span className="font-black text-[11px] tracking-tighter leading-none text-primary whitespace-nowrap">GROUP V&V</span>
          <span className="font-medium text-[9px] tracking-widest uppercase text-muted-foreground mt-1 whitespace-nowrap">MEDICAL CARE</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto custom-scrollbar">
        {filteredGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h5 className={cn(
              "px-4 text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2 transition-opacity overflow-hidden whitespace-nowrap",
              (!isMobile && collapsed) ? "opacity-0 h-0 mb-0" : "opacity-100"
            )}>
              {group.label}
            </h5>
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  (!isMobile && collapsed) && "justify-center px-0"
                )}
              >
                <item.icon size={18} className={cn(
                  "shrink-0 transition-transform duration-200 group-hover:scale-110",
                  (!isMobile && collapsed) && "mx-auto"
                )} />
                <span className={cn(
                  "font-bold text-[11px] tracking-tight transition-all duration-300 overflow-hidden whitespace-nowrap",
                  (!isMobile && collapsed) ? "w-0 opacity-0" : "w-auto opacity-100"
                )}>
                  {item.label}
                </span>
                {(!isMobile && collapsed) && (
                  <div className="absolute left-16 bg-primary text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className={cn("p-3 border-t border-border mt-auto transition-all", (!isMobile && collapsed) ? "p-2" : "p-4")}>
        <div className={cn(
          "flex items-center bg-secondary/50 border border-border transition-all",
          (!isMobile && collapsed) ? "justify-center h-11 w-11 mx-auto rounded-xl" : "p-2 rounded-2xl w-full"
        )}>
          <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs border border-primary/10 shadow-inner uppercase">
            {user?.name?.substring(0, 2) || "AD"}
          </div>
          <div className={cn(
            "ml-3 flex flex-col min-w-0 transition-all duration-300 overflow-hidden",
            (!isMobile && collapsed) ? "w-0 opacity-0 ml-0" : "w-auto opacity-100"
          )}>
            <span className="text-[11px] font-black truncate text-foreground leading-tight tracking-tight whitespace-nowrap">{user?.name}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold whitespace-nowrap">{user?.role}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className={cn("ml-auto h-8 w-8 text-muted-foreground hover:text-destructive transition-all", (!isMobile && collapsed) && "hidden")}>
            <LogOut size={14} />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-4 bg-primary text-white rounded-full shadow-2xl active:scale-95 transition-transform"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-primary/20 backdrop-blur-sm z-[80]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-background border-r border-border flex flex-col z-[90] shadow-2xl"
            >
              <NavContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className={cn(
          "h-screen sticky top-0 bg-background border-r border-border flex flex-col hidden lg:flex overflow-hidden",
          "shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50"
        )}
      >
        <NavContent isMobile={false} />
      </motion.aside>
    </>
  );
};
