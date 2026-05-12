import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Search, 
  DollarSign, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  User,
  MoreVertical,
  Receipt,
  Wallet,
  PlusCircle,
  Download
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface PaymentRecord {
  id: string;
  patientName: string;
  procedure: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  lastPaymentDate: string;
  status: 'Completado' | 'Pendiente' | 'En Mora';
}

interface Transaction {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  type: 'Abono' | 'Pago Total';
}

const mockPayments: PaymentRecord[] = [
  {
    id: 'P1',
    patientName: 'María García',
    procedure: 'Rinoplastia',
    totalAmount: 3500,
    paidAmount: 2000,
    pendingAmount: 1500,
    lastPaymentDate: '2024-05-10',
    status: 'Pendiente'
  },
  {
    id: 'P2',
    patientName: 'Juan Pérez',
    procedure: 'Botox 3 Zonas',
    totalAmount: 350,
    paidAmount: 350,
    pendingAmount: 0,
    lastPaymentDate: '2024-05-08',
    status: 'Completado'
  },
  {
    id: 'P3',
    patientName: 'Ana Rodríguez',
    procedure: 'Lipoescultura',
    totalAmount: 5000,
    paidAmount: 1500,
    pendingAmount: 3500,
    lastPaymentDate: '2024-05-01',
    status: 'En Mora'
  },
  {
    id: 'P4',
    patientName: 'Carlos López',
    procedure: 'Rinomodelación',
    totalAmount: 450,
    paidAmount: 200,
    pendingAmount: 250,
    lastPaymentDate: '2024-05-11',
    status: 'Pendiente'
  }
];

const mockTransactions: Transaction[] = [
  { id: 'T1', patientName: 'María García', amount: 500, date: '2024-05-10', method: 'Transferencia', type: 'Abono' },
  { id: 'T2', patientName: 'Carlos López', amount: 200, date: '2024-05-11', method: 'Efectivo', type: 'Abono' },
  { id: 'T3', patientName: 'Juan Pérez', amount: 350, date: '2024-05-08', method: 'Tarjeta', type: 'Pago Total' }
];

export const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('balances');

  const stats = [
    { label: 'Total Cartera', value: '$9,300', icon: Wallet, color: 'text-primary bg-primary/5' },
    { label: 'Recaudado Mes', value: '$4,050', icon: TrendingUp, color: 'text-success bg-success/5' },
    { label: 'Saldo Pendiente', value: '$5,250', icon: Clock, color: 'text-warning bg-warning/5' },
    { label: 'Pagos Hoy', value: '$200', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Gestión Financiera"
        subtitle="Control de Ingresos, Abonos y Cuentas por Cobrar"
        icon={CreditCard}
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex h-11 px-6 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary">
              <Download size={14} className="text-primary" /> Reporte Caja
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <PlusCircle size={16} /> Registrar Pago
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 md:p-8 rounded-[2rem] bg-white border border-border shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all"
          >
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-colors shrink-0", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter leading-none">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="p-1.5 bg-secondary/50 backdrop-blur-md rounded-[2rem] border border-border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <TabsList className="bg-transparent h-12 p-0 gap-1 w-full md:w-auto">
            <TabsTrigger 
              value="balances" 
              className="flex-1 md:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Cartera Activa
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 md:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all whitespace-nowrap"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Historial Caja
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-80 px-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
            <input 
              type="text" 
              placeholder="Buscar por paciente..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
            />
          </div>
        </div>

        <TabsContent value="balances" className="outline-none">
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary/20 border-b border-border">
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Paciente / Procedimiento</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Costo Total</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Abonado</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Saldo Deudor</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Estado</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {mockPayments.map((payment, idx) => (
                    <motion.tr 
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-secondary/10 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all border border-border shadow-sm">
                            <User size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground uppercase tracking-tight">{payment.patientName}</p>
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{payment.procedure}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-muted-foreground tracking-tighter">${payment.totalAmount}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-success tracking-tighter">${payment.paidAmount}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <span className={cn(
                            "text-lg font-black tracking-tighter leading-none",
                            payment.pendingAmount > 0 ? "text-warning" : "text-slate-300"
                          )}>
                            ${payment.pendingAmount}
                          </span>
                          {payment.pendingAmount > 0 && (
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-warning rounded-full" 
                                style={{ width: `${(payment.pendingAmount / payment.totalAmount) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <Badge variant="outline" className={cn(
                          "rounded-lg text-[9px] font-black uppercase tracking-widest px-4 py-1",
                          payment.status === 'Completado' ? 'border-success/20 text-success bg-success/5' :
                          payment.status === 'Pendiente' ? 'border-warning/20 text-warning bg-warning/5' :
                          'border-destructive/20 text-destructive bg-destructive/5'
                        )}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
                          <MoreVertical size={18} className="text-muted-foreground" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="outline-none">
          <div className="grid grid-cols-1 gap-6">
            {mockTransactions.map((tx, idx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 md:p-8 bg-white border border-border rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:border-success/20 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-success/5 text-success flex items-center justify-center border border-success/10 shadow-inner group-hover:bg-success/10 transition-all">
                    {tx.type === 'Abono' ? <ArrowUpRight size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <p className="text-lg font-black text-foreground uppercase tracking-tight">{tx.patientName}</p>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-border bg-secondary/30 px-3 py-1">{tx.method}</Badge>
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{tx.date} • {tx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-success tracking-tighter leading-none mb-1">+${tx.amount}</p>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">ID TX: {tx.id}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="py-10 text-center opacity-20">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">GROUP V&V • FINANCIAL INTELLIGENCE</p>
      </div>
    </div>
  );
};
