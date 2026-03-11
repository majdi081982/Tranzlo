import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to the hardcoded VPS URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://tranzlo-supabase-4eb935-187-124-35-158.traefik.me';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzMyMjQyOTUsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.cGoH43SsNSQ90JjwIm9DH3jxejpko3CBejLBi3pY4kE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);