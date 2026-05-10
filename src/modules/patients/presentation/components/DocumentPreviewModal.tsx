import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Download, Maximize2, FileText, User, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    name: string;
    fileUrl: string;
    category: string;
    date: string;
  } | null;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document
}) => {
  if (!document) return null;

  const isImage = document.category === 'Imagen';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col border-none bg-black/5 backdrop-blur-xl">
        <DialogHeader className="p-4 bg-white border-b flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-bold truncate pr-8 flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-primary" />
            {document.name}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-lg" asChild>
              <a href={document.fileUrl} download>
                <Download className="h-4 w-4" />
                Descargar
              </a>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-8 flex items-start justify-center bg-slate-500/10">
          {isImage ? (
            <div className="flex items-center justify-center min-h-full">
              <img 
                src={document.fileUrl} 
                alt={document.name} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          ) : (
            /* PDF Simulation (1 Page) */
            <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1000px] p-16 flex flex-col rounded-sm border relative">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg]">
                <FileText size={400} />
              </div>

              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-primary pb-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
                  <div>
                    <h2 className="text-2xl font-black text-primary tracking-tighter uppercase">MediPlus Pro</h2>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Clínica de Especialidades Estéticas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{document.category.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">ID DOC: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-2 gap-8 mb-12 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Paciente</p>
                  <p className="text-sm font-bold flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Alejandro García</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Fecha de Emisión</p>
                  <p className="text-sm font-bold flex items-center gap-2 justify-end"><Calendar className="h-4 w-4 text-primary" /> {document.date}</p>
                </div>
              </div>

              {/* Main Content Title */}
              <h1 className="text-xl font-bold text-slate-900 mb-6 text-center border-b pb-4">{document.name}</h1>

              {/* Mock Content Text */}
              <div className="flex-1 space-y-6 text-slate-700 text-sm leading-relaxed text-justify">
                <p>
                  Yo, Alejandro García, mayor de edad e identificado conforme al registro médico, por medio del presente documento manifiesto que he sido informado de manera clara y detallada sobre los procedimientos, riesgos y beneficios de la intervención quirúrgica programada.
                </p>
                <p>
                  El Dr. Santiago Mendoza ha explicado detalladamente la técnica de <strong>Rinoplastia Estética</strong>, aclarando mis dudas sobre el periodo de recuperación, posibles inflamaciones y cuidados post-operatorios necesarios para garantizar el éxito del procedimiento estético.
                </p>
                <p>
                  Certifico que no he omitido información relevante sobre mi historial médico, alergias o consumo de sustancias que puedan interferir con la anestesia o la cirugía. Entiendo que los resultados estéticos pueden variar según la fisionomía individual.
                </p>
                
                <div className="mt-12 space-y-4">
                  <div className="h-px bg-slate-200 w-full"></div>
                  <div className="h-px bg-slate-200 w-full"></div>
                  <div className="h-px bg-slate-200 w-full"></div>
                  <div className="h-px bg-slate-200 w-full"></div>
                </div>
              </div>

              {/* Footer Signature Area */}
              <div className="mt-20 flex justify-between gap-12">
                <div className="flex-1 border-t border-slate-300 pt-4 text-center">
                  <p className="text-sm font-bold text-slate-800">Firma del Paciente</p>
                  <p className="text-[10px] text-muted-foreground">C.C. 1020304050</p>
                </div>
                <div className="flex-1 border-t border-slate-300 pt-4 text-center relative">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-40">
                    <ShieldCheck size={48} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Firma Médico Responsable</p>
                  <p className="text-[10px] text-muted-foreground">Dr. Santiago Mendoza - Reg. 74829</p>
                </div>
              </div>
              
              <div className="mt-12 text-center text-[10px] text-muted-foreground border-t pt-4">
                Este es un documento digital generado por MediPlus Pro. La validez de este registro está sujeta a la firma física o digital en el expediente original.
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
