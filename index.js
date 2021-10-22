// Assalomu aleykum!

// Main
const express = require("express");
const app = express();
const path = require("path");

// Packages
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./utils/connectDb");
connect();
// Setting
app.use(bodyParser.json());
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));
// Routing
app.use("/api/user", require("./routes/user"));
app.use("/api/document", require("./routes/document"));
app.use("/api/file", require("./routes/file"));

app.listen(3000, () => {
	console.log("Server running");
});
