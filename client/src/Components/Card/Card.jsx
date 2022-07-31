import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import imgNotFound from "./890.png";

function Card({
  id,
  name,
  image,
  temperament,
  temperaments,
  weight,
  weight_min,
  weight_max,
}) {
  return (
    <div className="cardContain">
      <Link to={"/home/" + id}>
        <h3>{name}</h3>
        {image ? (
          <img className="dogImg" src={image} alt="img not found" />
        ) : (
          <img className="dogImg" src={imgNotFound} alt="img not found" />
        )}
        <hr />
        {temperament ? (
          <ul className="dogTemp">
            {temperament.map((temp, id) => (
              <li key={id} className="dogTempItem">
                {temp}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="dogTemp">
            {temperaments?.map((t, id) => (
              <li key={id} className="dogTempItem">
                {t.name}
              </li>
            ))}
          </ul>
        )}
        {!weight_min ? (
          <h4>
            {weight[1]
              ? weight[0] + " - " + weight[1] + " Kg"
              : weight[0] + " Kg"}
          </h4>
        ) : (
          <h4>
            {weight_max
              ? weight_min + " - " + weight_max + " Kg"
              : weight_min + " Kg"}
          </h4>
        )}
      </Link>
    </div>
  );
}

export default Card;
