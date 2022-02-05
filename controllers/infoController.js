const ytdl = require('ytdl-core');

const get_video_info = async (req, res) => {
  const { id } = req.params;
  const videoURL = `https://www.youtube.com/watch?v=${id}`;

  try {
    const response = await ytdl.getInfo(videoURL);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  get_video_info,
};
