import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Clock, 
  User, 
  MoreVertical,
  Sparkles,
  List,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  CalendarDays as CalendarDaysIcon,
  MessageSquare,
  ExternalLink,
  Send
} from 'lucide-react';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface Appointment {
  id: string;
  patientName: string;
  type: string;
  date: string;
  time: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  mode: 'Presencial' | 'Telemedicina';
  doctor: string;
}

const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'María García',
    type: 'Consulta de Seguimiento',
    date: '2024-06-10',
    time: '09:00 AM',
    status: 'Confirmada',
    mode: 'Presencial',
    doctor: 'Dr. Smith'
  },
  {
    id: '2',
    patientName: 'Juan Pérez',
    type: 'Evaluación Pre-operatoria',
    date: '2024-06-10',
    time: '10:15 AM',
    status: 'Pendiente',
    mode: 'Telemedicina',
    doctor: 'Dr. V&V'
  },
  {
    id: '3',
    patientName: 'Ana Rodríguez',
    type: 'Rinoplastia - Control',
    date: '2024-06-10',
    time: '01:00 PM',
    status: 'Confirmada',
    mode: 'Presencial',
    doctor: 'Dr. Smith'
  }
];

const timeSlots = [
  '08:00 AM', '08:45 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', 
  '01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM', '04:45 PM'
];

const doctors = ['Dr. Smith', 'Dr. V&V', 'Dra. Dream'];

