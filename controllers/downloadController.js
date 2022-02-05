const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

const download_video = async (req, res) => {
  const { id } = req.params;
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  const audioPath = `audios/${id}.m4a`;

  const saveAudio = audio => audio.pipe(fs.createWriteStream(audioPath));
  const removeAudio = () => fs.unlink(audioPath, err => console.log('audio removed.'));

  try {
    const audio = await ytdl(videoURL, { quality: 140 });

    saveAudio(audio).on('close', async () => {
      res.sendFile(path.resolve(audioPath), {}, () => removeAudio());
    });
  } catch (error) {
    removeAudio();

    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  download_video,
};
