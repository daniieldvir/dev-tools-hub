import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub?: string;
  name?: string;
  role?: string;
  exp?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  payload = signal<JwtPayload | null>(null);

  decode(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      this.payload.set(decoded);
      return decoded;
    } catch (e) {
      console.error('Invalid JWT token', e);
      this.payload.set(null);
      return null;
    }
  }

  isExpired(): boolean {
    const decoded = this.payload();
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
  }
}
