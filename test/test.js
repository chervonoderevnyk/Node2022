function logToConsole() {
  console.log("FROM test/test.js");

  console.log(__dirname);

  console.log(__filename);

  console.log(process.cwd());
}

module.exports = {
  logToConsole,
};
