const fs = require('fs');
const ytdl = require('ytdl-core');

const download_video = async (req, res) => {
  const { id } = req.params;
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  try {
    const audioPath = `audios/${id}.m4a`;
    const saveAudio = audio => audio.pipe(fs.createWriteStream(audioPath));

    const audio = await ytdl(videoURL, { quality: 140 });
    saveAudio(audio).on('close', async () => {
      res.download(`${__dirname}/../${audioPath}`, 'audio.m4a', () => {
        fs.unlink(audioPath, err => console.log('audio removed.'));
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  download_video,
};
