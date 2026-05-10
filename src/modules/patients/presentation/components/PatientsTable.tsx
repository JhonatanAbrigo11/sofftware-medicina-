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
  Eye, 
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
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-primary/10">
          <TableRow>
            <TableHead className="w-[250px] font-bold text-primary">Paciente</TableHead>
            <TableHead className="font-bold text-primary">Identificación</TableHead>
            <TableHead className="font-bold text-primary">Contacto</TableHead>
            <TableHead className="font-bold text-primary">Última Visita</TableHead>
            <TableHead className="font-bold text-primary">Estado</TableHead>
            <TableHead className="text-right font-bold text-primary">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="group">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {patient.firstName} {patient.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">
                      {patient.gender}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {patient.documentId}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" strokeWidth={1.5} />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" strokeWidth={1.5} />
                      {patient.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {patient.lastVisit}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-lg border-primary bg-primary/5 hover:bg-primary/10 text-primary shadow-sm"
                      onClick={() => {
                        console.log('Navigating to record for patient:', patient.id);
                        navigate(`/medical-record/${patient.id}`);
                      }}
                      title="Ver Ficha Médica"
                    >
                      <FileText className="h-5 w-5" strokeWidth={1.5} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-lg border-primary/20 bg-white hover:bg-primary/5 text-primary shadow-sm"
                      title="Editar"
                    >
                      <Pencil className="h-5 w-5" strokeWidth={1.5} />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-primary/10 hover:bg-primary/5 hover:text-primary">
                          <MoreHorizontal className="h-4.5 w-4.5" strokeWidth={1.5} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl w-48">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="rounded-lg m-1 cursor-pointer"
                          onClick={() => navigate(`/medical-record/${patient.id}`)}
                        >
                          <FileText className="mr-2 h-4 w-4" strokeWidth={1.5} />
                          Ver Ficha Médica
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg m-1 cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" strokeWidth={1.5} />
                          Editar Datos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg m-1 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" strokeWidth={1.5} />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No se encontraron pacientes.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
