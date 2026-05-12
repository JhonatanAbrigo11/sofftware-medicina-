import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Package, 
  Truck, 
  CreditCard,
  Eye,
  Check,
  Loader2,
  FileText,
  Printer,
  CheckCircle,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface PurchaseItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  total: number;
  status: 'Received' | 'Pending' | 'OnWay';
  items: PurchaseItem[];
}

const initialPurchases: PurchaseOrder[] = [
  {
    id: 'PO-001',
    supplier: 'Medical Supplies Co.',
    date: '2024-05-10',
    total: 1250.00,
    status: 'Received',
    items: [
      { id: '1', name: 'Guantes de Nitrilo', quantity: 50, unitPrice: 15.00 },
      { id: '2', name: 'Gasas Estériles', quantity: 100, unitPrice: 5.00 }
    ]
  },
  {
    id: 'PO-002',
    supplier: 'Esthetic Pharma',
    date: '2024-05-12',
    total: 3400.00,
    status: 'Pending',
    items: [
      { id: '3', name: 'Ácido Hialurónico', quantity: 10, unitPrice: 340.00 }
    ]
  },
  {
    id: 'PO-003',
    supplier: 'Equipos Médicos S.A.',
    date: '2024-05-15',
    total: 890.00,
    status: 'Pending',
    items: [
      { id: '4', name: 'Jeringas 5ml', quantity: 500, unitPrice: 1.78 }
    ]
  }
];

