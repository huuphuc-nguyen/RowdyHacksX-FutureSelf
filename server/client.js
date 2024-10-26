import { createClient } from "@supabase/supabase-js";

const URL = "https://wqaxnebeeloxaylaikaw.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxYXhuZWJlZWxveGF5bGFpa2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzM4MjAsImV4cCI6MjA0NTU0OTgyMH0.3CrDgqz0HcTIgCNZwOKlEtws0xxeP2TnBjFXMendn_4";

export const supabase = createClient(URL, API_KEY);
