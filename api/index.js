var express = require("express");

var app = express();

const { v4 } = require("uuid");

const api_key = process.env.API_KEY;

const getLocation = async (address) => {
  let location = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl(
      address
    )}&key=${api_key}`
  );
  return location.data.results[0];
};

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.post(`/api/location`, async (req, res) => {
  const { address } = req.body;
  let addressData = await getLocation(address);
  res.json({
    location: addressData,
  });
});

module.exports = app;
