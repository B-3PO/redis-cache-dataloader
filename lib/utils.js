exports.toString = value => {
  if (value === null) return '';
  else if (typeof value === 'object') return JSON.stringify(value);
};

exports.parse = value => {
  if (value === '' || value === null) return null;
  return JSON.parse(value);
};
