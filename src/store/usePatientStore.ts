import { create } from 'zustand';
import type { Patient } from '@/modules/patients/domain/entities/Patient';

export type ClinicalRecord = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  title: string;
  summary: string;
  type: 'Consulta' | 'Cirugía' | 'Seguimiento' | 'Examen';
};

export type Prescription = {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
  frequency?: string;
  duration?: string;
  notes?: string;
};

export type AestheticTreatment = {
  id: string;
  date: string;
  name: string;
  area: string;
  status: 'Completado' | 'En Proceso' | 'Programado';
};

export type AccountReceivable = {
  id: string;
  date: string;
  concept: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Pagado' | 'Parcial' | 'Pendiente';
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  status: 'Pendiente' | 'Completada' | 'Cancelada';
};

export type PatientDocument = {
  id: string;
  date: string;
  name: string;
  category: string;
  fileUrl: string;
  fileSize: string;
};

interface PatientState {
  patients: Patient[];
  searchQuery: string;
  clinicalHistory: Record<string, ClinicalRecord[]>;
  prescriptions: Record<string, Prescription[]>;
  aestheticTreatments: Record<string, AestheticTreatment[]>;
  accountsReceivable: Record<string, AccountReceivable[]>;
  appointments: Record<string, Appointment[]>;
  documents: Record<string, PatientDocument[]>;
  setSearchQuery: (query: string) => void;
  getFilteredPatients: () => Patient[];
  getClinicalHistory: (patientId: string) => ClinicalRecord[];
  getPrescriptions: (patientId: string) => Prescription[];
  getAestheticTreatments: (patientId: string) => AestheticTreatment[];
  getAccountsReceivable: (patientId: string) => AccountReceivable[];
  getAppointments: (patientId: string) => Appointment[];
  getDocuments: (patientId: string) => PatientDocument[];
}

const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'Alejandro',
    lastName: 'García',
    email: 'alejandro.garcia@email.com',
    phone: '+57 300 123 4567',
    dateOfBirth: '1985-05-15',
    gender: 'Masculino',
    lastVisit: '2026-04-20',
    status: 'Activo',
    documentId: '1020304050',
  },
  {
    id: '2',
    firstName: 'Isabella',
    lastName: 'Martínez',
    email: 'isabella.m@email.com',
    phone: '+57 311 987 6543',
    dateOfBirth: '1992-08-22',
    gender: 'Femenino',
    lastVisit: '2026-05-05',
    status: 'En Seguimiento',
    documentId: '987654321',
  }
];

const mockClinicalHistory: Record<string, ClinicalRecord[]> = {
  '1': [
    {
      id: 'h1',
      date: '2026-04-20',
      time: '10:30 AM',
      doctor: 'Dr. Santiago Mendoza',
      title: 'Post-operatorio Rinoplastia',
      summary: 'Revisión de férula nasal. La inflamación ha disminuido un 40%. No hay signos de infección. Se programa retiro de puntos para la próxima semana.',
      type: 'Seguimiento'
    },
    {
      id: 'h2',
      date: '2026-03-15',
      time: '08:00 AM',
      doctor: 'Dr. Santiago Mendoza',
      title: 'Intervención: Rinoplastia Estética',
      summary: 'Procedimiento exitoso sin complicaciones. Corrección de giba dorsal y definición de punta nasal. Paciente en recuperación estable.',
      type: 'Cirugía'
    },
    {
      id: 'h3',
      date: '2026-02-10',
      time: '11:00 AM',
      doctor: 'Dra. Elena Rivas',
      title: 'Consulta de Valoración Estética',
      summary: 'Paciente desea mejorar perfil nasal. Se realiza simulación 3D. Se explican expectativas y proceso quirúrgico.',
      type: 'Consulta'
    }
  ]
};

const mockPrescriptions: Record<string, Prescription[]> = {
  '1': [
    {
      id: 'r1',
      date: '2026-04-20',
      medication: 'Amoxicilina 500mg',
      dosage: '1 cada 8 horas',
      instructions: 'Tomar por 7 días después de las comidas.'
    },
    {
      id: 'r2',
      date: '2026-04-20',
      medication: 'Ibuprofeno 400mg',
      dosage: '1 cada 12 horas',
      instructions: 'Solo en caso de dolor persistente.'
    }
  ]
};

