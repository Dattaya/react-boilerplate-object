var chalk = require('chalk');

/**
 * Adds mark check symbol
 */
module.exports.addCheckMark = (callback) => {
  process.stdout.write(chalk.green(' ✓'));
  callback();
};

module.exports.addFailMark = (callback) => {
  process.stdout.write(chalk.red(' ⚠'));
  callback();
};
