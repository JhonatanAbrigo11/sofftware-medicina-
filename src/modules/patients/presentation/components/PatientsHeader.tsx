import { Button } from '@/shared/components/ui/button';
import { 
  Plus, 
  Search,
  Users,
  Download
} from 'lucide-react';
import { usePatientStore } from '@/store/usePatientStore';
import { exportPatientsToPDF } from '../utils/pdf-export';
import { PageHeader } from '@/shared/components/PageHeader';

export const PatientsHeader = () => {
  const { searchQuery, setSearchQuery, patients } = usePatientStore();

  const handleExport = () => {
    exportPatientsToPDF(patients);
  };

  return (
    <PageHeader 
      title="Pacientes"
      subtitle="Gestión de Listado y Expedientes Clínicos"
      icon={Users}
      actions={
        <>
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
            <input 
              type="text"
              placeholder="Buscar paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-[11px] font-bold outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="h-11 px-5 rounded-xl border-border text-[10px] font-black uppercase tracking-widest gap-2 bg-white hover:bg-secondary"
              onClick={handleExport}
            >
              <Download size={14} className="text-primary" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </Button>
            <Button className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <Plus size={16} />
              <span>Nuevo Paciente</span>
            </Button>
          </div>
        </>
      }
    />
  );
};
