import express from "express";
const multer = require("multer");
const path = require("path");
const userService = require("../services/userService");
const upload = require("../config/multerConfig.js");
let getHomePage = async (req, res) => {
  try {
    let popularSongs = await userService.getPopularSongs(); // Lấy danh sách bài hát phổ biến từ service
    res.render("user/home.ejs", { popularSongs }); // Truyền danh sách bài hát vào template
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
};

let formUploadMusic = (req, res) => {
  return res.render("user/formUploadMusic.ejs");
};

const uploadSong = async (req, res) => {
  try {
    // Gọi service để lưu thông tin bài hát vào database
    const newSong = await userService.createSong(req.body, req.file.path);
    res.send("Bài hát đã được upload thành công");
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi");
  }
};
const getPageMusic = async (req, res) => {
  try {
    const songId = req.params.songId;
    const song = await userService.getSongById(songId);
    if (!song) {
      return res.status(404).send("Song not found");
    }

    const popularSongs = await userService.getPopularSongs();

    res.render("user/pageMusic.ejs", {
      song,
      popularSongs,
    });
  } catch (error) {
    console.error("Error getting page music: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getHomePage: getHomePage,
  formUploadMusic: formUploadMusic,
  uploadSong: uploadSong,
  getPageMusic: getPageMusic,
};
