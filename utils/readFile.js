const fs = require("fs");

module.exports = function readTextFile(route_file) {
  try {
    const data = fs.readFileSync(route_file, "utf-8");
    return data.split("\n");
  } catch (err) {
    console.error("Error:", err);
  }
}
