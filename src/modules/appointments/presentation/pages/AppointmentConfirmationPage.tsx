import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  XCircle, 
  Stethoscope,
  Building2,
  Phone,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { useParams } from 'react-router-dom';

export const AppointmentConfirmationPage = () => {
  useParams();
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'rejected'>('pending');

  // Mock data for the landing page based on URL ID
  const appointmentInfo = {
    patient: 'MARÍA GARCÍA',
    doctor: 'DR. SMITH',
    type: 'CONSULTA DE SEGUIMIENTO',
    date: 'LUNES, 10 DE JUNIO, 2024',
    time: '09:00 AM',
    location: 'CONSULTORIO 402 - EDIFICIO MÉDICO V&V',
    address: 'AV. INTEROCEÁNICA Y CALLE L, QUITO',
  };

  const handleResponse = (newStatus: 'confirmed' | 'rejected') => {
    setStatus(newStatus);
    // In a real app, this would call an API
  };

  if (status === 'confirmed') {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-white"
        >
          <div className="h-24 w-24 rounded-full bg-success/10 flex items-center justify-center text-success mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight mb-4">¡Cita Confirmada!</h1>
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed px-6">
            Gracias por confirmar tu asistencia. Te esperamos el {appointmentInfo.date} a las {appointmentInfo.time}.
          </p>
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">GROUP V&V • MEDICAL CARE</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-white"
        >
          <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-8">
            <XCircle size={48} />
          </div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight mb-4">Cita Cancelada</h1>
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed px-6">
            Lamentamos que no puedas asistir. Nos pondremos en contacto contigo pronto para reprogramar.
          </p>
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">GROUP V&V • MEDICAL CARE</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full">
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-white rounded-xl shadow-lg border border-white flex items-center justify-center overflow-hidden shrink-0">
              <img src="/Images/Logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">GROUP V&V MEDICAL</h2>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Confirmación de Cita</p>
            </div>
          </div>
          <Badge className="hidden sm:flex bg-primary/10 text-primary border-none text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
            Portal del Paciente
          </Badge>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Left Column: Details */}
          <div className="lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-secondary/30">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-foreground uppercase tracking-tight mb-2">Hola, {appointmentInfo.patient}</h1>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] leading-relaxed">
                Por favor, revisa los detalles de tu cita y confirma tu asistencia.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary/20 border border-border/30">
                <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
                  <User size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">Especialista</p>
                  <p className="text-sm font-black text-foreground uppercase truncate">{appointmentInfo.doctor}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary/20 border border-border/30">
                <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Stethoscope size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">Motivo</p>
                  <p className="text-sm font-black text-foreground uppercase truncate">{appointmentInfo.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary/20 border border-border/30">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">Fecha</p>
                    <p className="text-xs font-black text-foreground uppercase leading-tight">{appointmentInfo.date.split(',')[1]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-secondary/20 border border-border/30">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">Hora</p>
                    <p className="text-sm font-black text-foreground uppercase">{appointmentInfo.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 rounded-2xl bg-secondary/20 border border-border/30">
                <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-sm shrink-0 mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-0.5">Ubicación</p>
                  <p className="text-sm font-black text-foreground uppercase">{appointmentInfo.location}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 tracking-tight">{appointmentInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map & Actions */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Map Placeholder/Iframe */}
            <div className="flex-1 min-h-[250px] lg:min-h-0 relative bg-secondary/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.034336021273!2d-78.4728562!3d-0.1833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7061908869%3A0xc33e620573ec60f8!2sQuito!5e0!3m2!1ses!2sec!4v1715467200000!5m2!1ses!2sec"
                className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1] opacity-80 hover:opacity-100 transition-opacity"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-white/90 backdrop-blur shadow-sm text-primary text-[8px] font-black border-none uppercase px-3 py-1">Ver en Maps</Badge>
              </div>
            </div>

            {/* Sticky/Bottom Actions */}
            <div className="p-8 md:p-10 bg-secondary/10 border-t border-secondary/30 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => handleResponse('confirmed')}
                className="flex-[2] h-14 rounded-2xl bg-primary text-primary-foreground font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/10 hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
              >
                <CheckCircle2 size={18} /> Confirmar Cita
              </Button>
              <Button 
                onClick={() => handleResponse('rejected')}
                variant="ghost"
                className="flex-1 h-14 rounded-2xl text-muted-foreground font-black text-[10px] uppercase tracking-[0.15em] hover:bg-destructive/5 hover:text-destructive transition-all border border-transparent hover:border-destructive/10"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 opacity-40">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">© 2026 MediPlus Pro • Group V&V</p>
          <div className="flex gap-6">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2"><Phone size={12} /> Soporte</span>
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2"><Building2 size={12} /> Términos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

