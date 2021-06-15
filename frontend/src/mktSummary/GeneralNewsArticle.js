import React, { useState } from "react";
import "../news/Article.css";

const GeneralNewsArticle = ({ data }) => {
  const [expand, setExpand] = useState(false);

  function handleDetails() {
    if (!expand) setExpand(true);
    else setExpand(false);
  }

  const source = `${data.source} `;

  return (
    <div className="Article">
      <h5 className="Article-title" onClick={handleDetails}>
        {data.title}
      </h5>
      <div className="Article-source">
        {expand ? (
          <div>
            {source}
            <a href={data.link}>Full Article</a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default GeneralNewsArticle;
