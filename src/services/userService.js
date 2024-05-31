import express from "express";
const { sequelize } = require("../models");
import db from "../models";
const createSong = async (informationSong, songFilePath) => {
  try {
    const newSong = await db.Song.create({
      name: informationSong.name,
      author: informationSong.author,
      singer: informationSong.singer,
      gerne: informationSong.genre,
      lyrics: informationSong.lyrics,
      iframeUrl: songFilePath,
    });
    return newSong;
  } catch (error) {
    throw new Error("Error creating song");
  }
};
const getPopularSongs = async () => {
  try {
    const popularSongs = await db.Song.findAll({
      order: [["countSeen", "DESC"]],
      limit: 10,
    });
    return popularSongs;
  } catch (error) {
    console.error("Error fetching popular songs: ", error);
    throw new Error("Error fetching popular songs");
  }
};

const getSongById = async (songId) => {
  try {
    // Tìm bài hát dựa trên ID
    const song = await db.Song.findByPk(songId);

    if (song) {
      // Cập nhật trường countSeen
      await sequelize.transaction(async (t) => {
        await song.increment("countSeen", { transaction: t });
      });

      // Trả về bài hát
      return song;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching song by ID: ", error);
    throw new Error("Error fetching song by ID");
  }
};

module.exports = {
  createSong: createSong,
  getPopularSongs: getPopularSongs,
  getSongById: getSongById,
};
