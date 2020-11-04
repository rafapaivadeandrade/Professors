const express = require("express");
const routes = require("./routes");
const path = require("path");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use(errors());
app.listen(3333);
