import { createClient } from '@supabase/supabase-js';

// Hardcoded values provided to ensure the app works in the preview environment
const supabaseUrl = 'http://tranzlo-supabase-4eb935-187-124-35-158.traefik.me';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzMyMjQyOTUsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.cGoH43SsNSQ90JjwIm9DH3jxejpko3CBejLBi3pY4kE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);