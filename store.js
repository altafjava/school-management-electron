const electron = require('electron');
const path = require('path');
const fs = require('fs');

// This class can only be used by main.js
class Store {
  constructor() {
    this.path = (electron.app || electron.remote.app).getPath('userData');
    this.fileName = path.join(this.path, 'admission.json');
    this.data = parseDataFile(this.fileName);
    if (this.data.length == 0) {
      fs.writeFileSync(this.fileName, JSON.stringify(this.data));
    }
  }
  getUserDataPath() {
    return this.path.replace(/\\/g, '/');
  }
  add(admissionData) {
    fs.readFile(this.fileName, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let rootArray = JSON.parse(data);
        rootArray.push(admissionData);
        const rootArrayData = JSON.stringify(rootArray);
        fs.writeFile(this.fileName, rootArrayData, 'utf8', () => {});
      }
    });
  }
  findAll() {
    try {
      return JSON.parse(fs.readFileSync(this.fileName));
    } catch (error) {
      return [];
    }
  }
}

const parseDataFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return [];
  }
};

module.exports = Store;
