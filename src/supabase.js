import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ssilqmkmpgtexcccdklm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzaWxxbWttcGd0ZXhjY2Nka2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NDY1MDYsImV4cCI6MjA2MTEyMjUwNn0.e3-PwFbnj9mIqEDHsS7o-jTGwN6kwikFI7QeFlFPWOM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);