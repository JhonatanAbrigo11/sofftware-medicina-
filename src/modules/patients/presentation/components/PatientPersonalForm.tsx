import { useForm } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type { Patient } from '@/modules/patients/domain/entities/Patient';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar,
  MapPin
} from 'lucide-react';

interface PatientPersonalFormProps {
  patient: Patient;
}

export const PatientPersonalForm: React.FC<PatientPersonalFormProps> = ({ patient }) => {
  const { register, handleSubmit } = useForm<Patient>({
    defaultValues: patient
  });

  const onSubmit = (data: Patient) => {
    console.log('Guardando datos:', data);
  };

  return (
    <form id="patient-personal-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Nombres
          </Label>
          <Input id="firstName" {...register('firstName')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Apellidos
          </Label>
          <Input id="lastName" {...register('lastName')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="documentId" className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Documento de Identidad
          </Label>
          <Input id="documentId" {...register('documentId')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Correo Electrónico
          </Label>
          <Input id="email" type="email" {...register('email')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Teléfono / WhatsApp
          </Label>
          <Input id="phone" {...register('phone')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Fecha de Nacimiento
          </Label>
          <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Género
          </Label>
          <Input id="gender" {...register('gender')} className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Dirección de Residencia
          </Label>
          <Input defaultValue="Calle 123 # 45 - 67, Bogotá, Colombia" className="h-11 rounded-xl bg-white/50 border-primary/10" />
        </div>
      </div>
    </form>
  );
};
