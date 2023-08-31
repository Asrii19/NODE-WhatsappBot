const extractParameters = (inputString) => {
  const regex = /(?:^|\s)-(\w+)/g;
  const matches = inputString.match(regex);
  if (matches) {
    const parameters = matches.map((match) => match.trim().substring(1));
    const contenido = inputString.replace(regex, '').trim();
    return { parameters, contenido };
  } else {
    return { parameters: [], contenido: inputString };
  }
}

const extractSingleParameter = (inputString) => {
  const regex = /(?:^|\s)-(\w+)/g;
  const matches = inputString.match(regex);
  if (matches) {
    const parameter = matches[0].substring(1);
    const contenido = inputString.replace(regex, '').trim();
    return { parameter, contenido };
  } else {
    return { parameter: null, contenido: inputString };
  }
}

module.exports = {
    extractParameters,
    extractSingleParameter
}
