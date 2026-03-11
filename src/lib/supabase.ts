import { createClient } from '@supabase/supabase-js';

// Switched to https to avoid Mixed Content errors if the app is served over SSL
const supabaseUrl = 'https://tranzlo-supabase-a9a371-187-124-35-158.traefik.me';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzMyMzMzOTgsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.k7vGRg-b3G2GHf8sRIK6cfwfImf0OJ8_hncuV2bs1PY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);