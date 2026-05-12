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
    <div className="relative space-y-12 before:absolute before:inset-0 before:ml-[1.25rem] before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-primary/40 before:via-primary/20 before:to-transparent">
      {records.length > 0 ? (
        records.map((record) => (
          <div key={record.id} className="relative flex items-start gap-8 group">
            {/* Dot & Icon */}
            <div className="absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-white bg-white shadow-xl shadow-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 z-10">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-xl text-white shadow-inner",
                record.type === 'Consulta' ? 'bg-blue-500' :
                record.type === 'Cirugía' ? 'bg-purple-500' :
                record.type === 'Seguimiento' ? 'bg-emerald-500' :
                'bg-amber-500'
              )}>
                {getTypeIcon(record.type)}
              </div>
            </div>

            {/* Content Card */}
            <div className="ml-16 flex-1 rounded-xl border border-white bg-white/40 p-8 shadow-xl shadow-primary/5 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:bg-white/80 hover:scale-[1.01] group/card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em]", getTypeColor(record.type))}>
                      {record.type}
                    </Badge>
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock className="h-3 w-3" />
                      {record.time}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-foreground leading-tight group-hover/card:text-primary transition-colors duration-300">
                    {record.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/50 backdrop-blur-sm">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Atendido por</span>
                    <span className="text-sm font-black text-primary/80">{record.doctor}</span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden p-6 rounded-xl bg-white shadow-inner border border-primary/5">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-primary/20" />
                <p className="text-sm font-medium text-muted-foreground leading-relaxed italic pl-2">
                  "{record.summary}"
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-primary/5 pt-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold">
                  <Calendar className="h-3.5 w-3.5" />
                  {record.date}
                </div>
                
                <button className="group/btn flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-all">
                  Ver detalles completos
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 group-hover/btn:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-muted-foreground font-bold italic bg-secondary/20 rounded-xl border-2 border-dashed border-primary/10">
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
