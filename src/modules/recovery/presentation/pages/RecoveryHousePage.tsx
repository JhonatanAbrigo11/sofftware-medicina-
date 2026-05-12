import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Bed, 
  User, 
  Clock, 
  Stethoscope, 
  Utensils, 
  WashingMachine, 
  Droplets, 
  Pill, 
  CheckCircle2, 
  ArrowRight,
  History,
  ClipboardList,
  DoorOpen,
  PlusCircle,
  Search,
  Activity,
  Calendar
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface StayExpense {
  id: string;
  type: 'Comida' | 'Lavandería' | 'Medicina' | 'Aseo' | 'Otros';
  description: string;
  amount: number;
  date: string;
}

interface RecoveryPatient {
  id: string;
  name: string;
  bed: string;
  procedure: string;
  entryDate: string;
  exitDate?: string;
  daysStayed: number;
  status: 'Activo' | 'Finalizado';
  expenses: StayExpense[];
}

const initialPatients: RecoveryPatient[] = [
  { 
    id: 'P1', 
    name: 'Elena Gomez', 
    bed: 'Habitación 101-A', 
    procedure: 'Rinoplastia Ultrasónica', 
    entryDate: '2024-05-10', 
    daysStayed: 2, 
    status: 'Activo', 
    expenses: [
      { id: 'e1', type: 'Comida', description: 'Almuerzo Dieta Blanda', amount: 15.00, date: '2024-05-11' }, 
      { id: 'e2', type: 'Medicina', description: 'Analgésicos Post-Op', amount: 45.00, date: '2024-05-11' }
    ] 
  },
  { 
    id: 'P2', 
    name: 'Carlos Mendez', 
    bed: 'Habitación 104-B', 
    procedure: 'Lipoescultura HD', 
    entryDate: '2024-05-08', 
    daysStayed: 4, 
    status: 'Activo', 
    expenses: [
      { id: 'e3', type: 'Lavandería', description: 'Lavado de Faja Médica', amount: 12.00, date: '2024-05-09' }, 
      { id: 'e4', type: 'Comida', description: 'Cena Especial', amount: 18.00, date: '2024-05-10' }
    ] 
  },
  {
    id: 'P3',
    name: 'Isabella Martínez',
    bed: 'Suite 201',
    procedure: 'Mamoplastia de Aumento',
    entryDate: '2024-04-15',
    exitDate: '2024-04-18',
    daysStayed: 3,
    status: 'Finalizado',
    expenses: [
      { id: 'e5', type: 'Comida', description: 'Pensión Completa (3 días)', amount: 150.00, date: '2024-04-16' },
      { id: 'e6', type: 'Aseo', description: 'Kit de Aseo Premium', amount: 35.00, date: '2024-04-15' }
    ]
  },
  {
    id: 'P4',
    name: 'Juan Rodríguez',
    bed: 'Habitación 102',
    procedure: 'Abdominoplastia',
    entryDate: '2024-04-20',
    exitDate: '2024-04-27',
    daysStayed: 7,
    status: 'Finalizado',
    expenses: [
      { id: 'e7', type: 'Medicina', description: 'Paquete de Curación', amount: 85.00, date: '2024-04-21' },
      { id: 'e8', type: 'Lavandería', description: 'Limpieza de Sábanas Diaria', amount: 42.00, date: '2024-04-23' }
    ]
  },
  {
    id: 'P5',
    name: 'Lucía Fernández',
    bed: 'Habitación 106-B',
    procedure: 'Blefaroplastia',
    entryDate: '2024-05-01',
    exitDate: '2024-05-03',
    daysStayed: 2,
    status: 'Finalizado',
    expenses: [
      { id: 'e9', type: 'Comida', description: 'Dieta Blanda Especial', amount: 30.00, date: '2024-05-02' }
    ]
  }
];

const AVAILABLE_ROOMS = ['Habitación 102', 'Habitación 103', 'Habitación 105', 'Habitación 106-A', 'Habitación 106-B', 'Suite 201'];
const PRESET_PRICES = { Comida: 15.00, Lavandería: 12.00, Aseo: 10.00, Medicina: 0 };

