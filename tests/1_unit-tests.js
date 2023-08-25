const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests',() => {

    test('convertHandler повинен правильно читати введення цілого числа', () => {
        assert.equal(convertHandler.getNum('5kg'), '5')
        assert.equal(convertHandler.getNum('3mi'), '3')
    })

    test('convertHandler повинен правильно читати введення десяткового числа', () => {
        assert.equal(convertHandler.getNum('5.5km'), '5.5')
        assert.equal(convertHandler.getNum('7.3mi'), '7.3')
    })

    test('convertHandler повинен правильно читати введення дробу', () => {
        assert.equal(convertHandler.getNum('3/4lbs'), '0.75')
    })

    test('convertHandler повинен правильно читати введення десяткового дробу', () => {
        assert.equal(convertHandler.getNum('1.5/3kg'), '0.5')
    })

    test('convertHandler повинен правильно повернути помилку при подвійному дробі (тобто 3/2/3)', () => {
        assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number')
    })

    test('convertHandler повинен правильно приймати ввід 1 за замовчуванням, якщо нічого не введено', () => {
        assert.equal(convertHandler.getNum('kg'), '1')
    })

    test('convertHandler повинен правильно читати дійсні введені одиниці', () => {
        assert.equal(convertHandler.getUnit('1gal'), 'gal')
        assert.equal(convertHandler.getUnit('2L'), 'L')
        assert.equal(convertHandler.getUnit('3/4l'), 'L')
        assert.equal(convertHandler.getUnit('5.7mi'), 'mi')
        assert.equal(convertHandler.getUnit('9/3km'), 'km')
        assert.equal(convertHandler.getUnit('3000lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('2kg'), 'kg')
    })

    test('convertHandler повинен правильно повертати помилку при недійсній введеній одиниці', () => {
        assert.equal(convertHandler.getUnit('football fields'), 'invalid unit')
    })

    test('convertHandler повинен повернути правильну одиницю для кожної дійсної введеної одиниці', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })

    test('convertHandler повинен правильно повернути прописаний рядок для кожної дійсної введеної одиниці', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    })

    test('convertHandler повинен правильно перетворювати gal у L', () => {
        assert.approximately(convertHandler.convert(1, 'gal'), 3.78, 0.1)
    })

    test('convertHandler повинен правильно перетворювати L у gal', () => {
        assert.approximately(convertHandler.convert(1, 'L'), 0.26, 0.1)
    })

    test('convertHandler повинен правильно перетворювати mi у km', () => {
        assert.approximately(convertHandler.convert(1, 'mi'), 1.60, 0.1)
    })

    test('convertHandler повинен правильно перетворювати km у mi', () => {
        assert.approximately(convertHandler.convert(1, 'km'), 0.62, 0.1)
    })

    test('convertHandler повинен правильно перетворювати lbs у kg', () => {
        assert.approximately(convertHandler.convert(1, 'lbs'), 0.45, 0.1)
    })

    test('convertHandler повинен правильно перетворювати kg у lbs', () => {
        assert.approximately(convertHandler.convert(1, 'kg'), 2.2, 0.1)
    })
    
});