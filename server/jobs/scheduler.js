const cron = require('node-cron');
const { evaluateAlerts } = require('./alertChecker');

// Schedule the alert evaluation to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  await evaluateAlerts();
});
