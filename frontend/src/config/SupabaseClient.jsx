import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
console.log(supabaseUrl);

const supabaseKey = import.meta.env.VITE_APP_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