const mockAestheticTreatments: Record<string, AestheticTreatment[]> = {
  '1': [
    {
      id: 't1',
      date: '2026-05-01',
      name: 'Aplicación de Toxina Botulínica',
      area: 'Frente y entrecejo',
      status: 'Completado'
    },
    {
      id: 't2',
      date: '2026-05-15',
      name: 'Drenaje Linfático Facial',
      area: 'Rostro completo',
      status: 'Programado'
    }
  ]
};

const mockAccountsReceivable: Record<string, AccountReceivable[]> = {
  '1': [
    {
      id: 'b1',
      date: '2026-03-15',
      concept: 'Rinoplastia Estética (Honorarios Médicos)',
      totalAmount: 3500,
      paidAmount: 2000,
      pendingAmount: 1500,
      status: 'Parcial'
    },
    {
      id: 'b2',
      date: '2026-04-20',
      concept: 'Kit de Curación y Medicamentos Post-op',
      totalAmount: 150,
      paidAmount: 0,
      pendingAmount: 150,
      status: 'Pendiente'
    }
  ]
};

const mockAppointments: Record<string, Appointment[]> = {
  '1': [
    {
      id: 'a1',
      date: '2026-05-15',
      time: '09:00 AM',
      doctor: 'Dr. Santiago Mendoza',
      reason: 'Control Post-operatorio (1 mes)',
      status: 'Pendiente'
    },
    {
      id: 'a2',
      date: '2026-04-20',
      time: '10:30 AM',
      doctor: 'Dr. Santiago Mendoza',
      reason: 'Retiro de puntos y revisión',
      status: 'Completada'
    },
    {
      id: 'a3',
      date: '2026-03-15',
      time: '08:00 AM',
      doctor: 'Dr. Santiago Mendoza',
      reason: 'Intervención: Rinoplastia',
      status: 'Completada'
    }
  ]
};

const mockDocuments: Record<string, PatientDocument[]> = {
  '1': [
    {
      id: 'd1',
      date: '2026-03-14',
      name: 'Consentimiento Informado - Rinoplastia Estética.pdf',
      category: 'Consentimiento',
      fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
      fileSize: '1.2 MB'
    },
    {
      id: 'd2',
      date: '2026-03-14',
      name: 'Consentimiento de Anestesia General.pdf',
      category: 'Consentimiento',
      fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
      fileSize: '950 KB'
    },
    {
      id: 'd3',
      date: '2026-02-10',
      name: 'Perfil Lipídico y Hemograma Completo.pdf',
      category: 'Examen',
      fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
      fileSize: '850 KB'
    },
    {
      id: 'd5',
      date: '2026-03-15',
      name: 'Evaluación Frontal - Pre-Op.jpg',
      category: 'Imagen',
      fileUrl: '/assets/mock/rinoplasty_preop.png',
      fileSize: '2.4 MB'
    },
    {
      id: 'd6',
      date: '2026-04-10',
      name: 'Marcación de Puntos - Botox.jpg',
      category: 'Imagen',
      fileUrl: '/assets/mock/botox_area.png',
      fileSize: '1.8 MB'
    }
  ]
};

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: mockPatients,
  searchQuery: '',
  clinicalHistory: mockClinicalHistory,
  prescriptions: mockPrescriptions,
  aestheticTreatments: mockAestheticTreatments,
  accountsReceivable: mockAccountsReceivable,
  appointments: mockAppointments,
  documents: mockDocuments,
  setSearchQuery: (query) => set({ searchQuery: query }),
  getFilteredPatients: () => {
    const { patients, searchQuery } = get();
    if (!searchQuery) return patients;
    
    const lowQuery = searchQuery.toLowerCase();
    return patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lowQuery) ||
        p.lastName.toLowerCase().includes(lowQuery) ||
        p.documentId.includes(lowQuery) ||
        p.email.toLowerCase().includes(lowQuery)
    );
  },
  getClinicalHistory: (patientId) => {
    return get().clinicalHistory[patientId] || [];
  },
  getPrescriptions: (patientId) => {
    return get().prescriptions[patientId] || [];
  },
  getAestheticTreatments: (patientId) => {
    return get().aestheticTreatments[patientId] || [];
  },
  getAccountsReceivable: (patientId: string) => {
    return get().accountsReceivable[patientId] || [];
  },
  getAppointments: (patientId: string) => {
    return get().appointments[patientId] || [];
  },
  getDocuments: (patientId: string) => {
    return get().documents[patientId] || [];
  }
}));
