const fs = require('fs');
const path = require('path');
const { DATA_FILE } = require('../config/app.config');

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };