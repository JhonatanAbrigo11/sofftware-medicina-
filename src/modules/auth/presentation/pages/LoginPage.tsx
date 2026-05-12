import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const { setAuth, setLoading, isLoading } = useAuthStore();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async () => {
    setLoading(true);
    
    // Simulate a brief check
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Bypass validation and set "Doctor JAIMS" as the user
    setAuth(
      { id: 'admin-1', name: 'Doctor JAIMS', email: 'jaims@groupvv.com', role: 'ADMIN' }, 
      'fake-jwt-token'
    );
    
    setLoading(false);
    setShowWelcome(true);

    // Redirect after showing the toast
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background font-sans overflow-hidden">
      {/* Welcome Toast Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 border-4 border-primary/20"
            >
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center text-success animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-heading font-black text-foreground tracking-tighter">¡Bienvenido de nuevo!</h2>
                <p className="text-xl font-bold text-primary mt-2">Doctor JAIMS</p>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Panel: Brand Display */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary/40 items-center justify-center relative p-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[80px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="bg-white p-12 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-border/50 flex flex-col items-center">
            <div className="w-full aspect-[4/3] bg-secondary/20 rounded-[2rem] flex items-center justify-center overflow-hidden mb-10 border border-border/30 shadow-inner">
              <img 
                src="/Images/Logo.jpeg" 
                alt="Group V&V Logo" 
                className="w-4/5 h-4/5 object-contain mix-blend-multiply"
              />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-black text-foreground tracking-tighter uppercase">Group V&V</h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Medical Care Excellence</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-20 relative bg-white lg:rounded-l-[4rem] shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.02)] z-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm space-y-12"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Acceso Rápido</span>
            </div>
            <h1 className="text-4xl font-heading font-black text-foreground tracking-tighter">Inicia Sesión</h1>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Acceso directo para el personal clínico.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] ml-1">Usuario / Email</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="text"
                    placeholder="admin@groupvv.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-secondary/30 text-[13px] font-bold outline-none focus:bg-white focus:border-primary/30 focus:shadow-xl focus:shadow-primary/5 transition-all"
                    {...register('email')}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">Contraseña</Label>
                  <a href="#" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline transition-all">¿Ayuda?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border bg-secondary/30 text-[13px] font-bold outline-none focus:bg-white focus:border-primary/30 focus:shadow-xl focus:shadow-primary/5 transition-all"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Cargando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="pt-10 border-t border-border flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-muted-foreground/30">
              <ShieldCheck size={20} />
              <div className="h-4 w-px bg-border" />
              <p className="text-[9px] font-black uppercase tracking-[0.3em]">Acceso Desarrollador Activo</p>
            </div>
            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
              Group V&V &copy; 2026
            </p>
          </div>
        </motion.div>
      </div>

      <div className="lg:hidden absolute top-8 left-8 z-30 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg border border-border overflow-hidden">
          <img src="/Images/Logo.jpeg" alt="Logo" className="w-4/5 h-4/5 object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-[10px] tracking-tighter leading-none text-primary uppercase">Group V&V</span>
          <span className="font-medium text-[7px] tracking-widest uppercase text-muted-foreground mt-0.5">Medical Care</span>
        </div>
      </div>
    </div>
  );
};
