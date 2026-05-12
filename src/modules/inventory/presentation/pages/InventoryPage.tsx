import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Calendar, 
  History, 
  Droplets,
  Home,
  Sparkles,
  AlertCircle,
  Download,
  PlusCircle,
  TrendingDown,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { PageHeader } from '@/shared/components/PageHeader';
import { cn } from '@/shared/utils';

interface Batch {
  id: string;
  quantity: number;
  expirationDate: string;
  entryDate: string;
}

interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicina Estética' | 'Casa de Reposo' | 'Lavandería';
  stock: number;
  unit: string;
  minStock: number;
  batches: Batch[];
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Toxina Botulínica (Botox) 100U',
    category: 'Medicina Estética',
    stock: 12,
    unit: 'Viales',
    minStock: 5,
    batches: [
      { id: 'B-001', quantity: 5, entryDate: '2024-01-10', expirationDate: '2024-06-30' },
      { id: 'B-002', quantity: 7, entryDate: '2024-03-15', expirationDate: '2024-12-15' }
    ]
  },
  {
    id: '2',
    name: 'Ácido Hialurónico - Juvederm Ultra 4',
    category: 'Medicina Estética',
    stock: 3,
    unit: 'Jeringas',
    minStock: 10,
    batches: [
      { id: 'H-099', quantity: 3, entryDate: '2024-02-20', expirationDate: '2024-05-20' }
    ]
  },
  {
    id: '3',
    name: 'Sábanas Algodón Premium (Juego)',
    category: 'Casa de Reposo',
    stock: 45,
    unit: 'Sets',
    minStock: 20,
    batches: [
      { id: 'CR-102', quantity: 45, entryDate: '2024-01-05', expirationDate: 'N/A' }
    ]
  },
  {
    id: '4',
    name: 'Detergente Hipoalergénico Industrial',
    category: 'Lavandería',
    stock: 8,
    unit: 'Bidones 20L',
    minStock: 10,
    batches: [
      { id: 'L-55', quantity: 8, entryDate: '2024-04-01', expirationDate: '2025-04-01' }
    ]
  }
];

