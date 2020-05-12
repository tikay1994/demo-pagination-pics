import React from "react";
import PropTypes from "prop-types";
import "./style.css";
PicList.propTypes = {
  pics: PropTypes.array,
};

PicList.defaultProps = {
  pics: [],
};
function PicList(props) {
  const { pics } = props;

  return (
    <div className="pic-list">
      {pics.map((pic) => (
        <div key={pic.id}>
          {pic.title}
          <a href={pic.imageUrl}>
            <img className="pic-product" src={pic.imageUrl} alt="pic" />
          </a>
        </div>
      ))}
    </div>
  );
}

export default PicList;
