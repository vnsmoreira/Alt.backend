const ytsr = require('ytsr');

const search_videos = async (req, res) => {
  const query = req.params.query;
  if (!query) return res.send('Empty query.');

  try {
    let searchResults = await ytsr(query, { limit: 15 });

    const isVideo = item => item.type == 'video';
    const videosArray = searchResults.items.filter(isVideo);

    res.status(200).send(videosArray);
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  search_videos,
};
