'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    let error = null;

    if (initNum === 'invalid number') {
      error = 'invalid number';
    }
    if (initUnit === 'invalid unit') {
      error = error ? 'invalid number and unit' : 'invalid unit';
    }

    if (error) {
      res.json({ error });
    } else {
      const returnNum = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5));
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({ initNum, initUnit, returnNum, returnUnit, string });
    }
  });
};

