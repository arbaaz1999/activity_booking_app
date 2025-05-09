const app = require("./app"); // Import the Express app from app.js
const PORT = process.env.PORT || 8080; // Set the port to listen on

app.listen(PORT, (err) => {
  if (err) throw Error(err.message);
  console.log(`Application is successfully running on PORT ------> ${PORT}`);
});
