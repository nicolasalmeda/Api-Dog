// recibe un string y devuelve un array sacando - " " y years
function splitByScript(str) {
  if (str) {
    if (str.includes("-")) {
      let arr = str.split(" ").map((e) => e.trim());
      arr = arr.filter((a) => {
        return a !== " " && a !== "-" && a !== "years";
      });
      return arr;
    } else {
      return [str];
    }
  }
}

//devuelve un arreglo usando la coma como separador

function splitByColon(str) {
  if (str) {
    if (str.includes(",")) {
      return str.split(",").map((e) => e.trim());
    } else {
      return [str];
    }
  }
}

module.exports = {
  splitByScript,
  splitByColon,
};
