import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста ID = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div className="">{post.id}. {post.title}</div>
      }
      <h3>Комментарии</h3>
      {isComLoading
        ? <Loader />
        : <div className="comments">
          {comments.map(comm =>
            <div key={comm.id} className="comments__item">
              <h4>{comm.email}</h4>
              <div className="">{comm.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default PostIdPage;