export const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [activeCategory, setActiveCategory] = useState<'All' | InventoryItem['category']>('All');

  const filteredItems = activeCategory === 'All' 
    ? mockInventory 
    : mockInventory.filter(item => item.category === activeCategory);

  const lowStockItems = mockInventory.filter(i => i.stock <= i.minStock);
  const totalAlerts = lowStockItems.length;

  const stats = [
    { label: 'Total Insumos', value: mockInventory.length, icon: Package, color: 'text-primary bg-primary/5' },
    { label: 'Stock Bajo', value: lowStockItems.length, icon: TrendingDown, color: 'text-warning bg-warning/5' },
    { label: 'Vencimientos', value: '2', icon: AlertCircle, color: 'text-destructive bg-destructive/5' },
    { label: 'Valorización', value: '$12,450', icon: History, color: 'text-success bg-success/5' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Inventario y Suministros"
        subtitle="Control Operativo y Trazabilidad FIFO"
        icon={Package}
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex h-11 px-6 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary">
              <Download size={14} className="text-primary" /> Exportar Reporte
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <PlusCircle size={16} /> Añadir Insumo
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
        <div className="p-1.5 bg-secondary/50 backdrop-blur-md rounded-[2rem] border border-border mb-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <TabsList className="bg-transparent h-12 p-0 gap-1 w-full lg:w-auto">
            <TabsTrigger 
              value="inventory" 
              className="flex-1 lg:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap"
            >
              Stock General
            </TabsTrigger>
            <TabsTrigger 
              value="alerts" 
              className="flex-1 lg:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-destructive data-[state=active]:text-white data-[state=active]:shadow-sm transition-all whitespace-nowrap relative"
            >
              Alertas Críticas
              {totalAlerts > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-[9px] font-black text-primary-foreground border-2 border-white">
                  {totalAlerts}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 w-full lg:w-auto pr-2">
            {activeTab === 'inventory' && (
              <div className="hidden lg:flex items-center gap-1">
                {['All', 'Medicina Estética', 'Casa de Reposo', 'Lavandería'].map((cat) => (
                  <Button
                    key={cat}
                    variant="ghost"
                    onClick={() => setActiveCategory(cat as any)}
                    className={cn(
                      "h-9 rounded-xl px-4 text-[9px] font-black uppercase tracking-wider transition-all",
                      activeCategory === cat ? "bg-white text-primary shadow-sm border border-border" : "text-muted-foreground hover:bg-white/50"
                    )}
                  >
                    {cat === 'All' ? 'Todos' : cat}
                  </Button>
                ))}
              </div>
            )}
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
              <input 
                type="text" 
                placeholder="Filtrar inventario..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        <TabsContent value="inventory" className="outline-none">
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary/20 border-b border-border">
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Insumo</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Stock Disponible</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Protocolo FIFO</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Próx. Vencimiento</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredItems.map((item, idx) => {
                    const isLowStock = item.stock <= item.minStock;
                    const nextExpiration = item.batches[0];

                    return (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="group hover:bg-secondary/10 transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className={cn(
                              "h-11 w-11 rounded-xl flex items-center justify-center border border-border shadow-sm",
                              item.category === 'Medicina Estética' ? 'bg-indigo-50 text-indigo-600' : 
                              item.category === 'Casa de Reposo' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                            )}>
                              {item.category === 'Medicina Estética' ? <Sparkles size={18} /> : 
                               item.category === 'Casa de Reposo' ? <Home size={18} /> : <Droplets size={18} />}
                            </div>
                            <div>
                              <p className="text-sm font-black text-foreground uppercase tracking-tight">{item.name}</p>
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{item.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <span className={cn("text-lg font-black tracking-tighter", isLowStock ? "text-warning" : "text-foreground")}>
                              {item.stock} <span className="text-[9px] text-muted-foreground uppercase ml-1 font-black tracking-widest">{item.unit}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex justify-center gap-1.5">
                            {item.batches.map((batch, bIdx) => (
                              <div key={batch.id} className={cn("h-5 w-1.5 rounded-full", bIdx === 0 ? "bg-primary" : "bg-slate-200")} />
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <Calendar size={14} className="text-muted-foreground/40" />
                            <span className="text-[11px] font-black text-foreground uppercase tracking-tight">
                              {nextExpiration?.expirationDate || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
                            <MoreVertical size={18} className="text-muted-foreground" />
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="px-4 text-[10px] font-black text-destructive uppercase tracking-[0.3em] flex items-center gap-3">
                <AlertCircle size={18} /> Vencimientos Próximos
              </h3>
              <div className="space-y-4">
                {mockInventory.slice(0, 2).map(item => (
                  <motion.div 
                    key={item.id}
                    className="p-6 bg-white border border-border rounded-[2rem] shadow-sm flex items-center justify-between group hover:border-destructive/20 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-xl bg-destructive/5 text-destructive flex items-center justify-center border border-destructive/10">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-foreground uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] text-destructive font-black uppercase tracking-widest mt-1">Lote {item.batches[0].id} • Vence en 9 días</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/5">Gestionar</Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="px-4 text-[10px] font-black text-warning uppercase tracking-[0.3em] flex items-center gap-3">
                <TrendingDown size={18} /> Reposición Requerida
              </h3>
              <div className="space-y-4">
                {mockInventory.filter(i => i.stock <= i.minStock).map(item => (
                  <motion.div 
                    key={item.id}
                    className="p-6 bg-white border border-border rounded-[2rem] shadow-sm flex items-center justify-between group hover:border-warning/20 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-xl bg-warning/5 text-warning flex items-center justify-center border border-warning/10">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-foreground uppercase tracking-tight">{item.name}</p>
                        <p className="text-[9px] text-warning font-black uppercase tracking-widest mt-1">{item.stock} unidades — Debajo del mínimo</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest text-warning hover:bg-warning/5">Pedir Stock</Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="py-10 text-center opacity-20">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">GROUP V&V • INVENTORY LOGISTICS</p>
      </div>
    </div>
  );
};
