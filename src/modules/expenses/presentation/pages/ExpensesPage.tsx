import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Plus, 
  Search, 
  Calendar, 
  PieChart as PieIcon,
  BarChart3,
  DollarSign,
  Trash2,
  FileText,
  Edit2,
  ListFilter,
  PlusCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/components/ui/dialog';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

const dataTrend = [
  { day: 'Lun', amount: 120 },
  { day: 'Mar', amount: 300 },
  { day: 'Mie', amount: 150 },
  { day: 'Jue', amount: 450 },
  { day: 'Vie', amount: 200 },
  { day: 'Sab', amount: 600 },
  { day: 'Dom', amount: 100 },
];

const dataCategories = [
  { name: 'Suministros', value: 4500, color: 'oklch(42% 0.14 255)' },
  { name: 'Servicios', value: 1200, color: 'oklch(65% 0.16 160)' },
  { name: 'Nómina', value: 8000, color: 'oklch(75% 0.15 75)' },
  { name: 'Marketing', value: 2500, color: 'oklch(60% 0.18 25)' },
  { name: 'Mantenimiento', value: 800, color: 'oklch(50% 0.04 250)' },
];

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'Pagado' | 'Pendiente';
}

const initialExpenses: Expense[] = [
  { id: '1', category: 'Suministros', description: 'Compra de Toxina Botulínica', amount: 1250, date: '2024-05-14', status: 'Pagado' },
  { id: '2', category: 'Servicios', description: 'Pago de Internet y Telefonía', amount: 85, date: '2024-05-14', status: 'Pagado' },
  { id: '3', category: 'Nómina', description: 'Sueldo Enfermería Mayo', amount: 2400, date: '2024-05-13', status: 'Pendiente' },
  { id: '4', category: 'Marketing', description: 'Campaña Instagram Junio', amount: 500, date: '2024-05-13', status: 'Pagado' },
];

export const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsAddModalOpen(true);
  };

  const groupedExpenses = expenses.reduce((groups: { [key: string]: Expense[] }, expense) => {
    const date = expense.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(expense);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => b.localeCompare(a));

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Gastos y Egresos"
        subtitle="Administración Financiera Integral"
        icon={Wallet}
        actions={
          <>
            <div className="hidden sm:flex items-center gap-3 bg-secondary/50 px-5 py-2.5 rounded-2xl border border-border mr-2">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Mayo 2024</span>
            </div>
            <Button 
              onClick={() => { setEditingExpense(null); setIsAddModalOpen(true); }}
              className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/10 hover:translate-y-[-1px] transition-all"
            >
              <PlusCircle size={16} /> Registrar Gasto
            </Button>
          </>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary p-1 h-12 rounded-2xl border border-border mb-8 gap-1 w-full sm:w-auto overflow-x-auto scrollbar-none">
          <TabsTrigger value="list" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <ListFilter size={14} className="mr-2" /> Listado Detallado
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 sm:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap">
            <BarChart3 size={14} className="mr-2" /> Dashboard Financiero
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="outline-none space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] border border-border shadow-sm gap-6">
            <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
              <FileText size={18} className="text-primary" /> Historial de Movimientos
            </h3>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
              <input 
                type="text" 
                placeholder="Buscar por descripción..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-[11px] font-bold outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-12">
            {sortedDates.map(date => (
              <div key={date} className="relative pl-10">
                <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border/50" />
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="h-3.5 w-3.5 rounded-full bg-primary border-4 border-background shadow-sm z-10 -ml-[1.4rem]" />
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">{date}</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {groupedExpenses[date].map((expense) => (
                    <motion.div 
                      key={expense.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-6 p-5 rounded-3xl border border-border bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.02] transition-all group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors shrink-0">
                        <DollarSign size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-sm font-black text-foreground truncate tracking-tight">{expense.description}</h4>
                          <Badge variant="outline" className="rounded-md border-border bg-secondary text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
                            {expense.category}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Movimiento ID: {expense.id}</p>
                      </div>
                      <div className="flex items-center gap-10 shrink-0">
                        <div className="text-right">
                          <p className="text-lg font-black text-foreground tracking-tighter leading-none">${expense.amount.toLocaleString()}</p>
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-[0.15em] mt-1 block",
                            expense.status === 'Pagado' ? "text-success" : "text-warning"
                          )}>{expense.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button onClick={() => handleEdit(expense)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent"><Edit2 size={16} /></Button>
                          <Button onClick={() => handleDelete(expense.id)} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"><Trash2 size={16} /></Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Gasto Hoy', value: '$240', change: '+12%', color: 'text-warning' },
              { label: 'Gasto Semana', value: '$2,850', change: '-5%', color: 'text-success' },
              { label: 'Gasto Mes', value: '$12,450', change: '+8%', color: 'text-primary' }
            ].map((kpi, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-border bg-white shadow-sm flex flex-col gap-4 group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{kpi.label}</p>
                  <Badge variant="outline" className={cn("rounded-full px-2 py-0.5 text-[8px] font-black", kpi.color === 'text-success' ? "border-success/20 text-success bg-success/5" : "border-warning/20 text-warning bg-warning/5")}>
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-3xl font-black text-foreground tracking-tighter leading-none">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-10 rounded-[3rem] border border-border bg-white shadow-sm">
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3 mb-10">
                <BarChart3 size={18} className="text-primary" /> Tendencia de Egresos
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataTrend}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(42% 0.14 255)" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="oklch(42% 0.14 255)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(93% 0.01 250)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="amount" stroke="oklch(42% 0.14 255)" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 p-10 rounded-[3rem] border border-border bg-white shadow-sm flex flex-col">
              <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3 mb-10">
                <PieIcon size={18} className="text-primary" /> Distribución por Categoría
              </h3>
              <div className="flex-1 h-[250px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={dataCategories} cx="50%" cy="50%" innerRadius="60%" outerRadius="85%" paddingAngle={4} dataKey="value" stroke="none">
                      {dataCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Total Mes</span>
                  <span className="text-2xl font-black text-foreground tracking-tighter">$17.5k</span>
                </div>
              </div>
              <div className="space-y-2 mt-10">
                {dataCategories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tight">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-foreground">${cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="p-8 border-b border-border bg-secondary/30">
            <DialogTitle className="text-xl font-heading font-black text-foreground flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                {editingExpense ? <Edit2 size={20} /> : <Plus size={20} />}
              </div>
              {editingExpense ? 'Editar Gasto' : 'Nuevo Egreso'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Categoría</label>
                <select defaultValue={editingExpense?.category || "Suministros"} className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-bold outline-none focus:border-primary transition-all">
                  <option>Suministros</option><option>Nómina</option><option>Servicios</option><option>Marketing</option><option>Mantenimiento</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Monto ($)</label>
                <input type="number" defaultValue={editingExpense?.amount} placeholder="0.00" className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-bold outline-none focus:border-primary transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Descripción Detallada</label>
              <textarea defaultValue={editingExpense?.description} placeholder="Detalle del gasto..." className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-bold outline-none focus:border-primary transition-all min-h-[120px] resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Fecha</label>
                <input type="date" defaultValue={editingExpense?.date || "2024-05-12"} className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-black outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Estado</label>
                <select defaultValue={editingExpense?.status || "Pagado"} className="w-full px-5 py-4 rounded-2xl border border-border bg-secondary text-sm font-black outline-none focus:border-primary transition-all">
                  <option>Pagado</option><option>Pendiente</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="p-10 border-t border-border bg-secondary/20 flex gap-4">
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cancelar</Button>
            <Button onClick={() => setIsAddModalOpen(false)} className="h-12 px-12 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">Confirmar Registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
