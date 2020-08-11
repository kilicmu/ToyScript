import { assert } from 'chai';
import { AlphabetHelper } from '../src/lexer/AlphabetHelper';
import { equal } from '../src/common/equal';

describe('alphabet-helper test', () => {
  it('isLetter', () => {
    const isLetter = AlphabetHelper.isLetter;
    equal(isLetter('a'), true);
    equal(isLetter('A'), true);
    equal(isLetter('_'), false);
    equal(isLetter('*'), false);

  })
  it('isNumber', () => {
    const isNumber = AlphabetHelper.isNumber;
    equal(isNumber('0'), true);
    equal(isNumber('4'), true);
    equal(isNumber('9'), true);
  })
  it('isLiteral', () => {
    const isLiteral = AlphabetHelper.isLiteral;
    equal(isLiteral('_'), true);
    equal(isLiteral('A'), true);
    equal(isLiteral('&'), false);
    equal(isLiteral('-'), false);
  })
  it('isOperator', () => {
    const isOperator = AlphabetHelper.isOperator;
    equal(isOperator('+'), true)
    equal(isOperator('%'), true)
    equal(isOperator('0'), false)
    equal(isOperator('Z'), false)
  })
})
