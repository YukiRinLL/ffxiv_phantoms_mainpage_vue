import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://mdtcnsxevtlouxilvisn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdGNuc3hldnRsb3V4aWx2aXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MTEyNjQsImV4cCI6MjA2MjE4NzI2NH0.lQzKoW-SpDlQ1JqrbnwOo-3vTPI53hFMMWbkHzXy9f4'
);