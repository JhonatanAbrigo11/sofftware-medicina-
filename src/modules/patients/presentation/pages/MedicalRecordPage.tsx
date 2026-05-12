import React from 'react';
import { cn } from '@/shared/utils';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/shared/components/ui/dialog';
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  History as HistoryIcon,
  Search as SearchIcon,
} from 'lucide-react';
import {
  User,
  FileText,
  Stethoscope,
  Calendar,
  ArrowLeft,
  DollarSign,
  Receipt,
  Plus,
  Download,
  Upload,
  Eye,
  Activity,
  AlertCircle,
  Clock,
  FileImage,
  Home,
  Bed,
  Utensils,
  Car,
  Shirt,
  Pill,
  HeartPulse,
  UserCircle,
  PlusCircle,
  CreditCard,
  Files,
  Save,
  MoreVertical,
  ChevronRight,
  FileText as FileIcon
} from 'lucide-react';
import { PageHeader } from '@/shared/components/PageHeader';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { usePatientStore } from '@/store/usePatientStore';
import { motion } from 'framer-motion';
import { PatientPersonalForm } from '../components/PatientPersonalForm';
import { ClinicalTimeline } from '../components/ClinicalTimeline';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';

export const MedicalRecordPage = () => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isEvolutionModalOpen, setIsEvolutionModalOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<{ name: string; fileUrl: string; category: string; date: string } | null>(null);
  const [selectedStayId, setSelectedStayId] = React.useState(2);

  const mockEvolutions = [
    {
      id: 'E1',
      date: '2024-05-10',
      time: '14:30',
      doctor: 'Dr. Alejandro V.',
      note: 'Paciente refiere leve inflamación en zona intervenida. Se observa buena cicatrización. Se indica continuar con medicación y compresas frías.',
      status: 'Normal'
    },
    {
      id: 'E2',
      date: '2024-05-05',
      time: '09:00',
      doctor: 'Dra. Elena M.',
      note: 'Retiro de vendajes. Se observa reducción significativa del edema. Paciente manifiesta estar satisfecho con los resultados iniciales.',
      status: 'Excelente'
    },
    {
      id: 'E3',
      date: '2024-04-20',
      time: '11:15',
      doctor: 'Dr. Alejandro V.',
      note: 'Evaluación pre-operatoria final. Todos los laboratorios dentro de rangos normales. Paciente apto para procedimiento quirúrgico programado.',
      status: 'Normal'
    }
  ];

  const handlePreview = (doc: { name: string; fileUrl: string; category: string; date: string }) => {
    setSelectedDoc(doc);
    setIsPreviewOpen(true);
  };
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find((p) => p.id === id);

  const getClinicalHistory = usePatientStore((state) => state.getClinicalHistory);
  const getPrescriptions = usePatientStore((state) => state.getPrescriptions);
  const getAestheticTreatments = usePatientStore((state) => state.getAestheticTreatments);

  const getAccountsReceivable = usePatientStore((state) => state.getAccountsReceivable);
  const getAppointments = usePatientStore((state) => state.getAppointments);
  const getDocuments = usePatientStore((state) => state.getDocuments);

  const clinicalRecords = id ? getClinicalHistory(id) : [];
  const prescriptions = id ? getPrescriptions(id) : [];
  const treatments = id ? getAestheticTreatments(id) : [];
  const accounts = id ? getAccountsReceivable(id) : [];
  const appointments = id ? getAppointments(id) : [];
  const allDocuments = id ? getDocuments(id) : [];

  if (!patient) return <div className="p-8 text-center">Paciente no encontrado (ID: {id})</div>;

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title={`${patient.firstName} ${patient.lastName}`}
        subtitle="Expediente Clínico Digital • Historia Unificada"
        icon={UserCircle}
        actions={
          <>
            <Button variant="outline" onClick={() => navigate('/patients')} className="h-11 px-6 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary">
              <ArrowLeft size={14} className="text-primary" /> Volver
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <PlusCircle size={16} /> Nueva Consulta
            </Button>
          </>
        }
      />

      {/* Patient Profile Summary Card */}
      <div className="relative overflow-hidden rounded-[3rem] bg-white p-8 md:p-12 shadow-sm border border-border">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary blur-3xl opacity-30" />

        <div className="relative flex flex-col md:flex-row gap-10 items-center">
          <div className="h-32 w-32 rounded-[2.5rem] bg-primary flex items-center justify-center text-primary-foreground text-4xl font-black shadow-2xl shadow-primary/20 shrink-0 border-4 border-white">
            {patient.firstName[0]}{patient.lastName[0]}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h2 className="text-3xl font-black text-foreground tracking-tight uppercase leading-none">
                {patient.firstName} {patient.lastName}
              </h2>
              <Badge className="bg-success/10 text-success border-success/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Paciente {patient.status}
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-3 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-border shadow-inner">
                <FileText size={16} className="text-primary" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tight">{patient.documentId}</span>
              </div>
              <div className="flex items-center gap-3 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-border shadow-inner">
                <User size={16} className="text-primary" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tight">{patient.gender} • {patient.age} AÑOS</span>
              </div>
              <div className="flex items-center gap-3 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-border shadow-inner">
                <Calendar size={16} className="text-primary" />
                <span className="text-[11px] font-black text-foreground uppercase tracking-tight">VENCE: {patient.lastVisit}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[220px]">
            <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-secondary">
              <Download size={16} className="text-primary" /> Exportar Ficha
            </Button>
            <Button className="w-full h-12 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Activity size={16} /> Evolución Rápida
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigator */}
      <Tabs defaultValue="personal" className="w-full">
        <div className="sticky top-4 z-30 p-1.5 bg-secondary/50 backdrop-blur-md rounded-[2.5rem] border border-border mb-12 overflow-x-auto shadow-sm">
          <TabsList className="flex w-full justify-start bg-transparent h-14 p-0 gap-1">
            {[
              { value: 'personal', icon: User, label: 'Datos' },
              { value: 'clinical', icon: Stethoscope, label: 'Clínica' },
              { value: 'evolutions', icon: Activity, label: 'Evolución' },
              { value: 'recovery', icon: Home, label: 'Post-Op' },
              { value: 'billing', icon: CreditCard, label: 'Finanzas' },
              { value: 'appointments', icon: Calendar, label: 'Agenda' },
              { value: 'documents', icon: Files, label: 'Expediente' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 items-center gap-3 px-6 h-full rounded-[1.5rem] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
              >
                <tab.icon size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>


        <div className="mt-6">
          <TabsContent value="personal">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-primary/5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <User className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Información Personal
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1">
                    Gestión integral de los datos básicos y contacto del paciente.
                  </p>
                </div>
                <Button
                  type="submit"
                  form="patient-personal-form"
                  className="gap-2 h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-500 bg-primary hover:scale-[1.02] active:scale-95"
                >
                  <Save className="h-5 w-5" />
                  Actualizar Registro
                </Button>
              </div>

              <div className="max-w-5xl mx-auto">
                <PatientPersonalForm patient={patient} />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="clinical">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <Tabs defaultValue="history" className="w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-14 border border-white shadow-inner flex gap-2">
                    {[
                      { value: 'history', label: 'Cronología' },
                      { value: 'treatments-sub', label: 'Tratamientos' },
                      { value: 'prescriptions', label: 'Recetas' }
                    ].map((subTab) => (
                      <TabsTrigger
                        key={subTab.value}
                        value={subTab.value}
                        className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xl font-black text-[11px] uppercase tracking-widest transition-all duration-500"
                      >
                        {subTab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <Button className="gap-2 h-12 px-6 rounded-xl shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                    <Stethoscope className="h-5 w-5" />
                    Registrar Atención
                  </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-8">
                    <TabsContent value="history" className="mt-0">
                      <ClinicalTimeline records={clinicalRecords} />
                    </TabsContent>

                    <TabsContent value="treatments-sub" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {treatments.map((t) => (
                          <motion.div
                            whileHover={{ y: -5 }}
                            key={t.id}
                            className="p-6 rounded-xl border border-white bg-white shadow-lg shadow-primary/5 flex items-center justify-between group transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                <Activity className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-foreground text-lg">{t.name}</p>
                                <p className="text-sm font-medium text-muted-foreground">{t.area} • {t.date}</p>
                              </div>
                            </div>
                            <Badge className={cn(
                              "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest",
                              t.status === 'Completado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                            )}>
                              {t.status}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="prescriptions" className="mt-0">
                      <div className="grid grid-cols-1 gap-6">
                        {prescriptions.map((p) => (
                          <motion.div
                            whileHover={{ x: 10 }}
                            key={p.id}
                            className="p-8 rounded-xl border border-white bg-white shadow-lg shadow-primary/5 flex flex-col gap-4"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <p className="text-xl font-black text-foreground">{p.medication}</p>
                                <p className="text-sm font-bold text-primary flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {p.dosage} • {p.frequency}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Duración</p>
                                <p className="text-sm font-bold text-foreground">{p.duration}</p>
                              </div>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/30 border border-white text-sm font-medium text-muted-foreground italic">
                              "{p.notes}"
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </div>

                  {/* Sidebar Panel to fill the empty space */}
                  <div className="xl:col-span-4 space-y-8">
                    <div className="p-8 rounded-xl border border-white bg-white shadow-xl shadow-primary/5">
                      <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Signos Vitales Recientes
                      </h4>
                      <div className="space-y-6">
                        {[
                          { label: 'Presión Arterial', value: '120/80', unit: 'mmHg', color: 'text-blue-600' },
                          { label: 'Frecuencia Cardiaca', value: '72', unit: 'bpm', color: 'text-emerald-600' },
                          { label: 'Temperatura', value: '36.5', unit: '°C', color: 'text-amber-600' },
                          { label: 'Saturación O2', value: '98', unit: '%', color: 'text-purple-600' }
                        ].map((stat) => (
                          <div key={stat.label} className="flex justify-between items-end pb-4 border-b border-primary/5 last:border-0 last:pb-0">
                            <div>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                              <p className={cn("text-2xl font-black", stat.color)}>{stat.value}</p>
                            </div>
                            <span className="text-xs font-bold text-muted-foreground mb-1">{stat.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 rounded-xl border border-destructive/10 bg-destructive/5 shadow-xl shadow-destructive/5">
                      <h4 className="text-sm font-black text-destructive uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Alertas y Alergias
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-destructive">
                          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                          Alergia a la Penicilina
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-amber-600">
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          Sensibilidad al látex
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-xl border border-white bg-primary text-white shadow-xl shadow-primary/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Próxima Cirugía</p>
                      <h4 className="text-xl font-black mb-4">Rinoplastia de Revisión</h4>
                      <div className="flex items-center gap-3 text-sm font-bold opacity-90">
                        <Calendar className="h-4 w-4" />
                        15 de Junio, 2024
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </motion.div>
          </TabsContent>

          <TabsContent value="evolutions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <MessageSquare className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Notas de Evolución
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1 italic">Seguimiento clínico detallado del progreso del paciente.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input 
                      type="text" 
                      placeholder="Buscar nota..."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-primary/5 bg-white/80 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-inner"
                    />
                  </div>
                  <Button 
                    onClick={() => setIsEvolutionModalOpen(true)}
                    className="gap-2 h-12 px-8 rounded-2xl shadow-xl shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    <Plus className="h-5 w-5" />
                    Nueva Evolución
                  </Button>
                </div>
              </div>

              <div className="space-y-8 max-w-4xl mx-auto">
                {mockEvolutions.map((evo, idx) => (
                  <motion.div
                    key={evo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12 before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-px before:bg-primary/10 last:before:bottom-auto last:before:h-8"
                  >
                    <div className="absolute left-0 top-0 h-10 w-10 rounded-2xl bg-white border border-primary/10 shadow-lg flex items-center justify-center z-10 group hover:bg-primary transition-colors duration-500">
                      <HistoryIcon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>

                    <div className="p-8 rounded-3xl bg-white border border-white shadow-xl shadow-primary/[0.02] hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-base font-black text-foreground">{evo.doctor}</span>
                            <Badge className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                              evo.status === 'Excelente' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                            )}>
                              {evo.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Calendar className="h-3 w-3" /> {evo.date}
                            <Clock className="h-3 w-3 ml-2" /> {evo.time}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5">
                          <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>

                      <div className="p-6 rounded-2xl bg-secondary/30 border border-white/50 text-slate-700 leading-relaxed font-medium">
                        {evo.note}
                      </div>

                      <div className="mt-6 flex items-center gap-4">
                        <Button variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 gap-2">
                          <FileImage className="h-4 w-4" /> Adjuntar Imagen
                        </Button>
                        <Button variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 gap-2">
                          <CheckCircle2 className="h-4 w-4" /> Firmar Nota
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="recovery">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Home className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Panel de Recuperación
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1 italic">Inteligencia financiera y seguimiento de estadía clínica.</p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-white border-transparent px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
                    Sincronizado en Tiempo Real
                  </Badge>
                </div>
              </div>

              {(() => {
                const recoveryStays = [
                  {
                    id: 2,
                    entry: '2024-06-10',
                    exit: 'Pendiente',
                    room: 'Suite 105 - VIP',
                    status: 'Activa',
                    duration: 'En curso',
                    total: 850.00,
                    paid: 509.50,
                    debt: 340.50,
                    expenses: [
                      { label: 'Alimentación', amount: 150.00, icon: Utensils, color: 'text-orange-600 bg-orange-50' },
                      { label: 'Transporte', amount: 80.00, icon: Car, color: 'text-blue-600 bg-blue-50' },
                      { label: 'Lavandería', amount: 45.00, icon: Shirt, color: 'text-purple-600 bg-purple-50' },
                      { label: 'Enfermería', amount: 250.00, icon: HeartPulse, color: 'text-emerald-600 bg-emerald-50' },
                      { label: 'Medicamentos', amount: 120.50, icon: Pill, color: 'text-amber-600 bg-amber-50' },
                      { label: 'Costo Habitación', amount: 204.50, icon: Bed, color: 'text-primary bg-primary/5' }
                    ]
                  },
                  {
                    id: 1,
                    entry: '2024-05-01',
                    exit: '2024-05-15',
                    room: 'Suite 302',
                    status: 'Completada',
                    duration: '14 días',
                    total: 1250.00,
                    paid: 1250.00,
                    debt: 0.00,
                    expenses: [
                      { label: 'Alimentación', amount: 300.00, icon: Utensils, color: 'text-orange-600 bg-orange-50' },
                      { label: 'Transporte', amount: 120.00, icon: Car, color: 'text-blue-600 bg-blue-50' },
                      { label: 'Lavandería', amount: 90.00, icon: Shirt, color: 'text-purple-600 bg-purple-50' },
                      { label: 'Enfermería', amount: 450.00, icon: HeartPulse, color: 'text-emerald-600 bg-emerald-50' },
                      { label: 'Medicamentos', amount: 80.00, icon: Pill, color: 'text-amber-600 bg-amber-50' },
                      { label: 'Costo Habitación', amount: 210.00, icon: Bed, color: 'text-primary bg-primary/5' }
                    ]
                  }
                ];

                const selectedStay = recoveryStays.find(s => s.id === selectedStayId) || recoveryStays[0];

                return (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Left Sidebar: Timeline & History */}
                    <div className="xl:col-span-4 space-y-6">
                      <div className="flex items-center justify-between px-2">
                        <h4 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Historial de Estadía</h4>
                        <span className="h-1 flex-1 mx-4 bg-primary/5 rounded-full" />
                      </div>
                      
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {recoveryStays.map((stay) => (
                          <button
                            key={stay.id}
                            onClick={() => setSelectedStayId(stay.id)}
                            className={cn(
                              "w-full p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden group text-left",
                              selectedStayId === stay.id
                                ? "bg-white border-primary shadow-2xl shadow-primary/10 ring-1 ring-primary/20 scale-[1.02]"
                                : "bg-white/40 border-white hover:bg-white hover:border-primary/20 shadow-lg shadow-black/[0.02]"
                            )}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
                                selectedStayId === stay.id
                                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                                  : "bg-primary/5 text-primary border-primary/10"
                              )}>
                                <Bed className="h-6 w-6" />
                              </div>
                              <Badge className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em]",
                                stay.status === 'Completada' ? 'bg-slate-100 text-slate-500' : 'bg-primary/10 text-primary'
                              )}>
                                {stay.status}
                              </Badge>
                            </div>

                            <div className="space-y-1">
                              <p className={cn(
                                "text-lg font-black transition-colors tracking-tight",
                                selectedStayId === stay.id ? "text-primary" : "text-foreground"
                              )}>{stay.room}</p>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <Calendar className="h-3 w-3" />
                                {stay.entry} — {stay.exit}
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-primary/5 flex items-center justify-between">
                              <p className="text-sm font-black text-primary">${stay.total.toFixed(2)}</p>
                              {stay.debt > 0 ? (
                                <Badge variant="outline" className="text-[9px] font-black border-destructive text-destructive bg-destructive/5 rounded-lg px-2">PENDIENTE: ${stay.debt.toFixed(2)}</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[9px] font-black border-emerald-500 text-emerald-600 bg-emerald-50 rounded-lg px-2 italic">SALDADO</Badge>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Minimalist Financial Intelligence */}
                    <div className="xl:col-span-8 space-y-8">
                      {/* Strategic Headline KPIs - Minimalist */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Budget Card */}
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm group transition-all duration-300"
                        >
                          <div className="flex flex-col h-full justify-between gap-6">
                            <div className="flex items-center justify-between">
                              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                <DollarSign className="h-6 w-6" strokeWidth={2.5} />
                              </div>
                              <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-[0.2em]">Presupuesto</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Costo de Operación</p>
                              <p className="text-3xl font-black text-slate-800 tracking-tighter">${selectedStay.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Paid Card */}
                        <motion.div
                          whileHover={{ y: -2 }}
                          className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm group transition-all duration-300"
                        >
                          <div className="flex flex-col h-full justify-between gap-6">
                            <div className="flex items-center justify-between">
                              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <Activity className="h-6 w-6" strokeWidth={2.5} />
                              </div>
                              <span className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em]">Recaudado</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Abonado</p>
                              <div className="flex items-end gap-2">
                                <p className="text-3xl font-black text-slate-800 tracking-tighter">${selectedStay.paid.toFixed(2)}</p>
                                <span className="text-[10px] font-black mb-1.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">{Math.round((selectedStay.paid / selectedStay.total) * 100)}%</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Balance Card */}
                        <motion.div
                          whileHover={{ y: -2 }}
                          className={cn(
                            "p-8 rounded-[2rem] bg-white border shadow-sm group transition-all duration-300",
                            selectedStay.debt > 0 ? "border-rose-100" : "border-slate-100"
                          )}
                        >
                          <div className="flex flex-col h-full justify-between gap-6">
                            <div className="flex items-center justify-between">
                              <div className={cn(
                                "h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
                                selectedStay.debt > 0 
                                  ? "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white" 
                                  : "bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-slate-500 group-hover:text-white"
                              )}>
                                <AlertCircle className="h-6 w-6" strokeWidth={2.5} />
                              </div>
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em]",
                                selectedStay.debt > 0 ? "text-rose-900/40" : "text-slate-400"
                              )}>Balance</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Saldo Pendiente</p>
                              <p className={cn(
                                "text-3xl font-black tracking-tighter",
                                selectedStay.debt > 0 ? "text-rose-600" : "text-slate-400"
                              )}>${selectedStay.debt.toFixed(2)}</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Detailed Breakdown Card - Minimalist */}
                      <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                          <div>
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Desglose Técnico de Cargos</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Auditado: {new Date().toLocaleDateString()}</p>
                          </div>
                          <Badge variant="outline" className="rounded-lg font-bold text-[9px] px-3 py-1 border-slate-200 text-slate-500 uppercase tracking-widest">
                            ESTADÍA: {selectedStay.room}
                          </Badge>
                        </div>

                        {/* Professional Metric Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                          {selectedStay.expenses.map((expense) => (
                            <div key={expense.label} className="group relative flex flex-col gap-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                    expense.color.replace('bg-', 'bg-opacity-50 bg-')
                                  )}>
                                    <expense.icon className="h-5 w-5" />
                                  </div>
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{expense.label}</p>
                                </div>
                                <p className="text-lg font-black text-slate-700 tracking-tight">${expense.amount.toFixed(2)}</p>
                              </div>
                              <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(expense.amount / selectedStay.total) * 100}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className={cn("h-full rounded-full opacity-60", expense.color.split(' ')[0].replace('text-', 'bg-'))}
                                />
                              </div>
                              <span className="text-[9px] font-bold text-slate-300 absolute -bottom-4 right-0">{Math.round((expense.amount / selectedStay.total) * 100)}%</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
                          <Button className="flex-[2] h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 font-bold text-[11px] uppercase tracking-widest">
                            <Download className="h-4 w-4 mr-3" />
                            Descargar Estado de Cuenta
                          </Button>
                          <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-bold text-[11px] uppercase tracking-widest transition-all duration-300">
                            <Receipt className="h-4 w-4 mr-3" />
                            Nuevo Pago
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </TabsContent>

          <TabsContent value="billing">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Receipt className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Estado de Cuenta
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1">
                    Gestión financiera y seguimiento de cobros.
                  </p>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-8 py-4 flex flex-col items-center">
                  <p className="text-[10px] text-destructive font-black uppercase tracking-[0.2em] mb-1">Total Pendiente</p>
                  <p className="text-3xl font-black text-destructive">
                    ${accounts.reduce((acc: number, curr: any) => acc + curr.pendingAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-white bg-white/40 shadow-xl shadow-black/5">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-secondary/50 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-6">Fecha</th>
                      <th className="px-8 py-6">Concepto</th>
                      <th className="px-8 py-6">Total</th>
                      <th className="px-8 py-6">Pagado</th>
                      <th className="px-8 py-6">Pendiente</th>
                      <th className="px-8 py-6 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {accounts.map((acc: any) => (
                      <tr key={acc.id} className="group hover:bg-white transition-all duration-300">
                        <td className="px-8 py-6 text-sm font-bold text-muted-foreground">{acc.date}</td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <p className="text-base font-black text-foreground">{acc.concept}</p>
                            <Badge className={cn(
                              "w-fit px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                              acc.status === 'Pendiente' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-600'
                            )}>
                              {acc.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-base font-black text-foreground">${acc.totalAmount.toLocaleString()}</td>
                        <td className="px-8 py-6 text-base font-bold text-emerald-600">${acc.paidAmount.toLocaleString()}</td>
                        <td className="px-8 py-6 text-lg font-black text-destructive">${acc.pendingAmount.toLocaleString()}</td>
                        <td className="px-8 py-6 text-right">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-2xl h-11 px-6 shadow-lg shadow-emerald-500/20 hover:scale-[1.05] transition-all">
                            <DollarSign className="h-4 w-4" />
                            Pagar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="documents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Files className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Gestión Documental
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1">
                    Archivo digitalizado de consentimientos y registros.
                  </p>
                </div>
                <Button className="gap-2 h-12 px-8 rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:scale-[1.02] transition-all duration-300">
                  <Upload className="h-5 w-5" />
                  Subir Archivo
                </Button>
              </div>

              <Tabs defaultValue="consent" className="w-full">
                <TabsList className="bg-secondary/50 p-1.5 rounded-xl h-14 border border-white/50 mb-10">
                  <TabsTrigger value="consent" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg font-bold">
                    Consentimientos
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg font-bold">
                    Exámenes
                  </TabsTrigger>
                  <TabsTrigger value="images" className="rounded-xl px-8 h-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg font-bold">
                    Galería
                  </TabsTrigger>
                </TabsList>

                {['Consentimiento', 'Examen', 'Imagen'].map((cat) => (
                  <TabsContent key={cat} value={cat === 'Consentimiento' ? 'consent' : cat === 'Examen' ? 'exams' : 'images'}>
                    <div className={cn(
                      "grid gap-6",
                      cat === 'Imagen' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                    )}>
                      {allDocuments.filter((d: any) => d.category === cat).length > 0 ? (
                        allDocuments.filter((d: any) => d.category === cat).map((doc: any) => (
                          <motion.div
                            whileHover={{ y: -8 }}
                            key={doc.id}
                            className={cn(
                              "group relative overflow-hidden rounded-xl bg-white border border-white shadow-xl shadow-primary/5 transition-all duration-500",
                              cat === 'Imagen' ? "flex flex-col" : "flex items-center justify-between p-6"
                            )}
                          >
                            {cat === 'Imagen' ? (
                              <>
                                <div className="aspect-[4/3] relative overflow-hidden">
                                  <img src={doc.fileUrl} alt={doc.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6 gap-3">
                                    <Button
                                      size="icon"
                                      variant="secondary"
                                      className="rounded-2xl h-12 w-12 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
                                      onClick={() => handlePreview(doc)}
                                    >
                                      <Eye className="h-6 w-6" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="secondary"
                                      className="rounded-2xl h-12 w-12 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
                                    >
                                      <a href={doc.fileUrl} download><Download className="h-6 w-6" /></a>
                                    </Button>
                                  </div>
                                </div>
                                <div className="p-6">
                                  <p className="text-lg font-black text-foreground truncate">{doc.name}</p>
                                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{doc.date} • {doc.fileSize}</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-6">
                                  <div className="h-14 w-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <FileIcon className="h-7 w-7" />
                                  </div>
                                  <div>
                                    <p className="text-lg font-black text-foreground">{doc.name}</p>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{doc.date} • {doc.fileSize}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="ghost"
                                    className="gap-2 text-primary font-black hover:bg-primary/5 rounded-xl h-11 px-5"
                                    onClick={() => handlePreview(doc)}
                                  >
                                    <Eye className="h-5 w-5" />
                                    Visualizar
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                                    <a href={doc.fileUrl} download><Download className="h-5 w-5" /></a>
                                  </Button>
                                </div>
                              </>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-20 text-muted-foreground font-black italic bg-secondary/20 rounded-[2.5rem] border-2 border-dashed border-primary/10 uppercase tracking-widest text-xs">
                          No se han encontrado {cat.toLowerCase()}s
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </TabsContent>

          <TabsContent value="appointments">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5"
            >
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Calendar className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    Gestión de Citas
                  </h3>
                  <p className="text-muted-foreground font-medium pl-1">
                    Planificación y seguimiento de encuentros clínicos.
                  </p>
                </div>
                <Button className="gap-2 h-12 px-8 rounded-xl shadow-xl shadow-primary/20 bg-primary hover:scale-[1.02] transition-all duration-300">
                  <Plus className="h-5 w-5" />
                  Programar Cita
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {appointments.length > 0 ? (
                  appointments.map((apt: any) => (
                    <motion.div
                      whileHover={{ scale: 1.01, x: 10 }}
                      key={apt.id}
                      className="group relative p-8 rounded-xl border border-white bg-white shadow-xl shadow-primary/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                          {/* Date Block */}
                          <div className="flex flex-col items-center justify-center h-20 w-20 rounded-xl bg-primary/5 text-primary border border-primary/10 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <span className="text-[10px] font-black uppercase tracking-widest">{apt.date.split('-')[1]}</span>
                            <span className="text-3xl font-black leading-none">{apt.date.split('-')[2]}</span>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-300">{apt.reason}</h4>
                            <div className="flex flex-wrap gap-4 mt-1">
                              <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-white/50">
                                <User className="h-4 w-4 text-primary" />
                                {apt.doctor}
                              </span>
                              <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-white/50">
                                <Clock className="h-4 w-4 text-primary" />
                                {apt.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <Badge
                            className={cn(
                              "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em]",
                              apt.status === 'Completada' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                apt.status === 'Pendiente' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                                  'bg-destructive/10 text-destructive border-destructive/20'
                            )}
                          >
                            {apt.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-secondary/30 hover:bg-primary hover:text-white transition-all duration-300">
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 text-muted-foreground font-black italic bg-secondary/20 rounded-xl border-2 border-dashed border-primary/10 uppercase tracking-widest text-xs">
                    No hay citas programadas
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>

      <DocumentPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        document={selectedDoc || { name: '', fileUrl: '', category: '', date: '' }} 
      />

      {/* Create Evolution Modal */}
      <Dialog open={isEvolutionModalOpen} onOpenChange={setIsEvolutionModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-10 pb-6 bg-slate-50/50">
            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <Plus size={24} />
              </div>
              Registrar Nueva Evolución
            </DialogTitle>
          </DialogHeader>

          <div className="p-10 pt-4 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Doctor Responsable</label>
                <input 
                  type="text" 
                  defaultValue="Dr. Alejandro V."
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Estado de Evolución</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all">
                  <option>Normal</option>
                  <option>Excelente</option>
                  <option>Alerta / Requiere Revisión</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nota Clínica</label>
              <textarea 
                placeholder="Describa el progreso del paciente, signos observados y recomendaciones..."
                className="w-full min-h-[150px] px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
              />
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-900">Validación de Seguridad</p>
                <p className="text-[10px] font-medium text-amber-700">Esta nota se guardará con su firma digital y marca de tiempo permanente.</p>
              </div>
            </div>
          </div>

          <DialogFooter className="p-10 pt-0">
            <Button 
              variant="outline"
              onClick={() => setIsEvolutionModalOpen(false)}
              className="h-12 px-8 rounded-2xl font-bold text-xs uppercase tracking-widest"
            >
              Cancelar
            </Button>
            <Button 
              onClick={() => setIsEvolutionModalOpen(false)}
              className="h-12 px-10 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700"
            >
              Guardar Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
