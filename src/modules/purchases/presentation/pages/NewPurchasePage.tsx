import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Package, 
  Trash2, 
  ArrowLeft, 
  FileText, 
  Printer, 
  Download,
  PlusCircle,
  Building2,
  Calendar
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

const mockProducts = [
  { id: 'P1', name: 'Guantes Quirúrgicos', unit: 'Caja x100', price: 12.50 },
  { id: 'P2', name: 'Jeringas 5ml', unit: 'Caja x50', price: 8.00 },
  { id: 'P3', name: 'Gasas Estériles', unit: 'Paquete', price: 2.50 },
  { id: 'P4', name: 'Suero Fisiológico', unit: 'Litro', price: 4.20 },
  { id: 'P5', name: 'Botox Botoxine', unit: 'Vial', price: 180.00 },
];

export const NewPurchasePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [supplier, setSupplier] = useState('Medical Supplies Co.');

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col gap-6 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/purchases')}
            className="h-9 w-9 p-0 rounded-lg border border-slate-200"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-800">Nueva Orden de Compra</h1>
            <p className="text-[11px] text-muted-foreground font-medium">Configure los items para reponer inventario.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/purchases')}
            className="h-9 px-4 rounded-lg border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-wider"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => setIsPdfModalOpen(true)}
            disabled={cart.length === 0}
            className="h-9 px-6 rounded-lg bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Finalizar y Generar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Proveedor</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                  <select 
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-[11px] font-semibold outline-none focus:border-indigo-300"
                  >
                    <option>Medical Supplies Co.</option>
                    <option>Esthetic Pharma</option>
                    <option>Equipos Médicos S.A.</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Fecha Programada</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                  <input type="date" defaultValue="2024-05-20" className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-[11px] font-semibold outline-none focus:border-indigo-300" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Buscar producto en inventario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/30 text-sm font-medium outline-none focus:border-indigo-200 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                {mockProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{product.name}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{product.unit} • ${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => addToCart(product)}
                      variant="ghost" 
                      className="h-8 w-8 p-0 rounded-lg text-indigo-600 hover:bg-indigo-100"
                    >
                      <PlusCircle size={20} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cart List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col h-full min-h-[500px]">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
              <ShoppingCart size={18} className="text-slate-900" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Lista de Compra</h3>
              <Badge className="ml-auto bg-slate-100 text-slate-600 font-bold rounded-lg px-2">{cart.length}</Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-1">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                      <ShoppingCart size={32} />
                    </div>
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">El carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] font-medium text-slate-400 uppercase">{item.unit}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-destructive transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <button className="px-2 py-1 text-slate-400 hover:bg-slate-50">-</button>
                            <span className="px-3 py-1 text-xs font-bold text-slate-700 border-x border-slate-200">{item.quantity}</span>
                            <button className="px-2 py-1 text-slate-400 hover:bg-slate-50">+</button>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">UND</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-slate-100 space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Estimado</span>
                <span className="text-xl font-black text-indigo-600">${total.toFixed(2)}</span>
              </div>
              <Button 
                onClick={() => setIsPdfModalOpen(true)}
                disabled={cart.length === 0}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Confirmar y Generar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Generation Modal */}
      <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
        <DialogContent className="max-w-4xl rounded-xl p-0 border border-slate-200 shadow-2xl overflow-hidden bg-slate-100">
          <div className="flex flex-col h-[85vh]">
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Previsualización Orden de Compra</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-white"><Printer size={16} /></Button>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-white"><Download size={16} /></Button>
                <Button onClick={() => setIsPdfModalOpen(false)} variant="ghost" className="h-8 px-4 text-[10px] font-bold uppercase hover:bg-white/10 text-white">Cerrar</Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 flex justify-center custom-scrollbar">
              <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] relative text-slate-800 flex flex-col">
                <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase mb-1 tracking-tighter">Group V&V Clinic</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orden de Compra / Reabastecimiento</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-900 uppercase mb-1">Orden No.</p>
                    <p className="text-sm font-bold text-slate-400">#PO-2024-0042</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-10">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Proveedor</p>
                    <p className="text-sm font-bold text-slate-800">{supplier}</p>
                    <p className="text-[10px] font-medium text-slate-500">contacto@proveedor.com</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Emisión</p>
                    <p className="text-sm font-bold text-slate-800">12 de Mayo, 2024</p>
                  </div>
                </div>

                <div className="flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-900">
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest">Descripción</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Unidad</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Cant.</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right">Precio</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 text-xs font-bold text-slate-800">{item.name}</td>
                          <td className="py-4 text-[10px] font-medium text-slate-500 text-center">{item.unit}</td>
                          <td className="py-4 text-xs font-bold text-slate-800 text-center">{item.quantity}</td>
                          <td className="py-4 text-xs font-bold text-slate-800 text-right">${item.price.toFixed(2)}</td>
                          <td className="py-4 text-xs font-bold text-indigo-600 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 border-t-2 border-slate-900 pt-6 flex flex-col items-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400 uppercase">Subtotal</span>
                      <span className="font-bold text-slate-800">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400 uppercase">Impuestos (0%)</span>
                      <span className="font-bold text-slate-800">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="text-sm font-black text-slate-900 uppercase">Total Final</span>
                      <span className="text-lg font-black text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-20 flex justify-between gap-10">
                  <div className="flex-1 border-t border-slate-300 pt-4 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Autorizado por</p>
                    <p className="text-[10px] font-black text-slate-800">ADMINISTRACIÓN GROUP V&V</p>
                  </div>
                  <div className="flex-1 border-t border-slate-300 pt-4 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Firma del Proveedor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
