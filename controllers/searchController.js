const ytsr = require('ytsr');
const { formatTitle } = require('../formatters/titleFormatter');

const search_videos = async (req, res) => {
  const query = req.params.query;
  if (!query) return res.send('Empty query.');

  try {
    let searchResults = await ytsr(query, { limit: 15, gl: 'BR', hl: 'pt' });

    const isVideo = item => item.type == 'video';
    const videosArray = searchResults.items.filter(isVideo).sort((a, b) => a.view > b.view);

    const formattedVideosArray = videosArray.map(item => {
      const lowThumbnail = item.thumbnails[1];
      const highThumbnail = item.bestThumbnail.url;

      return {
        id: item.id,
        title: formatTitle(item),
        author: item.author.name,
        thumbnailUri: lowThumbnail ? lowThumbnail.url : highThumbnail,
        duration: item.duration,
      };
    });

    res.status(200).send(formattedVideosArray);
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  search_videos,
};
