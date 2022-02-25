const normalizeString = title => {
  return title
    .toString()
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '')
    .trim();
};

const removeAuthorNameFromTitle = title => {
  return title.replace(`${item.author.name}`, '').replace(' - ', ' ').replace(',', '');
};

const formatTitle = item => {
  const authorName = item.author.name;
  const title = normalizeString(item.title);

  const isAuthorNameInTitle = title.includes(authorName);

  if (isAuthorNameInTitle) title = removeAuthorNameFromTitle(title);

  return title;
};

module.exports = { formatTitle };
