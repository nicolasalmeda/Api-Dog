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