export const RecoveryHousePage = () => {
  const [patients, setPatients] = useState<RecoveryPatient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<RecoveryPatient | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [historySearch, setHistorySearch] = useState('');

  const [newEntry, setNewEntry] = useState({ name: '', bed: AVAILABLE_ROOMS[0], procedure: '', entryDate: new Date().toISOString().split('T')[0] });

  const handleAddExpense = (type: keyof typeof PRESET_PRICES) => {
    if (!selectedPatient) return;
    const newExpense: StayExpense = { id: Math.random().toString(36).substr(2, 9), type: type as any, description: `Servicio de ${type}`, amount: PRESET_PRICES[type], date: new Date().toISOString().split('T')[0] };
    const updatedPatients = patients.map(p => p.id === selectedPatient.id ? { ...p, expenses: [...p.expenses, newExpense] } : p);
    setPatients(updatedPatients);
    setSelectedPatient({ ...selectedPatient, expenses: [...selectedPatient.expenses, newExpense] });
  };

  const handleFinalizeStay = (id: string) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: 'Finalizado', exitDate: new Date().toISOString().split('T')[0] } : p));
    setIsDetailModalOpen(false);
  };

  const handleSaveNewEntry = () => {
    const entry: RecoveryPatient = { id: `P${Math.floor(Math.random() * 1000)}`, name: newEntry.name, bed: newEntry.bed, procedure: newEntry.procedure, entryDate: newEntry.entryDate, daysStayed: 1, status: 'Activo', expenses: [] };
    setPatients([entry, ...patients]);
    setIsAddPatientModalOpen(false);
    setNewEntry({ name: '', bed: AVAILABLE_ROOMS[0], procedure: '', entryDate: new Date().toISOString().split('T')[0] });
  };

  const activePatients = patients.filter(p => p.status === 'Activo');
  const historyPatients = patients.filter(p => 
    p.status === 'Finalizado' && 
    (p.name.toLowerCase().includes(historySearch.toLowerCase()) || 
     p.procedure.toLowerCase().includes(historySearch.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Casa de Recuperación"
        subtitle="Gestión de Estancias Post-Quirúrgicas"
        icon={Home}
        actions={
          <>
            <div className="hidden lg:flex items-center gap-4 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-border mr-2">
              <div className="flex items-center gap-2">
                <Bed size={14} className="text-primary" />
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{activePatients.length} OCUPADOS</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{AVAILABLE_ROOMS.length} DISP.</span>
              </div>
            </div>
            <Button onClick={() => setIsAddPatientModalOpen(true)} className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/10 hover:translate-y-[-1px] transition-all">
              <PlusCircle size={16} /> Registrar Ingreso
            </Button>
          </>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary p-1 h-12 rounded-2xl border border-border mb-8 gap-1 w-full sm:w-auto overflow-x-auto scrollbar-none">
          <TabsTrigger value="active" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <Bed size={14} className="mr-2" /> Pacientes Activos
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <History size={14} className="mr-2" /> Historial de Estancias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {activePatients.map((patient) => (
              <motion.div key={patient.id} layoutId={patient.id} onClick={() => { setSelectedPatient(patient); setIsDetailModalOpen(true); }} className="group relative bg-white rounded-[2.5rem] border border-border p-8 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.03] transition-all cursor-pointer overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors"><User size={24} /></div>
                  <Badge variant="outline" className="border-success/20 text-success bg-success/5 text-[9px] font-black uppercase tracking-wider px-4 py-1 rounded-lg">{patient.bed}</Badge>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-foreground leading-tight mb-1">{patient.name}</h3>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-2"><Stethoscope size={12} /> {patient.procedure}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 py-6 border-y border-border/50">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Estancia</p>
                      <p className="text-xs font-black text-foreground flex items-center gap-2"><Clock size={14} className="text-primary" /> {patient.daysStayed} D.</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Cargos</p>
                      <p className="text-xs font-black text-foreground">${patient.expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="outline-none">
          <div className="bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden">
            <div className="p-10 border-b border-border bg-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest flex items-center gap-3"><ClipboardList size={20} className="text-primary" /> Archivo de Estancias</h3>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                <input 
                  type="text" 
                  placeholder="Buscar paciente o procedimiento..." 
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner" 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead><tr className="bg-secondary/30"><th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">Paciente</th><th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">Procedimiento</th><th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">Periodo</th><th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] text-right">Total</th><th className="px-10 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] text-right">Acción</th></tr></thead>
                <tbody className="divide-y divide-border/50">
                  {historyPatients.length > 0 ? (
                    historyPatients.map((patient) => (
                      <tr key={patient.id} className="group hover:bg-secondary/20 transition-colors">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-all shadow-sm"><User size={18} /></div>
                            <div><p className="text-sm font-black text-foreground">{patient.name}</p><p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{patient.bed}</p></div>
                          </div>
                        </td>
                        <td className="px-10 py-8"><p className="text-[11px] font-black text-foreground uppercase tracking-tight">{patient.procedure}</p></td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] font-black text-foreground flex items-center gap-2"><Calendar size={14} className="text-success" /> {patient.entryDate} <ArrowRight size={10} className="text-muted-foreground" /> {patient.exitDate}</p>
                            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">{patient.daysStayed} Días</p>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right"><p className="text-sm font-black text-foreground tracking-tighter">${patient.expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}</p></td>
                        <td className="px-10 py-8 text-right">
                          <Button onClick={() => { setSelectedPatient(patient); setIsDetailModalOpen(true); }} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent transition-all"><EyeIcon size={18} /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-20">
                          <Search size={48} />
                          <p className="text-xs font-black uppercase tracking-[0.3em]">No se encontraron estancias</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* NEW ENTRY MODAL */}
      <Dialog open={isAddPatientModalOpen} onOpenChange={setIsAddPatientModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col h-full">
            <div className="p-10 border-b border-border bg-secondary/30 flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20"><DoorOpen size={24} /></div>
              <div><h2 className="text-2xl font-heading font-black text-foreground tracking-tight">Registro de Ingreso</h2><p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Asignación de habitación y paciente</p></div>
            </div>
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] ml-1">Paciente</label>
                  <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30" /><input type="text" placeholder="Nombre completo..." value={newEntry.name} onChange={(e) => setNewEntry({...newEntry, name: e.target.value})} className="w-full pl-12 pr-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-black outline-none focus:border-primary transition-all" /></div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] ml-1">Procedimiento</label>
                  <div className="relative"><Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30" /><input type="text" placeholder="Ej: Lipoescultura HD..." value={newEntry.procedure} onChange={(e) => setNewEntry({...newEntry, procedure: e.target.value})} className="w-full pl-12 pr-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-black outline-none focus:border-primary transition-all" /></div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] ml-1">Habitación Disponible</label>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_ROOMS.map((room) => (
                      <button key={room} onClick={() => setNewEntry({...newEntry, bed: room})} className={cn("px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-tight transition-all", newEntry.bed === room ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white border-border text-muted-foreground hover:border-primary/30")}>{room}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] ml-1">Fecha de Ingreso</label>
                  <input type="date" value={newEntry.entryDate} onChange={(e) => setNewEntry({...newEntry, entryDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-black outline-none focus:border-primary transition-all" />
                </div>
              </div>
            </div>
            <div className="p-10 border-t border-border bg-secondary/20 flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setIsAddPatientModalOpen(false)} className="h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cancelar</Button>
              <Button onClick={handleSaveNewEntry} className="h-12 px-12 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">Confirmar Registro</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DETAIL MODAL */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-6xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[95vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col h-full">
            <div className="p-10 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between bg-secondary/20 gap-8">
              <div className="flex items-center gap-8">
                <div className="h-20 w-20 rounded-[1.5rem] bg-white border border-border flex items-center justify-center text-muted-foreground shadow-sm"><User size={40} /></div>
                <div>
                  <div className="flex items-center gap-4 mb-1.5">
                    <h2 className="text-2xl font-heading font-black text-foreground tracking-tight">{selectedPatient?.name}</h2>
                    <Badge className={cn("border-none text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-lg", selectedPatient?.status === 'Activo' ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>{selectedPatient?.status === 'Activo' ? selectedPatient?.bed : 'Archivado'}</Badge>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide"><Stethoscope size={14} className="text-primary" />{selectedPatient?.procedure}</p>
                </div>
              </div>
              <div className="flex gap-10 items-center bg-white px-10 py-6 rounded-[2rem] border border-border shadow-sm">
                <div className="flex gap-10 items-center">
                  <div className="text-center"><p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Estancia</p><p className="text-lg font-black text-foreground">{selectedPatient?.daysStayed} Días</p></div>
                  <div className="h-10 w-px bg-border" />
                  <div className="text-center min-w-[150px]"><p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Total Consolidado</p><p className="text-2xl font-black text-foreground tracking-tighter">${selectedPatient?.expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(0)}</p></div>
                </div>
                {selectedPatient?.status === 'Activo' && (
                  <><div className="h-10 w-px bg-border" /><Button onClick={() => selectedPatient && handleFinalizeStay(selectedPatient.id)} className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">Finalizar Estancia</Button></>
                )}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {selectedPatient?.status === 'Activo' ? (
                <div className="col-span-1 lg:col-span-4 p-10 border-r border-border space-y-8 bg-secondary/10">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-3 mb-4"><Activity size={16} className="text-primary" /> Cargar Servicios Post-Op</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[{ label: 'Servicio de Comida', icon: Utensils, type: 'Comida', price: '$15.00' }, { label: 'Lavandería Médica', icon: WashingMachine, type: 'Lavandería', price: '$12.00' }, { label: 'Servicio de Aseo', icon: Droplets, type: 'Aseo', price: '$10.00' }, { label: 'Medicina / Insumos', icon: Pill, type: 'Medicina', price: 'Manual' }].map((action, i) => (
                      <button key={i} onClick={() => handleAddExpense(action.type as any)} className="flex items-center justify-between p-5 rounded-2xl border border-border bg-white transition-all group hover:border-primary/20 hover:bg-primary/5">
                        <div className="flex items-center gap-4"><action.icon size={20} className="text-muted-foreground group-hover:scale-110 group-hover:text-primary transition-all" /><span className="text-[11px] font-black uppercase text-foreground tracking-tight">{action.label}</span></div>
                        <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors">{action.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="col-span-1 lg:col-span-4 p-10 border-r border-border flex flex-col items-center justify-center text-center space-y-6 opacity-40 bg-secondary/5"><CheckCircle2 size={64} className="text-success" /><div><p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">Estancia Finalizada</p><p className="text-xs font-bold text-muted-foreground mt-2 px-10">Este historial está bloqueado para auditoría y no permite cargos adicionales.</p></div></div>
              )}
              <div className="col-span-1 lg:col-span-8 p-10 flex flex-col h-full max-h-[600px]">
                <div className="flex justify-between items-center mb-8"><h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Desglose de Movimientos</h3><Badge variant="ghost" className="text-[10px] font-black text-muted-foreground tracking-widest">{selectedPatient?.expenses.length} CARGOS REGISTRADOS</Badge></div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-4 custom-scrollbar">
                  {selectedPatient?.expenses.map((expense) => (
                    <motion.div key={expense.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-5 rounded-2xl border border-border bg-white flex items-center justify-between group hover:border-primary/10 transition-all">
                      <div className="flex items-center gap-5"><div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">{expense.type === 'Comida' && <Utensils size={20} />}{expense.type === 'Lavandería' && <WashingMachine size={20} />}{expense.type === 'Medicina' && <Pill size={20} />}{expense.type === 'Aseo' && <Droplets size={20} />}</div><div><p className="text-sm font-black text-foreground tracking-tight">{expense.description}</p><p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{expense.date}</p></div></div>
                      <div className="text-right"><p className="text-lg font-black text-foreground tracking-tighter">${expense.amount.toFixed(0)}</p></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EyeIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
