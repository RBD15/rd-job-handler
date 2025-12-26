const { workerData, parentPort } = require('node:worker_threads');

module.exports = async () => {
  console.log("Running showCurrentHour file");
  const timezone = workerData && workerData.timezone ? workerData.timezone : 'UTC';
  console.log('Running ShowCurrentHour Job', workerData);
  await processData(timezone);
};

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

// Export for testing
module.exports.processData = processData;
