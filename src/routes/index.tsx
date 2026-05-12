import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/modules/auth/presentation/pages/LoginPage';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { AuthGuard } from '@/shared/components/AuthGuard';
import { PatientsPage } from '@/modules/patients/presentation/pages/PatientsPage';
import { MedicalRecordPage } from '@/modules/patients/presentation/pages/MedicalRecordPage';
import { AppointmentsPage } from '@/modules/appointments/presentation/pages/AppointmentsPage';
import { InventoryPage } from '@/modules/inventory/presentation/pages/InventoryPage';
import { TreatmentsPage } from '@/modules/aesthetic/presentation/pages/TreatmentsPage';
import { PaymentsPage } from '@/modules/payments/presentation/pages/PaymentsPage';
import { SurgeriesPage } from '@/modules/surgeries/presentation/pages/SurgeriesPage';
import { PurchasesPage } from '@/modules/purchases/presentation/pages/PurchasesPage';
import { NewPurchasePage } from '@/modules/purchases/presentation/pages/NewPurchasePage';
import { ExpensesPage } from '@/modules/expenses/presentation/pages/ExpensesPage';
import { DashboardPage } from '@/modules/dashboard/presentation/pages/DashboardPage';
import { RecoveryHousePage } from '@/modules/recovery/presentation/pages/RecoveryHousePage';
import { SettingsPage } from '@/modules/settings/presentation/pages/SettingsPage';
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
          <DashboardPage />
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
    path: '/appointments',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <AppointmentsPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/recovery-house',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <RecoveryHousePage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/aesthetic-clinic',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <TreatmentsPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/surgeries',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <SurgeriesPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/inventory',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <InventoryPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/payments',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PaymentsPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/purchases',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <PurchasesPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/purchases/new',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <NewPurchasePage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/expenses',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <ExpensesPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/settings',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <SettingsPage />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
