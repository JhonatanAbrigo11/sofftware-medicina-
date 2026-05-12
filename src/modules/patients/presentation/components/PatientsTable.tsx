import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { 
  Pencil, 
  Trash2, 
  MoreHorizontal,
  Mail,
  Phone
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/shared/components/ui/dropdown-menu';
import { usePatientStore } from '@/store/usePatientStore';
import type { Patient } from '@/modules/patients/domain/entities/Patient';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { cn } from '@/shared/utils';

export const PatientsTable = () => {
  const filteredPatients = usePatientStore((state) => state.getFilteredPatients());
  const navigate = useNavigate();

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Activo':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'Inactivo':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400';
      case 'En Seguimiento':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/5">
      <Table>
        <TableHeader className="bg-secondary/50 border-b border-primary/5">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-8 py-6 font-black text-primary uppercase tracking-[0.2em] text-[10px]">Paciente</TableHead>
            <TableHead className="px-8 py-6 font-black text-primary uppercase tracking-[0.2em] text-[10px]">Identificación</TableHead>
            <TableHead className="px-8 py-6 font-black text-primary uppercase tracking-[0.2em] text-[10px]">Contacto</TableHead>
            <TableHead className="px-8 py-6 font-black text-primary uppercase tracking-[0.2em] text-[10px]">Última Visita</TableHead>
            <TableHead className="px-8 py-6 font-black text-primary uppercase tracking-[0.2em] text-[10px]">Estado</TableHead>
            <TableHead className="px-8 py-6 text-right font-black text-primary uppercase tracking-[0.2em] text-[10px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="group border-b border-primary/5 hover:bg-white transition-all duration-300">
                <TableCell className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform duration-300">
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-foreground text-base group-hover:text-primary transition-colors duration-300">
                        {patient.firstName} {patient.lastName}
                      </span>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {patient.gender}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-6 font-mono text-xs font-bold text-muted-foreground">
                  {patient.documentId}
                </TableCell>
                <TableCell className="px-8 py-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 text-primary/60" strokeWidth={2.5} />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 text-primary/60" strokeWidth={2.5} />
                      {patient.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-6 text-sm font-black text-foreground/80">
                  {patient.lastVisit}
                </TableCell>
                <TableCell className="px-8 py-6">
                  <Badge className={cn(
                    "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    getStatusColor(patient.status)
                  )}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3 items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-12 w-12 rounded-2xl border-primary/10 bg-primary/5 hover:bg-primary hover:text-white text-primary shadow-lg shadow-primary/5 transition-all duration-300"
                      onClick={() => navigate(`/medical-record/${patient.id}`)}
                      title="Ver Ficha Médica"
                    >
                      <FileText className="h-5 w-5" strokeWidth={2.5} />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-secondary transition-all">
                          <MoreHorizontal className="h-5 w-5" strokeWidth={2.5} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-[1.5rem] w-56 p-2 shadow-2xl border-white/50 backdrop-blur-xl bg-white/90">
                        <DropdownMenuLabel className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Opciones de Paciente</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem 
                          className="rounded-xl px-4 py-3 cursor-pointer font-bold text-sm focus:bg-primary/5 focus:text-primary transition-colors"
                          onClick={() => navigate(`/medical-record/${patient.id}`)}
                        >
                          <FileText className="mr-3 h-4 w-4" strokeWidth={2.5} />
                          Abrir Ficha Médica
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl px-4 py-3 cursor-pointer font-bold text-sm focus:bg-primary/5 focus:text-primary transition-colors">
                          <Pencil className="mr-3 h-4 w-4" strokeWidth={2.5} />
                          Editar Información
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-xl px-4 py-3 cursor-pointer font-bold text-sm transition-colors">
                          <Trash2 className="mr-3 h-4 w-4" strokeWidth={2.5} />
                          Eliminar Registro
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-40 text-center text-muted-foreground font-black uppercase tracking-widest text-xs italic">
                No se han encontrado registros de pacientes
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
