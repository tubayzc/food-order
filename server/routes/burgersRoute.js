const express = require("express");
const burgerModel = require("../models/burgerModel");
const router = express.Router();

//GET ALL FOODS endpointi
router.get("/getBurgers", (req, res) => {
  burgerModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//put

//silme metodu (post kullanarak)

router.post("/deleteBurger", async (req, res) => {
  const burgerid = req.body.burgerid;
  //  const {burgerid} = req.body --> destruct ederek alma

  try {
    await burgerModel.findOneAndDelete({ _id: burgerid });
    res.send("Menü silme başarılı");
  } catch {
    res.status(400).json({ message: error });
  }
});

//Menü Ekleme
router.post("/addBurger", async (req, res) => {
  const menu = req.body.menu;
  //  const {burgerid} = req.body --> destruct ederek alma

  try {
    const newMenu = new burgerModel({
      ad: menu.ad,
      ozellik: ["small", "medium", "mega"],
      img: menu.img,
      desc: menu.desc,
      kategori: menu.kategori,
      fiyat: [menu.fiyat],
    });

    await newMenu.save();

    res.send("Menü Ekleme Başarılı");
  } catch {
    res.status(400).json({ message: error });
  }
});

//get burger by id

router.post("/getBurgerById", async (req, res) => {
  const burgerid = req.body.burgerid;

  try {
    const burger = await burgerModel.findOne({ _id: burgerid });
    res.send(burger);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//edit burger by id

router.post("/editBurger", async (req, res) => {
  const editedBurger = req.body.editedBurger;

  try {
    const burger = await burgerModel.findOne({ _id: editedBurger._id });

    burger.ad = editedBurger.ad;
    burger.desc = editedBurger.desc;
    burger.img = editedBurger.img;
    burger.kategori = editedBurger.kategori;
    burger.fiyat = [editedBurger.fiyat];

    await burger.save();

    res.send(burger);
  } catch (error) {
    res.status(400).json({ message: "bir hata var" });
  }
});

module.exports = router;
