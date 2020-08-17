import { TokenType } from './../src/contants/TokenTypes';
import { PeekTokenGenerator } from './../src/common/PeekTokenGenerator';
import { Token } from './../src/lexer/Token';
import { Lexer } from './../src/lexer/Lexer';
import { PeekGenerator } from './../src/common/PeekGenerator';
import { DemoParser } from './../src/parser/demoParse';
import { describe } from 'mocha';
import { array2Gen } from '../src/common/array2Gen';
import { equal } from 'assert';
import { checkToken } from '../src/common/equal';

describe('parser test', () => {
  it('simple + test', () => {
    const str = '1+2+3+4';
    // const stream = new PeekGenerator();
    const lexer = new Lexer(array2Gen(str));
    lexer.analyse();
    const tokenStream = lexer.createStream();
    const peekTokenGenerator = new PeekTokenGenerator(tokenStream);
    const demoAST = DemoParser.parse(peekTokenGenerator);
    console.log(demoAST);
    checkToken(demoAST.lexeme, TokenType.OPERATOR, '+');
    checkToken(demoAST.getChild(0).lexeme, TokenType.NUMBER, '1');
    checkToken(demoAST.getChild(1).lexeme, TokenType.OPERATOR, '+');
    checkToken(demoAST.getChild(1).getChild(0).lexeme, TokenType.NUMBER, '2');
    checkToken(demoAST.getChild(1).getChild(1).lexeme, TokenType.OPERATOR, '+');
    checkToken(demoAST.getChild(1).getChild(1).getChild(0).lexeme, TokenType.NUMBER, '3');
    checkToken(demoAST.getChild(1).getChild(1).getChild(1).lexeme, TokenType.NUMBER, '4');
  });
});
