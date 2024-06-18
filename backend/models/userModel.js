const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://etordtukoeudctvqwjyz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3JkdHVrb2V1ZGN0dnF3anl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NzEyMjUsImV4cCI6MjAzNDI0NzIyNX0.eJjts7nI02-8goC3PAqU0kedcEOubgEe-JUDfgd7BwQ');

class User {
    static async create(username, email, password_hash) {
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password_hash }])
            .select('*'); // Include this line to get the created records
        return { data, error };
    }

    static async findByEmail(email) {
        const { data, error } = await supabase.from('users').select().eq('email', email).single();
        return { data, error };
    }

    static async findById(id) {
        const { data, error } = await supabase.from('users').select().eq('id', id).single();
        return { data, error };
    }
}

module.exports = User;