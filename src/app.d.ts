import type { SupabaseClient, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient;
      user: User | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  namespace svelteHTML {
    interface HTMLAttributes {
      'on:mousemove'?: (event: MouseEvent) => void;
    }
  }
}

declare module '$env/static/public' {
  export const PUBLIC_SITE_URL: string;
  export const PUBLIC_SENTRY_DSN: string;
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$env/dynamic/public' {
  export const PUBLIC_SITE_URL: string;
  export const PUBLIC_SENTRY_DSN: string;
  export const PUBLIC_SUPABASE_URL: string;
  export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$env/dynamic/private' {
  export const env: {
    SANITY_PROJECT_ID?: string;
    SANITY_DATASET?: string;
    SANITY_API_VERSION?: string;
    SANITY_READ_TOKEN?: string;
    SUPABASE_URL?: string;
    SUPABASE_ANON_KEY?: string;
    RESEND_API_KEY?: string;
    GEMINI_API_KEY?: string;
    OPENAI_API_KEY?: string;
    ALLOWED_EMAILS?: string;
  };
}

export {};
