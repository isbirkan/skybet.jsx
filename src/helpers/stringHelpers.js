export function formatTime(dateTimeObject) {
  const dateTime = new Date(dateTimeObject);
  return dateTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

export function buildScores(scoresObject) {
  return `${scoresObject.home} - ${scoresObject.away}`;
}

export function formatOutcome(format, outcome) {
  if (format === 'decimal') {
    return parseFloat(Math.round(outcome.price.decimal * 100) / 100).toFixed(2);
  }
  return `${outcome.price.num}/${outcome.price.den}`;
}

export function buildStatus(statusObject) {
  let status = '';
  Object.keys(statusObject).forEach(key => {
    if (statusObject[key]) {
      if (status === '') {
        status = key;
      } else {
        status = `${status}, ${key}`;
      }
    }
  });

  return status;
}
