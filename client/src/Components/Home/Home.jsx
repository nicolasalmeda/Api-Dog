import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterCreated,
  filterDogsByTemperament,
  orderByName,
  orderByWeight,
} from "../../Actions/index";
import Card from "../Card/Card";
import Pagination from "./Pagination/Pagination";
// import Pagination from "./Pagination/Pagination";
import NavBar from "../Home/NavBar/NavBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperamentsHome = useSelector((state) => state.temperaments);

  //Paginado

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogPerPage] = useState(12);

  const indexOfLastDog = currentPage * dogsPerPage;

  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  // Cambiar estado del Numero de Pagina
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    // Recibe un (e) evento y hace un dispatch de getCharacters() para poder traerme todos los personajes.
    e.preventDefault();
    dispatch(getDogs());
  }

  // Filtrado por Temperament
  function handleSelect(e) {
    // Al seleccionar una occupacion de la lista, la setea
    // dentro del array temperament, sumado a las que ya tenia
    console.log("entre a handleSelect");
    console.log("e.target.value", e.target.value);

    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordened ${e.target.value}`);
  }
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordened ${e.target.value}`);
  }

  return (
    <div className="divHome">
      <NavBar />

      <div className="Filters">
        {/* Filtros */}

        {/* Boton para volver a cargar todos los personajes. Para que se ejecute le 
            tengo que pasar una funcion(handleClick)*/}

        <select defaultValue={"DEFAULT"} onChange={(e) => handleOrderByName(e)}>
          {/* Menu desplegable con opciones */}
          {/* Filtro Ascendente-Descendente */}
          <option value="DEFAULT" disabled>
            Order By Name
          </option>
          <option value="asc">A - Z</option>
          {/* Ascendente */}
          <option value="desc">Z - A</option>
          {/* Descendente */}
          {/* Que necesito para mandar las cosas por 'payload'? Un value en <option>
                  que me permite acceder y preguntarme... Dentro del <select> tengo <option>
                  esas 'option' tienen un "value" que permiten que al hacer click desde el front
                  haga toda la logica y que la action lo entienda, si ese value es 'asc' hace
                   tal cosa, si el value el 'desc' hace tal otra*/}
        </select>

        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => handleOrderByWeight(e)}
        >
          <option value="DEFAULT" disabled>
            Order By Weight
          </option>
          <option value="+weight">Lightest</option>
          {/* Mayor Peso */}
          <option value="-weight">Heaviest</option>
          {/* Menor Peso */}
        </select>

        <select defaultValue={"DEFAULT"} onChange={(e) => handleSelect(e)}>
          <option value="DEFAULT" disabled>
            Filter By Temperament
          </option>
          {temperamentsHome.map((temp, key) => (
            <option value={temp.name} key={key}>
              {temp.name}
            </option>
          ))}
        </select>

        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => handleFilterCreated(e)}
        >
          Filtro por Existente o Creado por Nosotros
          <option value="DEFAULT" disabled>
            Filter Created
          </option>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Existents">Existing</option>
        </select>

        <button className="btnClean" onClick={(e) => handleClick(e)}>
          X
        </button>
      </div>

      {/*   Pasamos los valores de las props    */}

      {currentDog.length > 0 ? (
        <div className="MainHome">
          <div className="dogsContainer">
            {currentDog?.map((dog) => {
              return (
                <div className="dogDiv" key={dog.id}>
                  <Card
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperament}
                    temperaments={dog.temperaments}
                    weight={
                      Array.isArray(dog.weight)
                        ? dog.weight
                        : dog.weight?.split("-")
                    }
                    weight_min={dog.weight_min}
                    weight_max={dog.weight_max}
                  />
                </div>
              );
            })}
          </div>
          <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length - 1}
            pagination={pagination}
          />
        </div>
      ) : (
        <div className="MainHomePreload">
          <div className="dogsContainerPreload">
            <div className="preloaderHome"></div>
          </div>
        </div>
      )}
    </div>
  );
}
