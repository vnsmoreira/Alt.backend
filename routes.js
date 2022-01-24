const express = require('express');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');
const yt = require('youtube-search-without-api-key');

router.get('/search', async (req, res) => {
  const videos = await yt.search('rap dos hokages');

  const videoId = await videos[0].id.videoId;
  const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

  const audioPath = `audios/${videoId}.mp4`;
  const saveAudio = audio => audio.pipe(fs.createWriteStream(audioPath));
  const removeAudio = () => fs.unlink(audioPath, err => console.log('audio removed.'));
  const sendAudio = () => res.download(`${__dirname}/${audioPath}`, err => removeAudio());

  const audio = await ytdl(videoURL, { quality: 140 });
  await saveAudio(audio).on('close', () => sendAudio());
});

module.exports = router;
