import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commenterName, setCommenterName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw error;
        }
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('Comments')
          .select('*')
          .eq('post_id', id);
        if (error) {
          throw error;
        }
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('Comments').insert([
        {
          post_id: id,
          commenter_name: commenterName,
          text: commentContent,
        },
      ]);
      if (error) {
        throw error;
      }
      // Reload the page to reset the text boxes and display the new comment
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await supabase.from('Comments').delete().eq('id', commentId);
      // Filter out the deleted comment from the comments array
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleLike = (event) => {
    if (event.target.tagName.toLowerCase() === 'button' && event.target.classList.contains('likeButton')) {
      event.preventDefault();
      // Implement your like functionality here
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PostPage">
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      {post.image && <img src={post.image} alt="Post" />}
      <p>Description: {post.description}</p>
      <p>Created at: {new Date(post.created_at).toLocaleString()}</p>

      <div>
        <h3>Comments</h3>
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            placeholder="Your Name"
            value={commenterName}
            onChange={(event) => setCommenterName(event.target.value)}
            required
          />
          <textarea
            placeholder="Your Comment"
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
            required
          />
          <button type="submit">Submit Comment</button>
        </form>
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.commenter_name}</p>
              <p>{comment.text}</p>
              <p>{new Date(comment.created_at).toLocaleString()}</p>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
