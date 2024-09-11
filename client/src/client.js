import { createClient } from '@supabase/supabase-js'

const URL = 'https://xjwpxpneenjgangamuhf.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqd3B4cG5lZW5qZ2FuZ2FtdWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NjAzODAsImV4cCI6MjAyODUzNjM4MH0.TYLZ48oLnqcVbubMt8kXwxVPNo_5JqGBWViOoJwl1Zc';

export const supabase = createClient(URL, API_KEY);
