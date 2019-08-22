export function formatTime(dateTimeObject) {
  const dateTime = new Date(dateTimeObject);
  return dateTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

export function formatDate(dateTimeObject) {
  const dateTime = new Date(dateTimeObject);
  return `${dateTime.toLocaleDateString('en-US', { weekday: 'long' })} ${getOrdinalNum(
    dateTime.getDate()
  )} ${dateTime.toLocaleString('default', { month: 'long' })} ${dateTime.getFullYear()} ${formatTime(dateTime)}`;
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
