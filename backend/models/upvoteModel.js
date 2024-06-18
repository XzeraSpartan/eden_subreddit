const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://etordtukoeudctvqwjyz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3JkdHVrb2V1ZGN0dnF3anl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NzEyMjUsImV4cCI6MjAzNDI0NzIyNX0.eJjts7nI02-8goC3PAqU0kedcEOubgEe-JUDfgd7BwQ');

class Upvote {
    static async create(user_id, post_id) {
        const { data, error } = await supabase.from('upvotes').insert([{ user_id, post_id }]);
        return { data, error };
    }

    static async findByPost(post_id) {
        const { data, error } = await supabase.from('upvotes').select().eq('post_id', post_id);
        return { data, error };
    }
}

module.exports = Upvote;
