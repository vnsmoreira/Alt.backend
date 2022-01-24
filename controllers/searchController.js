const yt = require('youtube-search-without-api-key');

const search_videos = async (req, res) => {
  const formatQuery = query => query.toString().replaceAll('%20', ' ').replaceAll('+', ' ');
  const query = req.params.query;

  if (!query) return res.send('Empty query.');

  try {
    const formattedQuery = formatQuery(query);
    const videosArray = await yt.search(formattedQuery);
    res.status(200).send(videosArray);
  } catch (error) {
    console.log(error);
    res.status(400).send('Not found.');
  }
};

module.exports = {
  search_videos,
};
