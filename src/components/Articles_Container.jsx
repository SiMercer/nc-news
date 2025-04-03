import { useState, useEffect } from "react";
import { getArticles, getCommentsByArticleByID } from "../api";
import Article_Full from "./Article_Full";
import Article_Preview from "./Article_Preview";
import { useNavigate } from "react-router-dom";

function Articles_Container({ setSelectedTopic, selectedTopic, topics, user }) {
  const [articles, setArticles] = useState([]);
  const [articleSelect, setArticleSelect] = useState();
  const [comments, setComments] = useState({});
  const navigate = useNavigate();

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    handleArticleSelect(undefined);
  };

  const handleArticleSelect = (article_id) => {
    setArticleSelect(article_id);
  };

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res.data.articles);
    });
  }, []);

  useEffect(() => {
    articles.forEach((article) => {
      getCommentsByArticleByID(article.article_id).then((comments) => {
        setComments((existingComments) => ({
          ...existingComments,
          [article.article_id]: comments.length
            ? comments
            : [
                {
                  comment_id: 999,
                  votes: 0,
                  created_at: new Date(),
                  author: "",
                  body: "No comments yet, be the first!",
                  article_id: article.article_id,
                },
              ],
        }));
      });
    });
  }, [articles, articleSelect]);

  return (
    <section className="articles">
      <section>
        <div>
          <button onClick={() => navigate("/")} className="navText">
            Home
          </button>
          <button
            onClick={() => {
              setSelectedTopic("All");
              handleArticleSelect(undefined);
            }}
            className="navText"
          >
            &gt; Articles
          </button>
          {selectedTopic !== "All" && (
            <button
              onClick={() => handleArticleSelect(undefined)}
              className="navText"
            >
              &gt; {selectedTopic}
            </button>
          )}
        </div>
      </section>

      <div className="topics">
        <label htmlFor="topics">Choose a Topic:</label>
        <select
          name="topics"
          id="topics"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="All">All</option>
          {topics.map((topic) => (
            <option value={topic.slug}>{topic.slug}</option>
          ))}
        </select>
      </div>

      {articleSelect === undefined ? (
        <div className="articlesContainerPreview">
          {articles
            .filter((article) => {
              return (
                selectedTopic === "All" ||
                selectedTopic === "" ||
                article.topic === selectedTopic
              );
            })
            .map((article) => (
              <div
                key={article.article_id}
                onClick={() => handleArticleSelect(article.article_id)}
              >
                <Article_Preview
                  article={article}
                  comments={comments[article.article_id] || []}
                  onSelect={handleArticleSelect}
                />
              </div>
            ))}
        </div>
      ) : (
        <div>
          <Article_Full
            article={articles.find((a) => a.article_id === articleSelect)}
            comments={comments[articleSelect] || []}
            user={user}
          />
        </div>
      )}
    </section>
  );
}

export default Articles_Container;
