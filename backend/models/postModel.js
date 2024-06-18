const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://etordtukoeudctvqwjyz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3JkdHVrb2V1ZGN0dnF3anl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NzEyMjUsImV4cCI6MjAzNDI0NzIyNX0.eJjts7nI02-8goC3PAqU0kedcEOubgEe-JUDfgd7BwQ');

class Post {
    static async create(title, content, subreddit_id, user_id) {
        const { data, error } = await supabase
            .from('posts')
            .insert([{ title, content, subreddit_id, user_id }])
            .select('*'); // Include this line to get the created records
        return { data, error };
    }

    static async findBySubreddit(subreddit_id) {
        const { data, error } = await supabase
            .from('posts')
            .select()
            .eq('subreddit_id', subreddit_id)
            .order('created_at', { ascending: false });
        return { data, error };
    }

    static async findById(id) {
        const { data, error } = await supabase.from('posts').select().eq('id', id).single();
        return { data, error };
    }
}

module.exports = Post;
