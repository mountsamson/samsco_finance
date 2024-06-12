
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://svjjbvtvfywsfeupwryw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ampidnR2Znl3c2ZldXB3cnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzc3MTgsImV4cCI6MjAzMzc1MzcxOH0.6oMSY18r8TGuEIYytnL1E1cjleLuosd_-JAVKa8z5WM')