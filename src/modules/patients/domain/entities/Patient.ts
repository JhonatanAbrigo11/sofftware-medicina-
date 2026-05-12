export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  lastVisit: string;
  status: 'Activo' | 'Inactivo' | 'En Seguimiento';
  documentId: string; // ID Card / DNI
  age?: number;
}
