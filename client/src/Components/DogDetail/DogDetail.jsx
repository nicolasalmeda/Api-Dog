import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetail } from "../../Actions/index.js";

import "./DogDetail.css";

function DogDetail({ match }) {
  const { id } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id)); // Accedo al id que ingresan por params en el back.
  }, [id, dispatch]);

  const myDog = useSelector((state) => state.detail);
  console.log(myDog[0]);

  if (id.length < 5) {
    // Si la raza ya existe...
    return (
      <div className="detailDiv">
        <div className="MenuDetail">
          <a className="Title" href="/home">
            <h1>GoBack</h1>
          </a>
        </div>
        {myDog.length > 0 ? (
          <div className="Main">
            <div className="detailBox">
              <h2 className="breedName">{myDog[0].name}</h2>
              <img className="detailImg" src={myDog[0].image} alt="" />
              <div className="divInfo">
                <table>
                  <thead>
                    <tr>
                      <td className="detailName">Personality</td>
                      <td>
                        {!myDog[0].createdInDb
                          ? myDog[0].temperament?.join(", ")
                          : myDog[0].temperaments?.map((t) => t.name)}
                      </td>
                    </tr>
                    <tr>
                      <td className="detailName">Life span</td>
                      <td>
                        {myDog[0].life_span[1]
                          ? myDog[0].life_span[0] +
                            " to " +
                            myDog[0].life_span[1] +
                            " Years"
                          : myDog[0].life_span[0]}
                      </td>
                    </tr>
                    <tr>
                      <td className="detailName">Height</td>
                      <td>
                        {myDog[0].height[1]
                          ? myDog[0].height[0] + " to " + myDog[0].height[1]
                          : myDog[0].height[0]}{" "}
                        Cms
                      </td>
                    </tr>
                    <tr>
                      <td className="detailName">Weight</td>
                      <td>
                        {myDog[0].weight[1]
                          ? myDog[0].weight[0] + " to " + myDog[0].weight[1]
                          : myDog[0].weight[0]}{" "}
                        Kgs
                      </td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="Main">
            <div className="preloaderDetail"></div>
          </div>
        )}
      </div>
    );
  } else {
    // Si la raza es creada...
    return (
      <div className="detailDiv">
        <div className="MenuDetail">
          <a className="Title" href="/home">
            <h1>MyBestFriend</h1>
          </a>
        </div>
        {myDog.length > 0 ? (
          <div className="Main">
            <div className="detailBox">
              <h2 className="detailH2">{myDog[0].name}</h2>
              <img
                className="detailImg"
                src={myDog[0].image}
                alt=""
                width="500"
                height="400"
              />
              <ul>
                <li className="item">
                  <h4 className="detailH3">Personality</h4>
                  <p className="detailH3">
                    {!myDog[0].createdInDb
                      ? myDog[0].temperament + "  "
                      : myDog[0].temperaments.map((t) => t.name + " ")}
                  </p>
                </li>
                <li className="item">
                  <h3 className="detailH3">
                    Life expectancy :{myDog[0].life_span_min} to{" "}
                    {myDog[0].life_span_max} Years
                  </h3>
                </li>
                <li className="item">
                  <h3 className="detailH3">
                    Height :{myDog[0].height_min} to {myDog[0].height_max} Cms
                  </h3>
                </li>
                <li className="item">
                  <h3 className="detailH3">
                    Weight :{myDog[0].weight_min} to {myDog[0].weight_max} Kgs
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="Main">
            <div className="preloaderDetail"></div>
          </div>
        )}
      </div>
    );
  }
}

export default DogDetail;
