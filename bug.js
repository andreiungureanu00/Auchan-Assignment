const fs = require("fs");

function readFile(path, callback) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      // callback(data) was considering data as error;
      // keeping the parameters order correctly
      callback(null, data);
    }
  });
}

function writeFile(path, data, callback) {
  fs.writeFile(path, data, "utf-8", (err) => {
    if (err) {
      callback(err);
    } else {
      // defining error as null which means there are no errors
      callback(null);
    }
  });
}

// handling the case when there is an error so that it won't consider err as data
readFile("input.txt", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    const newData = data.toUpperCase();

    writeFile("output.txt", newData, (err) => {
      // handling the case when there are errors
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully");
      }
    });
  }
});
