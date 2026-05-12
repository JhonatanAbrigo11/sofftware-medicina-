import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scissors, 
  Search, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock,
  Upload,
  ClipboardCheck,
  Activity,
  ShieldCheck,
  CheckCircle,
  Eye,
  Printer,
  Download,
  FileCheck,
  PlusCircle,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface Requirement {
  id: string;
  label: string;
  status: 'Completed' | 'Pending';
  type: 'Document' | 'Check';
}

interface Surgery {
  id: string;
  patientId: string;
  patientName: string;
  procedure: string;
  date: string;
  time: string;
  surgeon: string;
  requirements: Requirement[];
  status: 'Programada' | 'Listo' | 'En Curso';
}

interface PostOpFollowUp {
  id: string;
  patientId: string;
  patientName: string;
  procedure: string;
  surgeryDate: string;
  daysPostOp: number;
  nextControl: string;
  recoveryStatus: 'Excelente' | 'Normal' | 'Requiere Atención';
  pendingActions: string[];
}

const initialSurgeries: Surgery[] = [
  {
    id: 'S1',
    patientId: '1',
    patientName: 'María García',
    procedure: 'Rinoplastia Estructural',
    date: '2024-05-20',
    time: '08:00 AM',
    surgeon: 'Dr. Alejandro V.',
    status: 'Programada',
    requirements: [
      { id: 'r1', label: 'Hemograma Completo', status: 'Completed', type: 'Document' },
      { id: 'r2', label: 'Tiempos de Coagulación (PT/PTT)', status: 'Pending', type: 'Document' },
      { id: 'r3', label: 'Valoración Cardiológica', status: 'Pending', type: 'Document' },
      { id: 'r4', label: 'Evaluación Anestésica', status: 'Pending', type: 'Check' },
      { id: 'r5', label: 'Consentimiento Informado Firmado', status: 'Completed', type: 'Check' },
      { id: 'r6', label: 'Fotografías Pre-Operatorias', status: 'Pending', type: 'Document' }
    ]
  },
  {
    id: 'S2',
    patientId: '2',
    patientName: 'Juan Pérez',
    procedure: 'Lipoescultura HD',
    date: '2024-05-22',
    time: '10:30 AM',
    surgeon: 'Dra. Elena M.',
    status: 'Programada',
    requirements: [
      { id: 'r7', label: 'Exámenes de Sangre', status: 'Pending', type: 'Document' },
      { id: 'r8', label: 'Electrocardiograma', status: 'Pending', type: 'Document' },
      { id: 'r9', label: 'Prueba COVID-19 (24h)', status: 'Pending', type: 'Check' },
      { id: 'r10', label: 'Aprobación de Seguro / Pago', status: 'Completed', type: 'Document' },
      { id: 'r11', label: 'Reserva de Sangre (Si aplica)', status: 'Pending', type: 'Check' },
      { id: 'r12', label: 'Marcación Quirúrgica Previa', status: 'Pending', type: 'Check' }
    ]
  }
];

const mockFollowUps: PostOpFollowUp[] = [
  {
    id: 'F1',
    patientId: '1',
    patientName: 'Laura Méndez',
    procedure: 'Mamoplastia de Aumento',
    surgeryDate: '2024-05-01',
    daysPostOp: 10,
    nextControl: '2024-05-15',
    recoveryStatus: 'Excelente',
    pendingActions: ['Retiro de puntos', 'Masaje linfático']
  },
  {
    id: 'F2',
    patientId: '2',
    patientName: 'Roberto Gómez',
    procedure: 'Blefaroplastia Superior',
    surgeryDate: '2024-05-08',
    daysPostOp: 3,
    nextControl: '2024-05-12',
    recoveryStatus: 'Normal',
    pendingActions: ['Revisión de inflamación']
  }
];

const mockConsentTemplates = [
  { id: 'C1', name: 'Consentimiento Informado Quirúrgico', icon: FileCheck, description: 'Autorización general para procedimientos quirúrgicos.' },
  { id: 'C2', name: 'Autorización de Anestesia', icon: ShieldCheck, description: 'Consentimiento para la administración de sedación y anestesia.' },
  { id: 'C3', name: 'Protocolo de Seguridad (Time-out)', icon: Activity, description: 'Verificación de seguridad en el quirófano.' }
];

