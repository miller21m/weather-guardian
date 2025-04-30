const cron = require('node-cron');
const { evaluateAlerts } = require('./alertChecker');

// Run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  console.log('Running scheduled alert evaluation...');
  await evaluateAlerts();
});
