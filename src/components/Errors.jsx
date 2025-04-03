import { useLocation, useNavigate } from "react-router-dom";

function Error() {
  const url = useLocation();
  const navigate = useNavigate();

  return (
    <section>
      <br />
      <div className="errPath">
        404: The Path "{url.pathname}" was not found.
      </div>
      <br />
      <div>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </section>
  );
}

export default Error;
