import axios from "axios";

const baseUrl = "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";

export default class PostService {
  getAllPosts() {
    return axios.get(`${baseUrl}/posts`);
  }
}
