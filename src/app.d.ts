import type { SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      user: User | null;
    }
  }
}

declare module '$env/static/public' {
  export const PUBLIC_SITE_URL: string;
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$env/dynamic/public' {
  export const PUBLIC_SITE_URL: string;
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$env/dynamic/private' {
  export const env: {
    GEMINI_API_KEY?: string;
    OPENAI_API_KEY?: string;
    ALLOWED_EMAILS?: string;
  };
}

export {};
