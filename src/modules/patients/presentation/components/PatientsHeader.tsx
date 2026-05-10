import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { 
  Plus, 
  FileDown, 
  Search,
  Users
} from 'lucide-react';
import { usePatientStore } from '@/store/usePatientStore';
import { exportPatientsToPDF } from '../utils/pdf-export';

export const PatientsHeader = () => {
  const { searchQuery, setSearchQuery, patients } = usePatientStore();

  const handleExport = () => {
    exportPatientsToPDF(patients);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
        </div>
        <p className="mt-1 text-muted-foreground">
          Gestiona el listado de pacientes y su información personal.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" strokeWidth={1.5} />
          <Input 
            placeholder="Buscar por nombre o ID..." 
            className="pl-9 h-11 bg-white/50 border-primary/10 focus:bg-white transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="h-11 gap-2"
            onClick={handleExport}
          >
            <FileDown className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">Exportar</span>
          </Button>
          
          <Button className="h-11 gap-2">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            <span>Crear Nuevo</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