export const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 5, 10)); // June 10, 2024
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ time: string, doctor: string } | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedAptForContact, setSelectedAptForContact] = useState<Appointment | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  
  // Form State
  const [newApt, setNewApt] = useState({
    patientName: '',
    type: '',
    status: 'Pendiente' as const,
    mode: 'Presencial' as const
  });

  const formattedDate = new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(currentDate);

  const isoDate = currentDate.toISOString().split('T')[0];

  const navigateDate = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
  };

  const handleOpenModal = (time: string, doctor: string) => {
    setSelectedSlot({ time, doctor });
    setIsModalOpen(true);
  };

  const handleAddAppointment = () => {
    if (!selectedSlot || !newApt.patientName) return;

    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...newApt,
      date: isoDate,
      time: selectedSlot.time,
      doctor: selectedSlot.doctor,
    };

    setAppointments([...appointments, appointment]);
    setIsModalOpen(false);
    setNewApt({ patientName: '', type: '', status: 'Pendiente', mode: 'Presencial' });
  };

  const handleOpenContactModal = (apt: Appointment) => {
    setSelectedAptForContact(apt);
    const baseUrl = window.location.origin;
    const confirmUrl = `${baseUrl}/confirm-appointment/${apt.id}`;
    
    const message = `*HOLA ${apt.patientName.toUpperCase()}*\n\nTe saludamos de *GROUP V&V MEDICAL*\n\nConfirmamos tu cita para:\n\n*PROCEDIMIENTO:* ${apt.type}\n*ESPECIALISTA:* ${apt.doctor}\n*FECHA:* ${apt.date}\n*HORA:* ${apt.time}\n\n*UBICACIÓN:* Av. Interoceánica y Calle L\n\nPor favor, confirma tu asistencia dando clic en el siguiente enlace:\n${confirmUrl}`;
    
    setContactMessage(message);
    setIsContactModalOpen(true);
  };

  const handleSendWhatsApp = () => {
    if (!contactMessage) return;
    const phone = '593968982380'; // Specified by user
    const encodedMessage = encodeURIComponent(contactMessage);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    setIsContactModalOpen(false);
  };

  const filteredAppointments = appointments.filter(a => a.date === isoDate);

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader 
        title="Agenda Médica"
        subtitle="Control de Citas y Flujo de Consultorio"
        icon={CalendarIcon}
        actions={
          <>
            <div className="relative hidden xl:block w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
              <input 
                type="text" 
                placeholder="Buscar cita..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-[11px] font-bold outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="flex items-center bg-white rounded-xl border border-border p-1 shadow-sm">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigateDate(-1)}
                className="h-9 w-9 rounded-lg hover:bg-secondary transition-all"
              >
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Button>
              <div className="px-4 min-w-[140px] text-center">
                <span className="text-[10px] font-black text-foreground uppercase tracking-wider">{formattedDate}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigateDate(1)}
                className="h-9 w-9 rounded-lg hover:bg-secondary transition-all"
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>

            <Button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <Plus size={16} /> Programar
            </Button>
          </>
        }
      />

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="bg-secondary p-1 h-12 rounded-2xl border border-border mb-8 gap-1 w-full sm:w-auto overflow-x-auto scrollbar-none">
          <TabsTrigger value="list" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <List size={14} className="mr-2" /> Flujo de Pacientes
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <CalendarDaysIcon size={14} className="mr-2" /> Agenda por Doctor
          </TabsTrigger>
        </TabsList>

        {/* List View Content */}
        <TabsContent value="list" className="mt-0 outline-none">
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.map((apt, idx) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group p-6 rounded-[2.5rem] bg-white border border-border shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-8"
                  >
                    <div className="flex flex-col items-center justify-center h-16 w-16 shrink-0 rounded-2xl bg-secondary/30 border border-border shadow-inner">
                      <span className="text-xs font-black text-foreground">{apt.time.split(' ')[0]}</span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{apt.time.split(' ')[1]}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-black text-foreground tracking-tight truncate uppercase">{apt.patientName}</h4>
                        <Badge className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]",
                          apt.status === 'Confirmada' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'
                        )}>
                          {apt.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <User size={14} className="text-primary/40" />
                          Doctor: <span className="text-foreground">{apt.doctor}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Sparkles size={14} className="text-primary/40" />
                          {apt.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-border/50">
                      <select 
                        onChange={(e) => {
                          if (e.target.value === 'contact') {
                            handleOpenContactModal(apt);
                          }
                        }}
                        className="bg-secondary/30 border border-border rounded-xl px-5 py-2.5 text-[10px] font-black text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none min-w-[200px] uppercase tracking-widest"
                      >
                        <option value="scheduled">Cita Programada</option>
                        <option value="contact">Contactar</option>
                        <option value="waiting">En sala de espera</option>
                        <option value="consulting">En consultorio</option>
                        <option value="no-show">No asistió</option>
                      </select>
                      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-secondary">
                        <MoreVertical size={18} className="text-muted-foreground" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white border border-dashed border-border rounded-[3rem]">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-lg font-black text-foreground mb-2 uppercase tracking-tight">Sin citas agendadas</h3>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">No hay registros para este día en particular.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Calendar Content */}
        <TabsContent value="calendar" className="mt-0 outline-none">
          <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden">
            {/* Doctors Header */}
            <div className="grid grid-cols-[100px_repeat(3,1fr)] bg-secondary/20 border-b border-border">
              <div className="p-6 flex items-center justify-center border-r border-border">
                <Clock className="h-5 w-5 text-primary/60" />
              </div>
              {doctors.map((doc) => (
                <div key={doc} className="p-6 text-center border-r border-border last:border-0">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-white border border-border flex items-center justify-center text-primary text-sm font-black shadow-sm">
                      {doc.split(' ')[1].substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-foreground uppercase tracking-tight">{doc}</h4>
                      <Badge variant="outline" className="mt-1 border-primary/20 text-primary bg-white rounded-lg text-[9px] font-black uppercase tracking-widest">Disponible</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className="max-h-[700px] overflow-y-auto custom-scrollbar">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-[100px_repeat(3,1fr)] border-b border-border group transition-colors hover:bg-secondary/10">
                  <div className="p-4 border-r border-border flex flex-col items-center justify-center bg-secondary/5">
                    <span className="text-[11px] font-black text-muted-foreground uppercase tracking-tighter">{time}</span>
                  </div>
                  
                  {doctors.map((doc) => {
                    const apt = filteredAppointments.find(a => a.time === time && a.doctor === doc);
                    return (
                      <div key={doc} className="p-2 border-r border-border last:border-0 min-h-[110px] relative">
                        {apt ? (
                          <motion.div 
                            layoutId={apt.id}
                            whileHover={{ scale: 1.01 }}
                            className={cn(
                              "h-full w-full rounded-2xl p-4 flex flex-col justify-between border shadow-sm transition-all cursor-pointer",
                              apt.status === 'Confirmada' 
                                ? 'bg-white border-success/20 text-foreground' 
                                : 'bg-white border-warning/20 text-foreground'
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className={cn(
                                  "text-[8px] font-black uppercase tracking-[0.2em]",
                                  apt.status === 'Confirmada' ? 'text-success' : 'text-warning'
                                )}>{apt.status}</span>
                                <Badge className={cn(
                                  "px-2 py-0 rounded-lg text-[8px] font-black border-none",
                                  apt.mode === 'Telemedicina' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'
                                )}>{apt.mode}</Badge>
                              </div>
                              <div className="flex items-center justify-between group/apt">
                                <h5 className="text-[11px] font-black leading-tight uppercase tracking-tight">{apt.patientName}</h5>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 opacity-0 group-hover/apt:opacity-100 transition-opacity"
                                  onClick={(e) => { e.stopPropagation(); handleOpenContactModal(apt); }}
                                >
                                  <MessageSquare size={12} className="text-primary" />
                                </Button>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border/50">
                              <p className="text-[10px] font-bold text-muted-foreground truncate flex items-center gap-1.5 uppercase tracking-wide">
                                <Stethoscope size={12} className="text-primary/60" />
                                {apt.type}
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <button 
                            onClick={() => handleOpenModal(time, doc)}
                            className="h-full w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 hover:bg-primary/5 hover:border-primary/20 transition-all"
                          >
                            <Plus className="h-5 w-5 text-primary/40" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Appointment Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-border bg-secondary/30 flex items-center gap-6">
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-heading font-black text-foreground tracking-tight">Nueva Cita Médica</h2>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Programación de consulta</p>
              </div>
            </div>

            <div className="p-10 space-y-8">
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">Horario Asignado</p>
                    <p className="text-xs font-black text-foreground">{selectedSlot?.time} — {formattedDate}</p>
                  </div>
                </div>
                <Badge className="rounded-lg bg-white border border-border text-primary text-[9px] font-black uppercase px-3 py-1">
                  {selectedSlot?.doctor}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Paciente</Label>
                  <Input 
                    placeholder="Nombre completo..."
                    value={newApt.patientName}
                    onChange={(e) => setNewApt({...newApt, patientName: e.target.value})}
                    className="h-12 rounded-2xl border-border bg-secondary/30 focus:bg-white transition-all text-sm font-black"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Procedimiento</Label>
                  <Input 
                    placeholder="Ej: Rinoplastia ultrasónica..."
                    value={newApt.type}
                    onChange={(e) => setNewApt({...newApt, type: e.target.value})}
                    className="h-12 rounded-2xl border-border bg-secondary/30 focus:bg-white transition-all text-sm font-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Modalidad</Label>
                    <select 
                      className="w-full h-12 rounded-2xl border border-border bg-secondary/30 px-5 text-sm font-black outline-none focus:bg-white transition-all"
                      value={newApt.mode}
                      onChange={(e) => setNewApt({...newApt, mode: e.target.value as any})}
                    >
                      <option value="Presencial">Presencial</option>
                      <option value="Telemedicina">Telemedicina</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Estado Inicial</Label>
                    <select 
                      className="w-full h-12 rounded-2xl border border-border bg-secondary/30 px-5 text-sm font-black outline-none focus:bg-white transition-all"
                      value={newApt.status}
                      onChange={(e) => setNewApt({...newApt, status: e.target.value as any})}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Confirmada">Confirmada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-border bg-secondary/20 flex gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddAppointment}
                className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all"
              >
                Programar Cita
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-border bg-secondary/30 flex items-center gap-6">
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
                <MessageSquare size={20} />
              </div>
              <div>
                <h2 className="text-xl font-heading font-black text-foreground tracking-tight uppercase">Confirmación WhatsApp</h2>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Gestión de mensaje de confirmación</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left Column: Context */}
              <div className="md:w-1/3 p-10 bg-secondary/10 border-r border-border space-y-8">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6">Detalles de Cita</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><User size={18} /></div>
                    <div>
                      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Paciente</p>
                      <p className="text-sm font-black text-foreground uppercase">{selectedAptForContact?.patientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Stethoscope size={18} /></div>
                    <div>
                      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Procedimiento</p>
                      <p className="text-xs font-black text-foreground uppercase truncate max-w-[150px]">{selectedAptForContact?.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Clock size={18} /></div>
                    <div>
                      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Horario</p>
                      <p className="text-xs font-black text-foreground uppercase">{selectedAptForContact?.time} — {selectedAptForContact?.date}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                  <div className="p-5 rounded-2xl bg-white border border-border/50 flex items-center gap-4">
                    <ExternalLink size={18} className="text-primary shrink-0" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-tight tracking-tight">
                      El link de confirmación se generará automáticamente al final del mensaje.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Editor */}
              <div className="md:w-2/3 p-10 space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Editar Mensaje Personalizado</Label>
                  <Textarea 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="min-h-[250px] rounded-[2rem] border-border bg-secondary/20 focus:bg-white transition-all text-sm font-bold leading-relaxed resize-none p-8"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-border bg-secondary/20 flex justify-end gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setIsContactModalOpen(false)}
                className="px-10 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSendWhatsApp}
                className="px-12 h-14 rounded-xl bg-[#25D366] text-white shadow-2xl shadow-green-500/20 font-black text-[10px] uppercase tracking-widest hover:bg-[#20ba59] transition-all flex items-center justify-center gap-3"
              >
                <Send size={16} /> Enviar WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="py-10 text-center opacity-20">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">GROUP V&V • MEDICAL CARE SOLUTIONS</p>
      </div>
    </div>
  );
};
