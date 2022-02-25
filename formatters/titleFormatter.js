const formatOutputTitle = title => {
  return title.toString().replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
};

const formatTitle = item => {
  item = { ...item, title: formatOutputTitle(item.title) };

  const isThereSpaceBeforeTitle = title => title[0] == ' ';
  const removeSpaceBeforeTitle = title => title.substring(1);

  const isAuthorNameInTitle = item.title.indexOf(item.author.name) > -1;
  const removeAuthorNameFromTitle = title => {
    return title.replace(`${item.author.name}`, '').replace(' - ', ' ').replace(',', '');
  };

  let formattedTitle = isAuthorNameInTitle ? removeAuthorNameFromTitle(item.title) : item.title;

  if (isThereSpaceBeforeTitle(formattedTitle)) {
    formattedTitle = removeSpaceBeforeTitle(formattedTitle);
  }

  return formattedTitle;
};

module.exports = { formatTitle };
