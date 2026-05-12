import { useState } from 'react';
import {
  Settings,
  Users,
  ShieldCheck,
  Key,
  UserPlus,
  Mail,
  Lock,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Edit3,
  Search,
  BadgeCheck,
  Building2,
  Database,
  Bell,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'Administrador' | 'Doctor' | 'Enfermería' | 'Ventas' | 'Recepción';
  status: 'Activo' | 'Inactivo';
}

const initialUsers: User[] = [
  { id: '1', username: 'admin', fullName: 'Administrador Principal', email: 'admin@clinic.com', role: 'Administrador', status: 'Activo' },
  { id: '2', username: 'dsantos', fullName: 'Dr. Diego Santos', email: 'dsantos@clinic.com', role: 'Doctor', status: 'Activo' },
  { id: '3', username: 'mrestrepo', fullName: 'Marta Restrepo', email: 'mrestrepo@clinic.com', role: 'Enfermería', status: 'Activo' },
  { id: '4', username: 'lperez', fullName: 'Laura Perez', email: 'lperez@clinic.com', role: 'Recepción', status: 'Inactivo' },
];

export const SettingsPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Ajustes del Sistema"
        subtitle="Configuración Global y Gestión de Seguridad"
        icon={Settings}
        actions={
          <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
            <ShieldCheck size={16} /> Auditoría de Logs
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar (Desktop) */}
        <div className="lg:col-span-3 space-y-3 bg-white p-6 rounded-[2.5rem] border border-border shadow-sm">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-4 mb-6">Módulos de Sistema</p>
          {[
            { id: 'users', label: 'Gestión de Usuarios', icon: Users, active: true },
            { id: 'clinic', label: 'Perfil de Clínica', icon: Building2 },
            { id: 'security', label: 'Seguridad y Privacidad', icon: Lock },
            { id: 'notifications', label: 'Centro de Alertas', icon: Bell },
            { id: 'backup', label: 'Mantenimiento DB', icon: Database },
          ].map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all group",
                item.active
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={cn(item.active ? "text-primary" : "text-muted-foreground/50")} />
                {item.label}
              </div>
              {!item.active && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          <div className="bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden">
            <div className="p-10 border-b border-border bg-secondary/20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-4 leading-none">
                  <BadgeCheck size={24} className="text-primary" />
                  Control de Accesos
                </h2>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-2">Personal Administrativo y Clínico Autorizado</p>
              </div>
              <Button
                onClick={() => setIsAddUserModalOpen(true)}
                className="h-11 px-8 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
              >
                <UserPlus size={16} className="mr-3" /> Nuevo Usuario
              </Button>
            </div>

            <div className="p-6 bg-secondary/10 border-b border-border flex justify-end">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                <input
                  type="text"
                  placeholder="Filtrar por nombre, cargo o email..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary/10">
                    <th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Identidad Usuario</th>
                    <th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Rol Asignado</th>
                    <th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Estado de Red</th>
                    <th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.map((user) => (
                    <tr key={user.id} className="group hover:bg-secondary/10 transition-colors">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="h-12 w-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all border border-border shadow-inner font-black">
                            {user.fullName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground uppercase tracking-tight">{user.fullName}</p>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                              <Mail size={12} className="text-primary/40" /> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <Badge variant="outline" className="rounded-lg border-border bg-secondary/50 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 text-foreground">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-10 py-8">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={cn(
                            "flex items-center gap-3 transition-all p-1 px-3 rounded-full border border-transparent",
                            user.status === 'Activo' ? "text-success bg-success/5 border-success/10" : "text-muted-foreground bg-secondary border-border"
                          )}
                        >
                          {user.status === 'Activo' ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                          <span className="text-[10px] font-black uppercase tracking-widest">{user.status}</span>
                        </button>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                           <Button
                            variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-warning hover:bg-warning/10 border border-transparent hover:border-warning/20"
                          >
                            <Key size={18} />
                          </Button>
                           <Button
                            variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-secondary border border-transparent hover:border-primary/20"
                          >
                            <Edit3 size={18} />
                          </Button>
                          <Button
                            onClick={() => deleteUser(user.id)}
                            variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="p-10 bg-secondary/30 border-b border-border flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Registro Maestro</h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Alta de nuevo operador clínico</p>
            </div>
          </div>
          <div className="p-10 flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Nombre y Apellido</label>
              <input type="text" placeholder="EJ: DIEGO SANTOS" className="w-full px-6 py-4 rounded-2xl border border-border bg-secondary/50 text-xs font-black uppercase outline-none focus:border-primary/30 transition-all shadow-inner placeholder:opacity-30" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Alias / Login</label>
                <input type="text" placeholder="DSANTOS" className="w-full px-6 py-4 rounded-2xl border border-border bg-secondary/50 text-xs font-black uppercase outline-none focus:border-primary/30 transition-all shadow-inner placeholder:opacity-30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Nivel Acceso</label>
                <select className="w-full px-6 py-4 rounded-2xl border border-border bg-secondary/50 text-xs font-black uppercase outline-none focus:border-primary/30 transition-all shadow-inner appearance-none cursor-pointer">
                  <option>DOCTOR</option>
                  <option>ENFERMERÍA</option>
                  <option>RECEPCIÓN</option>
                  <option>VENTAS</option>
                  <option>ADMINISTRADOR</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-1">Token de Seguridad</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                <input type="password" placeholder="••••••••" className="w-full pl-14 pr-6 py-4 rounded-2xl border border-border bg-secondary/50 text-xs font-black outline-none focus:border-primary/30 transition-all shadow-inner placeholder:opacity-30" />
              </div>
            </div>
          </div>
          <div className="p-10 pt-0 flex gap-4">
            <Button variant="ghost" onClick={() => setIsAddUserModalOpen(false)} className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-secondary transition-all">Cancelar</Button>
            <Button onClick={() => setIsAddUserModalOpen(false)} className="flex-[2] h-14 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">Autorizar Usuario</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="py-10 text-center opacity-20">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">GROUP V&V • SYSTEM CORE CONFIGURATION</p>
      </div>
    </div>
  );
};
