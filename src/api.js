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
  return api.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments || [];
  });
};

const postCommentByArticleID = (article_id, comment) => {
  return api
    .post(`/articles/${article_id}/comments`, comment)
    .then((res) => res.data.comment);
};

const patchArticleVotes = (article_id, vote) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then((data) => {
      return data;
    });
};

const getUsers = () => {
  return api.get("/users").then((data) => {
    return data;
  });
};

export {
  getTopics,
  getArticles,
  getArticleByID,
  getCommentsByArticleByID,
  patchArticleVotes,
  getUsers,
  postCommentByArticleID,
};
