import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xaqchrxqbgmthdvmmyxc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcWNocnhxYmdtdGhkdm1teXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2ODk3NjAsImV4cCI6MjAyMzI2NTc2MH0.o1WzltJSu5TYp0ajtMOZigMhrcy-DfVK0apYkCZArEo";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
