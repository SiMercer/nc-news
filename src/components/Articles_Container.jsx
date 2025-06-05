import { useState, useEffect } from "react";
import { getArticles, getCommentsByArticleByID } from "../api";
import Article_Full from "./Article_Full";
import Article_Preview from "./Article_Preview";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Articles_Container({ setSelectedTopic, selectedTopic, topics, user }) {
  const [articles, setArticles] = useState([]);
  const [articleSelect, setArticleSelect] = useState();
  const [comments, setComments] = useState({});
  const [sort_by, setSort_by] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [badTopicErr, setBadTopicErr] = useState(false);
  const navigate = useNavigate();
  const url = useLocation();
  const searchParams = new URLSearchParams(url.search);

  useEffect(() => {
    const topicByParams = searchParams.get("topics");

    if (!topics || topics.length === 0) return;

    const isValidTopic = topics.some((topic) => topic.slug === topicByParams);

    if (isValidTopic) {
      setSelectedTopic(topicByParams);
      setBadTopicErr(false);
    } else {
      if (topicByParams) setBadTopicErr(true);
    }
  }, [topics, url.search]);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    handleArticleSelect(undefined);
    navigate(`/articles?topics=${event.target.value}`);
  };

  const handleArticleSelect = (article_id) => {
    setArticleSelect(article_id);
    if (article_id !== undefined) {
      navigate(`/articles/${article_id}`);
    } else {
      navigate(`/articles?topics=${selectedTopic}`);
    }
  };

  useEffect(() => {
    getArticles(sort_by, order).then((res) => {
      setArticles(res.data.articles);
    });
  }, [sort_by, order]);

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
  }, [articles, articleSelect, sort_by]);

  const { article_id } = useParams();

  useEffect(() => {
    if (article_id) {
      setArticleSelect(Number(article_id));
    }
  }, [article_id]);

  return (
    <section className="articles">
      <section>
        <div className="articles-Nav">
          <button onClick={() => navigate("/")} className="navText">
            Home
          </button>
          <button
            onClick={() => {
              setSelectedTopic("All");
              handleArticleSelect(undefined);
              navigate("/articles");
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

      <div className="filtersBar">
        <div className="topics">
          <label htmlFor="topics">Choose a Topic:</label>
          <select
            name="topics"
            id="topics"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        </div>

        <div className="sortBy">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            name="sortBy"
            id="sortBy"
            value={sort_by}
            onChange={(event) => setSort_by(event.target.value)}
          >
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
          </select>

          <select
            name="orderBy"
            id="orderBy"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
          >
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </div>
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
            article={articles.find(
              (article) => article.article_id === articleSelect
            )}
            comments={comments[articleSelect] || []}
            user={user}
          />
        </div>
      )}
    </section>
  );
}

export default Articles_Container;
