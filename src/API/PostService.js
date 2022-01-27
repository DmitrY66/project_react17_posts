import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page
      }
    });
    return response;

  }

  static async getById(id) {

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    return response;

  }

  static async getCommentsByPostId(id) {

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return response;

  }
}


// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts?_limit=10
// https://jsonplaceholder.typicode.com/posts?_limit=10&_page=4
