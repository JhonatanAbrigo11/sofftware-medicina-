import React from 'react';
import type { ClinicalRecord } from '@/store/usePatientStore';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Scissors, 
  Activity,
  FileSearch,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';

interface ClinicalTimelineProps {
  records: ClinicalRecord[];
}

export const ClinicalTimeline: React.FC<ClinicalTimelineProps> = ({ records }) => {
  const getTypeIcon = (type: ClinicalRecord['type']) => {
    switch (type) {
      case 'Consulta': return <Stethoscope className="h-4 w-4" />;
      case 'Cirugía': return <Scissors className="h-4 w-4" />;
      case 'Seguimiento': return <Activity className="h-4 w-4" />;
      case 'Examen': return <FileSearch className="h-4 w-4" />;
      default: return <ChevronRight className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: ClinicalRecord['type']) => {
    switch (type) {
      case 'Consulta': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cirugía': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Seguimiento': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Examen': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/10 before:to-transparent">
      {records.length > 0 ? (
        records.map((record, index) => (
          <div key={record.id} className="relative flex items-start gap-6 group">
            {/* Dot & Icon */}
            <div className="absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-white shadow-md transition-all group-hover:scale-110 group-hover:shadow-lg z-10">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-white shadow-inner",
                record.type === 'Consulta' ? 'bg-blue-500' :
                record.type === 'Cirugía' ? 'bg-purple-500' :
                record.type === 'Seguimiento' ? 'bg-emerald-500' :
                'bg-amber-500'
              )}>
                {getTypeIcon(record.type)}
              </div>
            </div>

            {/* Content Card */}
            <div className="ml-14 flex-1 rounded-2xl border bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:bg-white hover:border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={cn("px-2 py-0 text-[10px] uppercase font-bold tracking-wider", getTypeColor(record.type))}>
                      {record.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {record.time}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{record.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                  <User className="h-4 w-4" strokeWidth={1.5} />
                  {record.doctor}
                </div>
              </div>

              <div className="relative">
                <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/10 italic">
                  "{record.summary}"
                </p>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground border-t pt-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary/60" />
                  {record.date}
                </span>
                <button className="ml-auto text-primary font-semibold hover:underline flex items-center gap-1">
                  Ver detalles completos
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground italic bg-slate-50 rounded-2xl border border-dashed">
          No hay registros clínicos disponibles para este paciente.
        </div>
      )}
    </div>
  );
};

// Helper function for cn
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}
