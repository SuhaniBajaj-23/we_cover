const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Items");

router.get("/donate", async (req, res) => {
  try {
    res.render("donate");
  } catch (err) {
    res.send("Error!");
  }
});

router.get("/profile", async (req, res) => {
    res.render("profile");
  });

  router.get("/avail", async (req, res) => {
    res.render("avail");
  });

  router.get("/approve", async (req, res) => {
    res.render("approve");
  });

  router.get("/redeem", async (req, res) => {
    res.render("redeem");
  });

  router.get("/nft", async (req, res) => {
    res.render("nft");
  });

  router.get("/order", async (req, res) => {
    res.render("order");
  });

module.exports = router;