const path = require('path');
const JobHandler = require('../src/JobHandler');
const JobVO = require('../src/Jobs/JobVO');

const showCurrent = async () => {
  const jobHandler = new JobHandler();

  const job = new JobVO(
    'showCurrentHour',
    'showCurrentHourJob.js',
    { timezone: process.env.TZ || 'UTC' },
    '10s' // run every 10 seconds
  );

  await jobHandler.add(job);
  console.log('Starting showCurrentHour job...');
  await jobHandler.run();

  setTimeout(async () => {
    console.log('Stopping job handler');
    await jobHandler.stop();
    process.exit(0);
  }, 50000);
}

module.exports = { showCurrent };
