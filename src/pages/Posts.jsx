import React, { useEffect, useState, useRef } from "react";
import PostList from ".././components/PostList";
import MyButton from ".././components/UI/button/MyButton";
import PostForm from ".././components/PostForm";
import PostFilter from ".././components/PostFilter";
import MyModal from ".././components/UI/MyModal/MyModal";
import { usePosts } from ".././hooks/usePosts";
import PostService from ".././API/PostService";
import Loader from ".././components/UI/Loader/Loader";
import { useFetching } from ".././hooks/useFetching";
import { getPageCount } from ".././utils/pages";
import Pagination from ".././components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  console.log(lastElement);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  // console.log(totalPages);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
    // это отключение параметров ESLint чтобы не подчеркивал массив
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);

  }

  return (
    <div className="App">
      {/* <MyButton onClick={fetchPosts}>GET POSTS</MyButton> */}

      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr />

      <PostFilter
        filter={filter}
        setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Колличество элементов"
        options={[
          { value: 5, name: 'Подгружать по 5' },
          { value: 10, name: 'Подгружать по 10' },
          { value: 25, name: 'Подгружать по 25' },
          { value: -1, name: 'Показать все' },
        ]}
      />

      {postError &&
        <h2>Произошла чудовищная ошибка ${postError}</h2>
      }

      <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про JS" />
      <div ref={lastElement} className="trigger"></div>

      {isPostsLoading &&
        <div className="loader__container"><Loader /></div>
      }

      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />

    </div>
  );
}

export default Posts;