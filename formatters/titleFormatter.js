const normalizeString = title => {
  return title
    .toString()
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '')
    .trim();
};

const removeAuthorNameFromTitle = (title, authorName) => {
  return title.replace(authorName, '').replace(' - ', ' ').replace(',', '');
};

const formatTitle = item => {
  let title = normalizeString(item.title);
  const authorName = item.author.name;

  const isAuthorNameInTitle = title.includes(authorName);

  if (isAuthorNameInTitle) title = removeAuthorNameFromTitle(title,authorName);

  return title;
};

module.exports = { formatTitle };
