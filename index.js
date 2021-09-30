var express = require("express");

var cors = require("cors");

var app = express();
const places = require("./api/places");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const compression = require("compression");
app.use(cors());
app.use(express.json());
app.use(compression());

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.use("/api/places", places);

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server ready at port ${process.env.PORT}`)
);
