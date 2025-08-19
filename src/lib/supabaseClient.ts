import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tdfkrpbtjlxjndeyjzms.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZmtycGJ0amx4am5kZXlqem1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjQ3MjMsImV4cCI6MjA3MTE0MDcyM30.1WfkPMWGLaNXPjpRqRhpx65k_jKD5JrpmwwP3bsyyw4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
