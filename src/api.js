import axios from "axios";

const api = axios.create({
  baseURL: "https://news-site-app.onrender.com/api",
});

const getTopics = () => {
  return api.get("/topics").then((data) => {
    return data;
  });
};

const getArticles = () => {
  return api.get("/articles").then((data) => {
    return data;
  });
};

const getArticleByID = (article_id) => {
  return api.get("/articles/${article_id}").then((data) => {
    return data;
  });
};

const getCommentsByArticleByID = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((res) => {
      return res.data.comments || [];
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return [];
      } else {
        console.error("Error fetching comments:", err);
        return [];
      }
    });
};

export { getTopics, getArticles, getArticleByID, getCommentsByArticleByID };
