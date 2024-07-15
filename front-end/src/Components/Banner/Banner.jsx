import { Link } from "react-router-dom";
import "./Banner.css";

import React from "react";

function Banner() {
  return (
    <div className="headerImg">
      <img
        src={`${process.env.PUBLIC_URL}/frame41.png`}
        alt="Description of the image"
      />
      <h3>
        Unlock Flavor
        <br />
        Explore and Share Recipes with Us!
      </h3>
      <hr />
      <br />

      <nav>
        <ul>
          <li>
            <Link to="/recipe">Share</Link>
          </li>
          <li>
            <Link to="/recipe/all">Explore</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Banner;
