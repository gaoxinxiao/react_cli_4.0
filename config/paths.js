const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appSrc: resolveApp(`src`),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};