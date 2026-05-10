import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  User as UserIcon,
  Settings as SettingsIcon,
  ChevronDown
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Buscar pacientes, registros, reportes..." 
            className="pl-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20 h-11 w-full max-w-md rounded-xl transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </Button>
        </div>

        <div className="h-8 w-[1px] bg-border mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-muted transition-colors focus:outline-none">
              <img 
                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} 
                alt="Avatar" 
                className="w-10 h-10 rounded-lg border border-border"
              />
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold leading-none">{user?.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                  {user?.role}
                </span>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mt-2">
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="rounded-xl cursor-pointer py-3">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl cursor-pointer py-3">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem 
              className="rounded-xl cursor-pointer py-3 text-red-500 focus:text-red-500 focus:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
