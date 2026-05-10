import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/modules/auth/presentation/pages/LoginPage';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { AuthGuard } from '@/shared/components/AuthGuard';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';
import { PatientsPage } from '@/modules/patients/presentation/pages/PatientsPage';
import { MedicalRecordPage } from '@/modules/patients/presentation/pages/MedicalRecordPage';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Sparkles, 
  Scissors, 
  Package, 
  CreditCard, 
  Settings,
  FileText 
} from 'lucide-react';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Navigate to="/dashboard" replace />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Dashboard General" icon={LayoutDashboard} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/medical-record/:id',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <MedicalRecordPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/patients',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PatientsPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/recovery-house',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Casa de Recuperación" icon={Home} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/aesthetic-clinic',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Medicina Estética" icon={Sparkles} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/surgeries',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Programación de Cirugías" icon={Scissors} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/inventory',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Control de Inventario" icon={Package} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/payments',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Módulo de Pagos" icon={CreditCard} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/settings',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PlaceholderPage title="Configuración del Sistema" icon={Settings} />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