export const SurgeriesPage = () => {
  const [activeTab, setActiveTab] = useState('scheduling');
  const [surgeries, setSurgeries] = useState<Surgery[]>(initialSurgeries);
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isNewSurgeryModalOpen, setIsNewSurgeryModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchPatient, setSearchPatient] = useState('María García');

  const handleOpenChecklist = (surgery: Surgery) => {
    setSelectedSurgery(surgery);
    setIsChecklistModalOpen(true);
  };

  const handlePreviewPdf = (template: any) => {
    setSelectedTemplate(template);
    setIsPdfModalOpen(true);
  };

  const toggleRequirement = (surgeryId: string, reqId: string) => {
    setSurgeries(surgeries.map(s => {
      if (s.id === surgeryId) {
        const updatedRequirements: Requirement[] = s.requirements.map(r => 
          r.id === reqId ? { ...r, status: r.status === 'Completed' ? 'Pending' : 'Completed' } : r
        );
        return { ...s, requirements: updatedRequirements };
      }
      return s;
    }));
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Gestión Quirúrgica"
        subtitle="Control Clínico y Documentación Legal"
        icon={Scissors}
        actions={
          <Button 
            onClick={() => setIsNewSurgeryModalOpen(true)}
            className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <PlusCircle size={16} /> Programar Cirugía
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="p-1.5 bg-secondary/50 backdrop-blur-md rounded-[2rem] border border-border mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <TabsList className="bg-transparent h-12 p-0 gap-1 w-full sm:w-auto">
            <TabsTrigger value="scheduling" className="flex-1 sm:flex-none rounded-xl px-8 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
              <Calendar size={14} className="mr-2" /> Programación
            </TabsTrigger>
            <TabsTrigger value="followup" className="flex-1 sm:flex-none rounded-xl px-8 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-success data-[state=active]:text-white data-[state=active]:shadow-sm transition-all whitespace-nowrap">
              <Activity size={14} className="mr-2" /> Seguimiento
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 sm:flex-none rounded-xl px-8 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-warning data-[state=active]:text-white data-[state=active]:shadow-sm transition-all whitespace-nowrap">
              <ShieldCheckIcon size={14} className="mr-2" /> Consentimientos
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-80 px-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
            <input 
              type="text" 
              placeholder="Buscar cirugía..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
            />
          </div>
        </div>

        <TabsContent value="scheduling" className="outline-none">
          <div className="grid grid-cols-1 gap-6">
            {surgeries.map((surgery) => (
              <motion.div 
                key={surgery.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-border p-8 flex flex-col md:flex-row items-center gap-10 group hover:border-primary/20 transition-all shadow-sm"
              >
                <div className="flex flex-col items-center justify-center h-20 w-20 shrink-0 rounded-[1.5rem] bg-secondary/50 border border-border shadow-inner">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">MAYO</span>
                  <span className="text-2xl font-black text-foreground tracking-tighter">{surgery.date.split('-')[2]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-black text-foreground tracking-tight uppercase">{surgery.patientName}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs font-black text-primary uppercase tracking-tight">{surgery.procedure}</p>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} /> {surgery.time}
                    </p>
                  </div>
                </div>

                {/* Progress Indicator - Desktop */}
                <div className="hidden lg:flex flex-col gap-2 min-w-[160px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Requisitos Pre-Op</span>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tight",
                      surgery.requirements.every(r => r.status === 'Completed') ? "text-success" : "text-primary"
                    )}>
                      {Math.round((surgery.requirements.filter(r => r.status === 'Completed').length / surgery.requirements.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(surgery.requirements.filter(r => r.status === 'Completed').length / surgery.requirements.length) * 100}%` }}
                      className={cn(
                        "h-full transition-all duration-500",
                        surgery.requirements.every(r => r.status === 'Completed') ? "bg-success" : "bg-primary"
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="text-right hidden xl:block">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Especialista</p>
                    <p className="text-xs font-black text-foreground uppercase">{surgery.surgeon}</p>
                  </div>
                  <Button 
                    onClick={() => handleOpenChecklist(surgery)} 
                    className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all"
                  >
                    Checklist Clínico
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="followup" className="outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockFollowUps.map((follow) => (
              <div key={follow.id} className="bg-white rounded-[2.5rem] border border-border p-8 hover:border-success/20 transition-all shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-xl font-black text-foreground tracking-tight uppercase">{follow.patientName}</h4>
                  <Badge className="rounded-lg bg-success/10 text-success border-success/20 text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    {follow.recoveryStatus}
                  </Badge>
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-8 border-b border-border pb-4">{follow.procedure}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Siguiente Control</p>
                    <p className="text-xs font-black text-foreground">{follow.nextControl}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Días Post-Op</p>
                    <p className="text-xs font-black text-success">{follow.daysPostOp} DÍAS</p>
                  </div>
                </div>

                <Button className="w-full h-11 rounded-xl bg-success text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-success/20 hover:bg-success/90 transition-all">Contactar Paciente</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2.5rem] border border-border bg-white shadow-sm">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6">Paciente Seleccionado</h3>
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
                    <input 
                      type="text" 
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
                    />
                  </div>
                  <div className="p-6 rounded-2xl bg-warning/5 border border-warning/10">
                    <div className="flex items-center gap-5 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-warning shadow-sm font-black text-lg border border-warning/10">MG</div>
                      <div>
                        <p className="text-sm font-black text-foreground uppercase tracking-tight">{searchPatient}</p>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">ID: 1020304050</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-warning/20">
                      <div>
                        <p className="text-[8px] font-black text-warning uppercase tracking-widest mb-1">Procedimiento</p>
                        <p className="text-[10px] font-black text-foreground uppercase">Rinoplastia</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-warning uppercase tracking-widest mb-1">Fecha Programada</p>
                        <p className="text-[10px] font-black text-foreground uppercase">20 May, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {mockConsentTemplates.map((template) => (
                <div key={template.id} className="p-8 rounded-[2.5rem] border border-border bg-white hover:border-warning/30 transition-all group shadow-sm flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary/50 text-muted-foreground group-hover:bg-warning/10 group-hover:text-warning flex items-center justify-center transition-all border border-border/50">
                      <template.icon size={22} />
                    </div>
                    <button 
                      onClick={() => handlePreviewPdf(template)}
                      className="h-10 w-10 rounded-xl bg-secondary/30 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                  <h4 className="text-sm font-black text-foreground mb-2 uppercase tracking-tight">{template.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground leading-relaxed mb-10 flex-1">
                    {template.description}
                  </p>
                  <Button 
                    onClick={() => handlePreviewPdf(template)}
                    variant="ghost" 
                    className="w-full h-11 rounded-xl bg-secondary/50 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all gap-3"
                  >
                    <Download size={14} /> Generar Documento
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Clinical Checklist Modal - Horizontal Layout */}
      <Dialog open={isChecklistModalOpen} onOpenChange={setIsChecklistModalOpen}>
        <DialogContent className="max-w-5xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row h-full min-h-[500px]">
            {/* Left Panel: Info & Progress */}
            <div className="w-full md:w-[350px] bg-secondary/30 border-r border-border p-10 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20">
                  <ClipboardCheck size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-black text-foreground tracking-tight leading-tight">Checklist de Seguridad</h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2">Protocolo Pre-Operatorio</p>
                </div>

                <div className="p-6 rounded-[2rem] bg-white border border-border shadow-sm">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3">Paciente</p>
                  <p className="text-lg font-black text-foreground uppercase tracking-tight leading-none mb-1">{selectedSurgery ? surgeries.find(s => s.id === selectedSurgery.id)?.patientName : ''}</p>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-tight">{selectedSurgery ? surgeries.find(s => s.id === selectedSurgery.id)?.procedure : ''}</p>
                </div>

                {selectedSurgery && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black text-foreground uppercase tracking-widest">Progreso Total</p>
                      <span className="text-2xl font-black text-primary tracking-tighter">
                        {Math.round((surgeries.find(s => s.id === selectedSurgery.id)!.requirements.filter(r => r.status === 'Completed').length / surgeries.find(s => s.id === selectedSurgery.id)!.requirements.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-border shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(surgeries.find(s => s.id === selectedSurgery.id)!.requirements.filter(r => r.status === 'Completed').length / surgeries.find(s => s.id === selectedSurgery.id)!.requirements.length) * 100}%` }}
                        className={cn(
                          "h-full transition-all duration-500",
                          surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') ? "bg-success" : "bg-primary"
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {selectedSurgery && (
                <div className={cn(
                  "p-6 rounded-2xl flex flex-col gap-4 transition-all",
                  surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') 
                    ? "bg-success text-white shadow-xl shadow-success/20" 
                    : "bg-white border border-border"
                )}>
                  <div className="flex items-center gap-3">
                    {surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <AlertCircle size={20} className="text-warning" />
                    )}
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      {surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') 
                        ? 'Listo para Quirófano' 
                        : 'Acción Requerida'}
                    </p>
                  </div>
                  <p className={cn(
                    "text-[9px] font-bold uppercase tracking-tight leading-relaxed",
                    surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') 
                      ? "text-white/80" 
                      : "text-muted-foreground"
                  )}>
                    {surgeries.find(s => s.id === selectedSurgery.id)!.requirements.every(r => r.status === 'Completed') 
                      ? 'Todos los protocolos de seguridad han sido verificados satisfactoriamente.' 
                      : `Faltan ${surgeries.find(s => s.id === selectedSurgery.id)!.requirements.filter(r => r.status === 'Pending').length} requisitos críticos.`}
                  </p>
                </div>
              )}
            </div>

            {/* Right Panel: Requirements List */}
            <div className="flex-1 p-10 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Lista de Verificación</h3>
                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border-border">ID: {selectedSurgery?.id}</Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[400px]">
                {selectedSurgery && surgeries.find(s => s.id === selectedSurgery.id)!.requirements.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-5 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                        req.status === 'Completed' ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                      )}>
                        {req.status === 'Completed' ? <CheckCircle2 size={18} /> : (req.type === 'Document' ? <FileText size={18} /> : <CheckCircle size={18} />)}
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-foreground uppercase tracking-tight">{req.label}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{req.type === 'Document' ? 'Documentación' : 'Validación'}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => toggleRequirement(selectedSurgery.id, req.id)}
                      variant={req.status === 'Completed' ? 'outline' : 'default'}
                      size="sm"
                      className={cn(
                        "h-9 px-4 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all gap-2",
                        req.status === 'Completed' 
                          ? "border-success/20 text-success bg-success/5 hover:bg-success/10" 
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {req.status === 'Completed' ? <CheckCircle2 size={12} /> : (req.type === 'Document' ? <Upload size={12} /> : <CheckCircle size={12} />)}
                      {req.status === 'Completed' ? 'Listo' : (req.type === 'Document' ? 'Subir' : 'Validar')}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-border flex justify-end">
                <Button onClick={() => setIsChecklistModalOpen(false)} className="h-12 px-12 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">
                  Finalizar Revisión
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Modal - Same premium style */}
      <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh]">
          <div className="flex flex-col h-full">
            <div className="p-6 bg-primary text-primary-foreground flex justify-between items-center px-10">
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-warning" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Documento Clínico Digital</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-white/10 text-white"><Printer size={18} /></Button>
                <Button onClick={() => setIsPdfModalOpen(false)} variant="ghost" className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-white">Cerrar Visor</Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 bg-secondary/30 flex justify-center custom-scrollbar">
              <div className="w-full max-w-[800px] bg-white shadow-2xl p-16 relative text-slate-800 rounded-sm">
                <div className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1 leading-none">GROUP V&V CLINIC</h2>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Surgical Excellence Center</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-1">REF: SURG-2024-0520</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">ID: 1020304050</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <h3 className="text-xl font-black text-center uppercase tracking-[0.3em] border-y border-slate-900/10 py-6 mb-16">
                    {selectedTemplate?.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-[11px]">
                    <div className="space-y-2">
                      <p className="font-black text-muted-foreground uppercase text-[8px] tracking-widest">Nombre del Paciente</p>
                      <p className="font-black border-b border-slate-100 pb-2 text-sm uppercase">{searchPatient}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-muted-foreground uppercase text-[8px] tracking-widest">Documento de Identidad</p>
                      <p className="font-black border-b border-slate-100 pb-2 text-sm">1020304050</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-muted-foreground uppercase text-[8px] tracking-widest">Intervención Programada</p>
                      <p className="font-black border-b border-slate-100 pb-2 text-sm uppercase">Rinoplastia Estructural</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-muted-foreground uppercase text-[8px] tracking-widest">Fecha de Procedimiento</p>
                      <p className="font-black border-b border-slate-100 pb-2 text-sm uppercase">20 DE MAYO, 2024</p>
                    </div>
                  </div>

                  <div className="pt-12 space-y-6 text-xs leading-relaxed text-justify font-bold text-slate-600">
                    <p>
                      Yo, <span className="text-slate-900">{searchPatient}</span>, manifiesto que he sido informado sobre el procedimiento denominado <span className="text-slate-900">Rinoplastia Estructural</span>, incluyendo sus riesgos y beneficios.
                    </p>
                    <p>
                      Autorizo al <span className="text-slate-900">Dr. Alejandro V.</span> para realizar la intervención. Entiendo que la medicina no es una ciencia exacta y no existen garantías de resultados.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-24 pt-40">
                    <div className="border-t border-slate-900 pt-6 text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Firma del Paciente</p>
                      <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">{searchPatient}</p>
                    </div>
                    <div className="border-t border-slate-900 pt-6 text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Firma Médica Autorizada</p>
                      <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Dr. Alejandro V. • Reg. 45290</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end text-[7px] font-black text-slate-300 uppercase tracking-[0.5em]">
                  <p>© 2024 GROUP V&V • DIGITAL CONSENT SYSTEM</p>
                  <p>FOLIO 001</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simplified New Surgery Modal */}
      <Dialog open={isNewSurgeryModalOpen} onOpenChange={setIsNewSurgeryModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="p-8 border-b border-border bg-secondary/30 flex items-center gap-6">
            <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-black text-foreground tracking-tight">Nueva Programación</h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Alta de cirugía clínica</p>
            </div>
          </div>
          <div className="p-10 flex flex-col gap-8">
            <p className="text-xs font-bold text-muted-foreground text-center px-4">Complete el formulario de programación para asignar quirófano y personal médico.</p>
            <Button onClick={() => setIsNewSurgeryModalOpen(false)} className="h-12 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">Continuar a Formulario</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
