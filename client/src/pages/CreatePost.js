import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: '', author: '', description: '', image: '' });

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const fileData = await readFile(file);
        setPost({ ...post, image: fileData });
    };

    const createPost = async (event) => {
        event.preventDefault();

        // Generate current timestamp
        const timestamp = new Date();

        await supabase
            .from('Posts')
            .insert({ 
                title: post.title, 
                author: post.author, 
                description: post.description, 
                image: post.image,
                created_at: timestamp // Add the timestamp to the inserted data
            })
            .select();

        window.location = "/";
    };

    // Helper function to read file as Data URL
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} />
                <br />

                <label htmlFor="image">Image</label><br />
                <input type="file" id="image" name="image" onChange={handleImageUpload} /><br />
                <br />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    );
};

export default CreatePost;
