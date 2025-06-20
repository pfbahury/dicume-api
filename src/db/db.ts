import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";
import dotenv from 'dotenv';

dotenv.config();

const supabaseURL:string = process.env.SUPABASE_URL || "";
const supabaseKey:string = process.env.SUPABASE_KEY || "";

if (!supabaseURL ||!supabaseKey) {
  throw new Error('As variáveis de ambiente SUPABASE_URL e SUPABASE_KEY devem ser definidas.');
}


export const supabase = createClient<Database>(supabaseURL, supabaseKey);
