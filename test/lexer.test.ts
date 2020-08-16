import { TokenType } from './../src/contants/TokenTypes';
import { array2Gen } from '../src/common/array2Gen';
import { checkToken } from '../src/common/equal';
// import { array2Gen } from '../src/common/array2Gen';
import { Lexer } from './../src/lexer/Lexer';

describe('Lexer Test', () => {
  // it('analyse test1', () => {
  //   const gen = array2Gen('var a = 1;');
  //   const lexer = new Lexer(gen);
  //   const tokens = lexer.analyse();
  //   checkToken(tokens[0], TokenType.KEYWORD, 'var');
  //   checkToken(tokens[1], TokenType.VARIABLE, 'a');
  //   checkToken(tokens[2], TokenType.OPERATOR, '=');
  //   checkToken(tokens[3], TokenType.NUMBER, '1');

  // })
  // it('analyse test2', () => {
  //   const gen = array2Gen('a == 1 cb != 10 ; ac++ ');
  //   const lexer = new Lexer(gen);
  //   const tokens = lexer.analyse();
  //   // checkToken(tokens[0], TokenType.KEYWORD, 'var');
  //   // checkToken(tokens[1], TokenType.VARIABLE, 'a');
  //   // checkToken(tokens[2], TokenType.OPERATOR, '=');
  //   // checkToken(tokens[3], TokenType.NUMBER, '1');
  //   console.log(tokens)

  // })
  it('analyse test3', () => {
    const gen = array2Gen(`function a(_a){\n
      // hello world \n
      /* hashife */
      var a = _a;\n
      return a + 1;\n
    }`);
    const lexer = new Lexer(gen);
    const tokens = lexer.analyse();
    // checkToken(tokens[0], TokenType.KEYWORD, 'var');
    // checkToken(tokens[1], TokenType.VARIABLE, 'a');
    // checkToken(tokens[2], TokenType.OPERATOR, '=');
    // checkToken(tokens[3], TokenType.NUMBER, '1');
    console.log(tokens)

  })


  it('')
})

