import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  ArrowRight,
  Braces,
  FileText,
  Home,
  KeyRound,
  LayoutDashboard,
  LucideAngularModule,
  Search,
  Upload,
  Wrench,
  Hash,
  Clock,
  Scissors,
  Code,
  Clipboard,
  Database,
  Monitor,
  Settings,
  Globe,
  Terminal,
  Shield,
  Layers
} from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Search, Home,
        LayoutDashboard, Wrench, ArrowRight, Braces, KeyRound, FileText,
        Shield, Terminal, Hash, Clock, Globe, Scissors,
        Settings, Upload, Code, Clipboard, Monitor, Database, Layers
      }),
    ),
  ],
};
