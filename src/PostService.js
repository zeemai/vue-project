import axios from "axios";

const baseUrl = "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";

export default class PostService {
  getAllPosts() {
    return axios.get(`${baseUrl}/posts`);
  }

  getPosts(number) {
    return axios.get(`${baseUrl}/posts/${number}`);
  }

  writePost(post) {
    if (post.id) {
      return axios.put(`${baseUrl}/posts/${post.id}`, post);
    } else {
      return axios.post(`${baseUrl}/post`, post);
    }
  }

  deletePost(id) {
    return axios.delete(`${baseUrl}/post/${id}`);
  }
}
