import React from 'react';
import { cn } from '@/shared/utils';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/shared/components/ui/tabs';
import { 
  User, 
  FileText, 
  Stethoscope, 
  CreditCard, 
  Calendar,
  ArrowLeft,
  ChevronRight,
  Save,
  DollarSign,
  Receipt,
  Plus,
  Clock3,
  Files,
  Download,
  Upload,
  Eye,
  FileImage,
  FileText as FileIcon
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { usePatientStore } from '@/store/usePatientStore';
import { motion } from 'framer-motion';
import { PatientPersonalForm } from '../components/PatientPersonalForm';
import { ClinicalTimeline } from '../components/ClinicalTimeline';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';

export const MedicalRecordPage = () => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<{ name: string; fileUrl: string; category: string; date: string } | null>(null);

  const handlePreview = (doc: { name: string; fileUrl: string; category: string; date: string }) => {
    setSelectedDoc(doc);
    setIsPreviewOpen(true);
  };
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find((p) => p.id === id);

  const getClinicalHistory = usePatientStore((state) => state.getClinicalHistory);
  const getPrescriptions = usePatientStore((state) => state.getPrescriptions);
  const getAestheticTreatments = usePatientStore((state) => state.getAestheticTreatments);
  
  const getAccountsReceivable = usePatientStore((state) => state.getAccountsReceivable);
  const getAppointments = usePatientStore((state) => state.getAppointments);
  const getDocuments = usePatientStore((state) => state.getDocuments);
  
  const clinicalRecords = id ? getClinicalHistory(id) : [];
  const prescriptions = id ? getPrescriptions(id) : [];
  const treatments = id ? getAestheticTreatments(id) : [];
  const accounts = id ? getAccountsReceivable(id) : [];
  const appointments = id ? getAppointments(id) : [];
  const allDocuments = id ? getDocuments(id) : [];

  if (!patient) return <div className="p-8 text-center">Paciente no encontrado (ID: {id})</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate('/patients')} className="hover:text-primary transition-colors">Pacientes</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Ficha Médica</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => navigate('/patients')}>
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{patient.firstName} {patient.lastName}</h1>
              <p className="text-muted-foreground">ID: <span className="font-mono">{patient.documentId}</span> • {patient.gender}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigator */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 gap-6">
          <TabsTrigger value="personal" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 gap-2">
            <User className="h-4 w-4" strokeWidth={1.5} />
            Datos Personales
          </TabsTrigger>
          <TabsTrigger value="clinical" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 gap-2">
            <FileText className="h-4 w-4" strokeWidth={1.5} />
            Ficha Clínica
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 gap-2">
            <DollarSign className="h-4 w-4" strokeWidth={1.5} />
            Cuentas por Cobrar
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 gap-2">
            <Files className="h-4 w-4" strokeWidth={1.5} />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none h-full px-4 gap-2">
            <Calendar className="h-4 w-4" strokeWidth={1.5} />
            Citas
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <User className="h-5 w-5" strokeWidth={1.5} />
                    Información Personal
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Actualiza los datos básicos y de contacto del paciente.
                  </p>
                </div>
                <Button 
                  type="submit" 
                  form="patient-personal-form" 
                  className="gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20"
                >
                  <Save className="h-4 w-4" strokeWidth={1.5} />
                  Guardar Cambios
                </Button>
              </div>
              <PatientPersonalForm patient={patient} />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="clinical">
            <div className="p-8 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="w-full justify-start bg-slate-100/50 p-1 rounded-xl h-11 mb-8 gap-2">
                  <TabsTrigger value="history" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Historia Clínica
                  </TabsTrigger>
                  <TabsTrigger value="treatments-sub" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Tratamientos
                  </TabsTrigger>
                  <TabsTrigger value="prescriptions" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Recetas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="history">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-xl font-bold text-primary">Cronología Clínica</h3>
                      <p className="text-sm text-muted-foreground">Historial de cirugías y consultas.</p>
                    </div>
                    <Button className="gap-2 rounded-xl">
                      <Stethoscope className="h-4 w-4" strokeWidth={1.5} />
                      Nueva Atención
                    </Button>
                  </div>
                  <ClinicalTimeline records={clinicalRecords} />
                </TabsContent>

                <TabsContent value="treatments-sub">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary mb-6">Tratamientos Estéticos</h3>
                    {treatments.map((t) => (
                      <div key={t.id} className="p-4 rounded-xl border bg-white flex items-center justify-between shadow-sm">
                        <div>
                          <p className="font-bold text-foreground">{t.name}</p>
                          <p className="text-sm text-muted-foreground">{t.area} • {t.date}</p>
                        </div>
                        <Badge variant="outline" className={t.status === 'Completado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}>
                          {t.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="prescriptions">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary mb-6">Recetas Médicas</h3>
                    {prescriptions.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl border bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-bold text-foreground text-lg">{p.medication}</p>
                          <span className="text-xs text-muted-foreground">{p.date}</span>
                        </div>
                        <p className="text-sm font-medium text-primary mb-1">{p.dosage}</p>
                        <p className="text-sm text-muted-foreground italic">"{p.instructions}"</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>


          <TabsContent value="billing">
            <div className="p-8 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Receipt className="h-5 w-5" strokeWidth={1.5} />
                    Estado de Cuenta
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gestión de pagos y saldos pendientes.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-center">
                    <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Total Pendiente</p>
                    <p className="text-xl font-bold text-red-700">
                      ${accounts.reduce((acc, curr) => acc + curr.pendingAmount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Concepto</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Pagado</th>
                      <th className="px-6 py-4">Pendiente</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {accounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-muted-foreground">{acc.date}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-700">{acc.concept}</p>
                          <Badge variant="outline" className={acc.status === 'Pendiente' ? 'bg-red-50 text-red-600 text-[10px]' : 'bg-amber-50 text-amber-600 text-[10px]'}>
                            {acc.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">${acc.totalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-emerald-600 font-medium">${acc.paidAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-red-600 font-bold">${acc.pendingAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2 rounded-lg h-9">
                            <DollarSign className="h-4 w-4" />
                            Pagar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="p-8 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Files className="h-5 w-5" strokeWidth={1.5} />
                    Gestión de Documentos
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Historial de consentimientos, exámenes y registros fotográficos.
                  </p>
                </div>
                <Button className="gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                  <Upload className="h-4 w-4" strokeWidth={1.5} />
                  Subir Documento
                </Button>
              </div>

              <Tabs defaultValue="consent" className="w-full">
                <TabsList className="w-full justify-start bg-slate-100/50 p-1 rounded-xl h-11 mb-8 gap-2">
                  <TabsTrigger value="consent" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Consentimientos
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Exámenes
                  </TabsTrigger>
                  <TabsTrigger value="images" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Imágenes
                  </TabsTrigger>
                </TabsList>

                {['Consentimiento', 'Examen', 'Imagen'].map((cat) => (
                  <TabsContent key={cat} value={cat === 'Consentimiento' ? 'consent' : cat === 'Examen' ? 'exams' : 'images'}>
                    <div className={cn(
                      "grid gap-4",
                      cat === 'Imagen' ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"
                    )}>
                      {allDocuments.filter(d => d.category === cat).length > 0 ? (
                        allDocuments.filter(d => d.category === cat).map((doc) => (
                          <div key={doc.id} className={cn(
                            "group border rounded-2xl bg-white transition-all hover:shadow-md hover:border-primary/20",
                            cat === 'Imagen' ? "flex flex-col" : "flex items-center justify-between p-4"
                          )}>
                            {cat === 'Imagen' ? (
                              <>
                                <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                                  <img src={doc.fileUrl} alt={doc.name} className="object-cover w-full h-full" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button 
                                      size="icon" 
                                      variant="secondary" 
                                      className="rounded-full h-9 w-9"
                                      onClick={() => handlePreview(doc)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="rounded-full h-9 w-9">
                                      <a href={doc.fileUrl} download><Download className="h-4 w-4" /></a>
                                    </Button>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <p className="text-sm font-bold truncate">{doc.name}</p>
                                  <p className="text-[10px] text-muted-foreground">{doc.date} • {doc.fileSize}</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-4">
                                  <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                                    <FileIcon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">{doc.date} • {doc.fileSize}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2 text-primary hover:bg-primary/5 rounded-lg"
                                    onClick={() => handlePreview(doc)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    Ver
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/5">
                                    <a href={doc.fileUrl} download><Download className="h-4 w-4" /></a>
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-2xl border border-dashed italic">
                          No hay {cat.toLowerCase()}s registrados.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="p-8 rounded-2xl border bg-white/40 backdrop-blur-sm shadow-sm">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Calendar className="h-5 w-5" strokeWidth={1.5} />
                    Gestión de Citas
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Historial y próximas citas programadas.
                  </p>
                </div>
                <Button className="gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                  Nueva Cita
                </Button>
              </div>

              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((apt) => (
                    <div key={apt.id} className="group relative p-6 rounded-2xl border bg-white hover:border-primary/30 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          {/* Date Block */}
                          <div className="flex flex-col items-center justify-center h-16 w-16 rounded-xl bg-primary/5 text-primary border border-primary/10">
                            <span className="text-xs font-bold uppercase">{apt.date.split('-')[1]}</span>
                            <span className="text-2xl font-black">{apt.date.split('-')[2]}</span>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-slate-800">{apt.reason}</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5" />
                                {apt.doctor}
                              </span>
                              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock3 className="h-3.5 w-3.5" />
                                {apt.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-semibold",
                              apt.status === 'Completada' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              apt.status === 'Pendiente' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              apt.status === 'No asistió' ? 'bg-red-50 text-red-700 border-red-200' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            )}
                          >
                            {apt.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-2xl border border-dashed">
                    No hay citas registradas.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <DocumentPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        document={selectedDoc} 
      />
    </div>
  );
};
