import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Activity, 
  AlertCircle,
  Clock,
  HeartPulse,
  ChevronRight,
  LayoutDashboard,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

const financialData = [
  { month: 'Ene', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 52000, expenses: 35000 },
  { month: 'Mar', income: 48000, expenses: 31000 },
  { month: 'Abr', income: 61000, expenses: 42000 },
  { month: 'May', income: 55000, expenses: 38000 },
  { month: 'Jun', income: 67000, expenses: 45000 },
];

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-700 font-sans">
      <PageHeader 
        title="Centro Estratégico"
        subtitle="Inteligencia de Datos y Gestión Operativa"
        icon={LayoutDashboard}
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex h-11 px-6 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary">
              <Calendar size={14} className="text-primary" /> Mayo 2024
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <Download size={14} /> Reporte PDF
            </Button>
          </>
        }
      />

      {/* KPI Grid - Responsive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Ingresos Mensuales', value: '$124.5k', change: '+12%', icon: DollarSign, color: 'text-primary' },
          { label: 'Pacientes Totales', value: '1,240', change: '+8%', icon: Users, color: 'text-success' },
          { label: 'Cirugías Éxito', value: '86', change: '+5%', icon: Activity, color: 'text-primary' },
          { label: 'Caja Libre', value: '$45.2k', change: '-2%', icon: TrendingUp, color: 'text-warning' }
        ].map((kpi, i) => (
          <div key={i} className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-border shadow-sm hover:border-primary/20 transition-all group">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className={cn("h-10 w-10 md:h-12 md:w-12 rounded-xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent", kpi.color)}>
                <kpi.icon className="w-5 h-5 md:w-[22px] md:h-[22px]" />
              </div>
              <Badge variant="outline" className={cn("rounded-full px-2 py-0.5 text-[9px] font-black", kpi.change.startsWith('+') ? "border-success/20 text-success bg-success/5" : "border-warning/20 text-warning bg-warning/5")}>
                {kpi.change}
              </Badge>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
              <p className="text-2xl md:text-3xl font-black text-foreground tracking-tighter leading-none">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-8 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 gap-4">
            <div>
              <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                <Activity size={18} className="text-primary" /> Rendimiento
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Ingresos vs Egresos</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Ingresos</span></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-slate-200" /><span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Egresos</span></div>
            </div>
          </div>
          <div className="h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(42% 0.14 255)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="oklch(42% 0.14 255)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(93% 0.01 250)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="income" stroke="oklch(42% 0.14 255)" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="oklch(20% 0.04 250 / 0.2)" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white border border-border shadow-sm flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
                <AlertCircle size={18} className="text-warning" /> Alertas Críticas
              </h3>
              <Badge variant="ghost" className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">3 Incidentes</Badge>
            </div>
            <div className="space-y-4 flex-1">
              {[
                { item: 'Botox Allergan 100u', stock: '2 u.', status: 'Crítico', desc: 'Reponer antes del Viernes' },
                { item: 'Ácido Hialurónico Juvederm', stock: '5 u.', status: 'Bajo', desc: 'Stock mínimo alcanzado' },
                { item: 'Insumos Quirúrgicos', stock: 'Ok', status: 'Suficiente', desc: 'Actualizado hace 2h' }
              ].map((alert, i) => (
                <div key={i} className="p-5 rounded-3xl bg-secondary/30 border border-border/50 group hover:border-primary/20 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-foreground tracking-tight uppercase">{alert.item}</span>
                    <Badge className={cn(
                      "text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg",
                      alert.status === 'Crítico' ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/10 text-warning border-warning/20"
                    )}>{alert.stock}</Badge>
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{alert.desc}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 h-12 rounded-2xl border border-border text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-secondary">
              Gestionar Inventario
            </Button>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-10 border-b border-border bg-secondary/10 flex justify-between items-center">
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em] flex items-center gap-3">
            <HeartPulse size={20} className="text-primary" /> Actividad Reciente
          </h3>
          <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Ver historial completo</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <tbody className="divide-y divide-border/50">
              {[
                { activity: 'Nueva Cirugía Programada', user: 'Dr. Santos', time: '5m', patient: 'Elena G.' },
                { activity: 'Gasto: Insumos Médicos', user: 'Marta R.', time: '15m', patient: '-' },
                { activity: 'Ingreso Recuperación', user: 'Recepción', time: '45m', patient: 'Carlos M.' },
                { activity: 'Pago Recibido: Factura', user: 'Caja', time: '1h', patient: 'Sofia V.' }
              ].map((item, i) => (
                <tr key={i} className="group hover:bg-secondary/20 transition-colors">
                  <td className="px-6 md:px-10 py-5 md:py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-all">
                        <Clock size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] md:text-sm font-black text-foreground tracking-tight truncate">{item.activity}</p>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden sm:table-cell">{item.user}</td>
                  <td className="px-6 md:px-10 py-6">
                    <Badge variant="outline" className="rounded-lg border-border bg-white text-[9px] font-black text-primary px-2 py-0.5 whitespace-nowrap">
                      {item.patient}
                    </Badge>
                  </td>
                  <td className="px-6 md:px-10 py-6 text-right">
                    <ChevronRight size={16} className="text-border group-hover:text-primary transition-colors ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
