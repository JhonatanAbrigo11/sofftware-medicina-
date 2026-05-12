import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Tag, 
  MoreVertical, 
  ChevronRight,
  TrendingUp,
  Info,
  Filter,
  Layers,
  Zap,
  Target,
  PlusCircle,
  BarChart3
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { PageHeader } from '@/shared/components/PageHeader';

interface Treatment {
  id: string;
  name: string;
  category: 'Inyectables' | 'Facial' | 'Corporal' | 'Láser';
  baseCost: number;
  price: number;
  duration: string;
  margin: number;
  status: 'Activo' | 'Deshabilitado';
}

const mockTreatments: Treatment[] = [
  {
    id: 'T1',
    name: 'Toxina Botulínica (3 Zonas)',
    category: 'Inyectables',
    baseCost: 150,
    price: 350,
    duration: '30 min',
    margin: 57,
    status: 'Activo'
  },
  {
    id: 'T2',
    name: 'Rinomodelación con Ácido Hialurónico',
    category: 'Inyectables',
    baseCost: 200,
    price: 450,
    duration: '45 min',
    margin: 55,
    status: 'Activo'
  },
  {
    id: 'T3',
    name: 'Bioestimulador de Colágeno (Radiesse)',
    category: 'Inyectables',
    baseCost: 300,
    price: 650,
    duration: '60 min',
    margin: 53,
    status: 'Activo'
  },
  {
    id: 'T4',
    name: 'Peeling Químico Médico',
    category: 'Facial',
    baseCost: 40,
    price: 120,
    duration: '30 min',
    margin: 66,
    status: 'Activo'
  },
  {
    id: 'T5',
    name: 'HIFU Facial Completo',
    category: 'Láser',
    baseCost: 120,
    price: 800,
    duration: '90 min',
    margin: 85,
    status: 'Activo'
  },
  {
    id: 'T6',
    name: 'Lipopapada Enzimática',
    category: 'Corporal',
    baseCost: 80,
    price: 250,
    duration: '30 min',
    margin: 68,
    status: 'Activo'
  }
];

export const TreatmentsPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = mockTreatments.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500 font-sans">
      <PageHeader 
        title="Protocolos y Tratamientos"
        subtitle="Gestión de Medicina Estética Dream Skin"
        icon={Sparkles}
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex h-11 px-6 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary">
              <Filter size={14} className="text-primary" /> Categorías
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <PlusCircle size={16} /> Nuevo Protocolo
            </Button>
          </>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="p-1.5 bg-secondary/50 backdrop-blur-md rounded-[2rem] border border-border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <TabsList className="bg-transparent h-12 p-0 gap-1 w-full md:w-auto">
            <TabsTrigger 
              value="list" 
              className="flex-1 md:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all whitespace-nowrap"
            >
              <Layers className="h-4 w-4 mr-2" />
              Catálogo
            </TabsTrigger>
            <TabsTrigger 
              value="costs" 
              className="flex-1 md:flex-none rounded-xl px-10 h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all whitespace-nowrap"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Rentabilidad
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-80 px-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
            <input 
              type="text" 
              placeholder="Buscar procedimiento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-[11px] font-bold outline-none focus:border-primary/30 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* List View Content */}
        <TabsContent value="list" className="mt-0 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-[2.5rem] border border-border p-8 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.03] transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest bg-secondary/30 text-primary border-border px-4 py-1">
                    {treatment.category}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical size={18} className="text-muted-foreground" />
                  </Button>
                </div>

                <h3 className="text-lg font-black text-foreground tracking-tight mb-6 uppercase">{treatment.name}</h3>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-border/50 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} className="text-primary" /> Duración
                    </span>
                    <span className="text-xs font-black text-foreground">{treatment.duration}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 justify-end">
                      <Tag size={12} className="text-primary" /> ID
                    </span>
                    <span className="text-xs font-black text-foreground">{treatment.id}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Inversión Paciente</span>
                    <span className="text-2xl font-black text-foreground tracking-tighter leading-none">${treatment.price}</span>
                  </div>
                  <Button variant="ghost" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-secondary gap-2">
                    Detalles <ChevronRight size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Costs Analysis Content */}
        <TabsContent value="costs" className="mt-0 outline-none">
          <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-secondary/20 border-b border-border">
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Procedimiento</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Costo Base</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">PVP Sugerido</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Margen Neto</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Estado</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredTreatments.map((treatment, idx) => (
                    <motion.tr 
                      key={treatment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-secondary/10 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center font-black text-[10px] text-primary border border-border shadow-sm">
                            {treatment.id}
                          </div>
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">{treatment.name}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-muted-foreground tracking-tighter">${treatment.baseCost}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-base font-black text-foreground tracking-tighter">${treatment.price}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-secondary rounded-full w-24 overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full" 
                              style={{ width: `${treatment.margin}%` }} 
                            />
                          </div>
                          <span className="text-[11px] font-black text-emerald-600">{treatment.margin}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <Badge variant="outline" className="rounded-lg text-[9px] font-black uppercase tracking-widest border-success/20 text-success bg-success/5 px-4 py-1">
                          {treatment.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100">
                          <TrendingUp size={18} className="text-muted-foreground" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 bg-indigo-50/30 rounded-[2.5rem] border border-indigo-100/50 group hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h4 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Tratamiento Estrella</h4>
              </div>
              <p className="text-xs font-black text-indigo-800 mb-4 uppercase">HIFU Facial Completo</p>
              <Badge className="bg-indigo-600 text-white border-none text-[9px] font-black uppercase px-4 py-1 rounded-lg">85% MARGEN BRUTO</Badge>
            </div>

            <div className="p-8 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100/50 group hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h4 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Mayor Rotación</h4>
              </div>
              <p className="text-xs font-black text-emerald-800 mb-4 uppercase">Botox 3 Zonas</p>
              <Badge className="bg-emerald-600 text-white border-none text-[9px] font-black uppercase px-4 py-1 rounded-lg">ALTA DEMANDA OPERATIVA</Badge>
            </div>

            <div className="p-8 bg-amber-50/30 rounded-[2.5rem] border border-amber-100/50 group hover:border-amber-200 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Alerta de Optimización</h4>
              </div>
              <p className="text-xs font-black text-amber-800 mb-4 uppercase">Revisar proveedores de Rellenos.</p>
              <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                MARGEN ACTUAL: 53% <ArrowRight size={12} /> OBJETIVO 65%
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="py-10 text-center opacity-20">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">DREAM SKIN • AESTHETIC PROTOCOLS</p>
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
