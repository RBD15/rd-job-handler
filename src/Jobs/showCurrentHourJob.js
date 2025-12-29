const { workerData, parentPort } = require('node:worker_threads');

async function processData(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const timeStr = formatter.format(now);
  console.log(`Current time in ${timezone}: ${timeStr}`);
  if (parentPort) parentPort.postMessage({ status: 'done', timezone, time: timeStr });
  return timeStr;
}

(async () => {
  console.log('Running ShowCurrentHour Jobs:', workerData);
  const timezone = workerData && workerData.timezone ? workerData.timezone : 'UTC';
  if (parentPort) parentPort.postMessage({ status: 'start', message: 'Running ShowCurrentHour Job', workerData });
  await processData(timezone);
})().catch(err => {
  console.error('showCurrentHourJob error:', err && err.stack ? err.stack : err);
  if (parentPort) parentPort.postMessage({ status: 'error', error: String(err && err.message ? err.message : err) });
  process.exit(1);
});

module.exports.processData = processData;

