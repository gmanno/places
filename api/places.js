var express = require("express");

var axios = require("axios");
var encodeUrl = require("encodeurl");

var app = express();

const router = express.Router();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const api_key = process.env.API_KEY;

const getLocation = async (address) => {
  console.log(address);
  console.log(api_key);
  let location = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl(
      address
    )}&key=${api_key}`
  );
  return location.data.results[0];
};

router.post(`/`, async (req, res) => {
  // res.setHeader("Content-Type", "text/html");
  // res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  const { address } = req.body;

  let addressData = await getLocation(address);
  res.json({
    location: addressData,
  });
});

module.exports = router;
