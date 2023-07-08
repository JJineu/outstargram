import { AuthUser } from '@/types/user';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