export const PurchasesPage = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<PurchaseOrder[]>(initialPurchases);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<'loading' | 'success'>('loading');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReceptionPdfOpen, setIsReceptionPdfOpen] = useState(false);

  const handleViewDetails = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleReceiveOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setToastStatus('loading');
    setShowToast(true);

    setTimeout(() => {
      setToastStatus('success');
      setTimeout(() => {
        setShowToast(false);
        setPurchases(prev => prev.map(p => p.id === order.id ? { ...p, status: 'Received' } : p));
        setIsConfirmModalOpen(true);
      }, 1500);
    }, 1500);
  };

  const stats = [
    { label: 'Órdenes Mes', value: '12', icon: Package, color: 'text-primary bg-primary/5' },
    { label: 'Gasto Consolidado', value: '$8,450', icon: CreditCard, color: 'text-success bg-success/5' },
    { label: 'Pendientes Arribo', value: '2', icon: Truck, color: 'text-warning bg-warning/5' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans relative">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 px-8 py-5 rounded-[2rem] bg-white shadow-2xl border border-border min-w-[380px]"
          >
            <div className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500",
              toastStatus === 'loading' ? "bg-secondary text-primary" : "bg-success text-white shadow-xl shadow-success/20"
            )}>
              {toastStatus === 'loading' ? <Loader2 className="h-6 w-6 animate-spin" /> : <Check className="h-6 w-6" strokeWidth={4} />}
            </div>
            <div>
              <p className="text-[11px] font-black text-foreground uppercase tracking-tight">
                {toastStatus === 'loading' ? 'Confirmando recepción...' : '¡Recepción Confirmada!'}
              </p>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Orden {selectedOrder?.id}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader 
        title="Compras y Reposición"
        subtitle="Abastecimiento Estratégico de Insumos Clínicos"
        icon={ShoppingCart}
        actions={
          <Button 
            onClick={() => navigate('/purchases/new')}
            className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <PlusCircle size={16} /> Nueva Orden de Compra
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] border border-border bg-white shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground tracking-tighter leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-secondary/30 p-2 rounded-[2rem] border border-border gap-4">
        <div className="flex items-center gap-2 pl-4">
          <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-3">
            <BarChart3 size={18} className="text-primary" /> Historial de Abastecimiento
          </h3>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
          <input 
            type="text" 
            placeholder="Buscar por proveedor o ID..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {purchases.map((order) => (
          <motion.div 
            key={order.id} 
            layout
            className="bg-white rounded-[2.5rem] border border-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-10 group hover:border-primary/20 transition-all shadow-sm"
          >
            <div className="h-16 w-16 rounded-[1.5rem] bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
              <Package size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-2">
                <h4 className="text-lg font-black text-foreground uppercase tracking-tight">{order.supplier}</h4>
                <Badge className={cn(
                  "px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]",
                  order.status === 'Received' ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                )}>
                  {order.status === 'Received' ? 'Mercancía Recibida' : 'Pendiente Arribo'}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em]">{order.id} • {order.date}</p>
            </div>

            <div className="flex items-center gap-10 shrink-0">
              <div className="text-right">
                <p className="text-xl font-black text-foreground tracking-tighter leading-none mb-1">${order.total.toFixed(2)}</p>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Inversión Stock</p>
              </div>
              <div className="flex items-center gap-4">
                {order.status === 'Pending' && (
                  <Button 
                    onClick={() => handleReceiveOrder(order)}
                    className="h-11 px-8 rounded-xl bg-success text-white font-black text-[10px] uppercase tracking-widest hover:bg-success/90 shadow-xl shadow-success/20 transition-all"
                  >
                    Confirmar Recepción
                  </Button>
                )}
                <Button 
                  onClick={() => handleViewDetails(order)}
                  variant="ghost" 
                  size="icon" 
                  className="h-11 w-11 rounded-xl text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                >
                  <Eye size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-24 w-24 rounded-[2rem] bg-success/5 text-success flex items-center justify-center mb-8 border border-success/10 shadow-inner">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-3">Recepción Exitosa</h3>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-10 leading-relaxed px-4">
              La mercancía ha sido integrada al stock del sistema. ¿Desea generar el acta de ingreso ahora?
            </p>
            
            <div className="flex flex-col gap-4 w-full">
              <Button 
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  setIsReceptionPdfOpen(true);
                }}
                className="h-14 w-full rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Generar Acta Digital
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setIsConfirmModalOpen(false)}
                className="h-12 w-full rounded-2xl text-muted-foreground font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all"
              >
                Omitir por ahora
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isReceptionPdfOpen} onOpenChange={setIsReceptionPdfOpen}>
        <DialogContent className="max-w-4xl w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white max-h-[90vh]">
          <div className="flex flex-col h-full">
            <div className="p-6 bg-primary text-primary-foreground flex justify-between items-center px-10">
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-success" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Acta de Ingreso a Bodega</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-white/10 text-white"><Printer size={18} /></Button>
                <Button onClick={() => setIsReceptionPdfOpen(false)} variant="ghost" className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-white">Cerrar</Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 bg-secondary/30 flex justify-center custom-scrollbar">
              <div className="w-full max-w-[800px] bg-white shadow-2xl p-16 relative text-slate-800 rounded-sm">
                <div className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1 leading-none">GROUP V&V CLINIC</h2>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">Logistics & Supply Management</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-1">RECEP: {selectedOrder?.id}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">{selectedOrder?.date}</p>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-success/5 border border-success/10 mb-12">
                  <p className="text-[9px] font-black text-success uppercase tracking-widest mb-3">Declaración de Recepción</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">
                    Se confirma el arribo de insumos procedentes de <span className="text-slate-900">{selectedOrder?.supplier}</span>. Los productos han sido verificados bajo protocolo de calidad interno.
                  </p>
                </div>

                <div className="flex-1">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-slate-900">
                        <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Descripción del Insumo</th>
                        <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Cant.</th>
                        <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Estado</th>
                        <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Verificado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder?.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-5 text-xs font-black text-slate-800 uppercase tracking-tight">{item.name}</td>
                          <td className="py-5 text-xs font-black text-slate-800 text-center">{item.quantity}</td>
                          <td className="py-5 text-[9px] font-black text-success text-center uppercase tracking-widest">Óptimo</td>
                          <td className="py-5 text-right">
                            <Check size={14} className="text-success ml-auto" strokeWidth={4} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-32 grid grid-cols-2 gap-24">
                  <div className="border-t border-slate-900 pt-6 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Entregado Por</p>
                    <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Logística Externa</p>
                  </div>
                  <div className="border-t border-slate-900 pt-6 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1">Recibido en Bodega</p>
                    <p className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Control Interno V&V</p>
                  </div>
                </div>

                <div className="absolute bottom-16 left-16 right-16 text-center text-[7px] font-black text-slate-300 uppercase tracking-[0.5em]">
                  <p>© 2024 GROUP V&V • SUPPLY CHAIN VERIFICATION</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-md w-[95vw] rounded-[3rem] p-0 border-none shadow-2xl overflow-hidden bg-white">
          <div className="p-10">
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-8">Detalle de Orden {selectedOrder?.id}</h3>
            <div className="space-y-4 mb-10">
              {selectedOrder?.items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 rounded-2xl bg-secondary/30 border border-border">
                  <span className="text-[11px] font-black text-foreground uppercase tracking-tight">{item.name} x{item.quantity}</span>
                  <span className="text-xs font-black text-primary tracking-tighter">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Button onClick={() => setIsDetailModalOpen(false)} className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">Entendido</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
