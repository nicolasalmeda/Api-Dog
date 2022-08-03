import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../Actions/index";
import { useHistory } from "react-router-dom";

import "./DogCreated.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (/\d/.test(input.name)) {
    errors.name = "Numbers are not allowed";
  } else if (!input.height_min) {
    errors.height_min = "Height Min is required";
  } else if (!input.height_max) {
    errors.height_max = "Height Max is required";
  } else if (input.height_min > input.height_max) {
    errors.height_min = "heigh max must be greater than height min";
  } else if (!input.weight_min) {
    errors.weight_min = "Weight Min is required";
  } else if (!input.weight_max) {
    errors.weight_min = "Weight Max is required";
  } else if (input.weight_min > input.weight_max) {
    errors.weight_min = "wheight max must be greater than wheight min";
  } else if (!input.life_span_min) {
    errors.life_span_min = "Life expectancy Min is required";
  } else if (!input.life_span_max) {
    errors.life_span_max = "Life expectancy Max is required";
  } else if (input.life_span_min > input.life_span_max) {
    errors.life_span_min = "life span max must be greater than life span min";
  } else if (!input.image) {
    errors.image = "Link image is required";
  }
  return errors;
}

export default function DogCreated() {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    // Le pasamos un objeto con lo que necesita el Post.
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    image: "",
    temperament: [], // Tiene que ser un array por si quiero agregar mas de 1 occupation al crear
    // el personaje.
  }); // Estado local. Aca va lo que ingrese en el formulario.

  // Esta funcion va a ir modificando de acuerdo a lo que reciba el input.
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  } // Por cada una de las opciones del menu desplegable [e.target.name]
  // Le seteo un value, de acuerdo a cual selecciono e.target.value.

  function handleSelect(e) {
    // Al seleccionar una occupacion de la lista, la setea
    // dentro del array occupation, sumado a las que ya tenia
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newDogCreated = {
      name: input.name,
      height_min: input.height_min,
      height_max: input.height_max,
      weight_min: input.weight_min,
      weight_max: input.weight_max,
      life_span_min: input.life_span_min,
      life_span_max: input.life_span_max,
      image: input.image,
      temperament: input.temperament,
    };
    dispatch(postDog(newDogCreated));
    alert("Dog created Successfully!");
    setInput(input); // Vaciar el formulario

    history.push("/home");
  } // Una vez que el perro haya sido creado redirigime a /home atraves del history(useHistory)

  function handleDelete(t) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temps) => temps !== t),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className="createBreedDiv">
      <div className="MenuCreate">
        <a className="Title" href="/home">
          <h1>GoBack</h1>
        </a>
        <h3 className="createTitle">Create a new breed</h3>
      </div>
      <div className="divForm">
        <form onSubmit={handleSubmit}>
          <fieldset id="form">
            <legend>Breed</legend>
            <div className="divName">
              <label className="labelName">Name</label>
              <hr />
              <input
                className={errors.name ? "danger" : "inputName"}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="divHeight">
              <label className="labelHeight">Height</label>
              <hr />
              <label className="labelHeightMin">Min</label>
              <input
                className={errors.height_min ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.height_min}
                name="height_min"
                onChange={(e) => handleChange(e)}
              ></input>
              <label className="labelHeightMax">Max</label>
              <input
                className={errors.height_max ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.height_max}
                name="height_max"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.height_min && <p>{errors.height_min}</p>}
              {errors.height_max && <p>{errors.height_max}</p>}
            </div>
            <div className="divWeight">
              <label className="labelWeight">Weight</label>
              <hr />
              <label className="labelWeightMin">Min</label>
              <input
                className={errors.weight_min ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.weight_min}
                name="weight_min"
                onChange={(e) => handleChange(e)}
              ></input>
              <label className="labelWeightMax">Max</label>
              <input
                className={errors.weight_max ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.weight_max}
                name="weight_max"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.weight_min && <p>{errors.weight_min}</p>}
              {errors.weight_max && <p>{errors.weight_max}</p>}
            </div>
            <div className="divLife">
              <label className="labelLife">Life expectancy</label>
              <hr />
              <label className="labelLifeMin">Min</label>
              <input
                className={errors.life_span_min ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.life_span_min}
                name="life_span_min"
                onChange={(e) => handleChange(e)}
              ></input>
              <label className="labelLifeMax">Max</label>
              <input
                className={errors.life_span_max ? "danger2" : "inputNumbers"}
                type="number"
                min="1"
                value={input.life_span_max}
                name="life_span_max"
                onChange={(e) => handleChange(e)}
              ></input>
              {errors.life_span_min && <p>{errors.life_span_min}</p>}
              {errors.life_span_max && <p>{errors.life_span_max}</p>}
            </div>
            <div className="divImage">
              <label className="labelImg">Image</label>
              <hr />
              <input
                className={errors.image ? "danger3" : "imgCreate"}
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p>{errors.image}</p>}
            </div>
            <div className="divTemp">
              <label className="labelTemp">Temperament</label>
              <hr />
              <select
                onChange={(e) => handleSelect(e)}
                className="selectTemperament"
              >
                <option disabled /*  selected */>Choose Temperament</option>
                {temperaments.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </div>
            {input.temperament.map((t) => (
              <div className="tempList" key={t}>
                <p className="tempItem">{t}</p>
                <button className="buttonX" onClick={() => handleDelete(t)}>
                  X
                </button>
              </div>
            ))}
            <button type="submit" className="btnCreate">
              Create!
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
