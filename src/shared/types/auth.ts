export type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPCIONISTA' | 'ENFERMERIA' | 'COORDINADOR';

export const AUTH_ROLES: UserRole[] = ['ADMIN', 'DOCTOR', 'RECEPCIONISTA', 'ENFERMERIA', 'COORDINADOR'];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
