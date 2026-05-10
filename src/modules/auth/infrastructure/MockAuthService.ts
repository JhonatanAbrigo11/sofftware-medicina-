import type { User, UserRole } from '@/shared/types/auth';

const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@medicina.com': {
    id: '1',
    email: 'admin@medicina.com',
    name: 'Admin User',
    role: 'ADMIN',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  'doctor@medicina.com': {
    id: '2',
    email: 'doctor@medicina.com',
    name: 'Dr. Gregory House',
    role: 'DOCTOR',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor',
  },
  'recepcionista@medicina.com': {
    id: '3',
    email: 'recepcionista@medicina.com',
    name: 'Sarah Smith',
    role: 'RECEPCIONISTA',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Receptionist',
  },
  'enfermeria@medicina.com': {
    id: '4',
    email: 'enfermeria@medicina.com',
    name: 'Nurse Joy',
    role: 'ENFERMERIA',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nurse',
  },
  'coordinador@medicina.com': {
    id: '5',
    email: 'coordinador@medicina.com',
    name: 'Coordinator John',
    role: 'COORDINADOR',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coordinator',
  },
};

export class MockAuthService {
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS[email];
        if (user && user.password === password) {
          const { password: _, ...userWithoutPassword } = user;
          resolve({
            user: userWithoutPassword,
            token: `mock-jwt-token-${Date.now()}`,
          });
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1500);
    });
  }

  static async refreshToken(token: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`mock-refreshed-token-${Date.now()}`);
      }, 500);
    });
  }
}
