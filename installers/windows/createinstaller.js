const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig() {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release-builds');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'School Management-win32-x64/'),
    authors: 'Altaf',
    noMsi: true,
    outputDirectory: path.join(outPath, 'setup'),
    exe: 'School Management.exe',
    setupExe: 'School Management.exe',
    setupIcon: path.join(rootPath, 'assets', 'icon.ico'),
    // loadingGif: path.join(rootPath, 'assets', 'loading.gif'),
  });
}
