const initialState = {
  dogs: [],
  alldogs: [],
  detail: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return { ...state, dogs: action.payload, alldogs: action.payload };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "FILTER_BY_TEMPERAMENTS":
      const alldogs = state.alldogs;
      const filteredByDogTemperament = alldogs.filter((r) =>
        r.temperament?.includes(action.payload)
      );
      const filteredByDogTemperamentInDb = alldogs.filter((r) =>
        r.temperaments?.map((e) => e.name).includes(action.payload)
      );
      const api = filteredByDogTemperament;
      const db = filteredByDogTemperamentInDb;
      const All = api.concat(db);
      return { ...state, dogs: All };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "Created"
          ? state.alldogs.filter((el) => el.createdInDb)
          : state.alldogs.filter((el) => !el.createdInDb);

      return {
        ...state,
        dogs: createdFilter, // Si el payload es 'All' devolveme
        //todo(alldogs)
        // Si no es 'All' devolve los creados
      };

    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? /* Ascendente */
            state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : /* Descendente */
            state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "ORDER_BY_WEIGHT":
      const sortedArray =
        action.payload === "+weight"
          ? /* + Pesados*/
            state.dogs.sort(function (a, b) {
              if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
                return 1;
              }
              if (parseInt(a.weight[0]) < parseInt(b.weight[0])) {
                return -1;
              }
              return 0;
            })
          : /* - Pesados */
            state.dogs.sort(function (a, b) {
              if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
                return -1;
              }
              if (parseInt(a.weight[0]) < parseInt(b.weight[0])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArray,
      };

    case "GET_DOG_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "POST_DOG":
      console.log(state);
      return {
        ...state,
      };

    case "GET_DOG_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default: {
      return state;
    }
  }
}

export default rootReducer;
