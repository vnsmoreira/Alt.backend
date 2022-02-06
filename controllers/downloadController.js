const ytdl = require('ytdl-core');

const download_video = async (req, res) => {
  const { id } = req.params;
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  try {
    const audio = await ytdl(videoURL, { quality: 140 });

    audio.once('progress', (chunk, loaded, total) => res.set('content-length', total)).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  download_video,
};
