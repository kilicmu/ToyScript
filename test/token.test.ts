import { Emnu } from './../src/common/Emnu';
import { Token } from './../src/lexer/Token';
import { TokenType } from './../src/contants/TokenTypes';
import { PeekGenerator } from './../src/common/PeekGenerator';
import { array2Gen } from "../src/common/array2Gen"
import { equal } from '../src/common/equal';
function checkToken(token: Token, type: Emnu, value: string) {
  equal(token.type, type);
  equal(token.value, value);
}

describe('token test', () => {
  it('varOrKeyword', () => {
    const it1 = new PeekGenerator<string>(array2Gen("if _c"));
    const it2 = new PeekGenerator<string>(array2Gen("true"));
    const token1 = Token.makeVarOrKeyword(it1);
    const token2 = Token.makeVarOrKeyword(it2);
    it1.next();
    const token3 = Token.makeVarOrKeyword(it1);
    equal(token1.type, TokenType.KEYWORD);
    equal(token1.value, "if");
    equal(token2.type, TokenType.BOOLEAN);
    equal(token2.value, "true");
    equal(token3.type, TokenType.VARIABLE);
    equal(token3.value, "_c");
  })

  it('makeString test', () => {
    const it1 = new PeekGenerator<string>(array2Gen("'_'"));
    const it2 = new PeekGenerator<string>(array2Gen("''"));
    const it3 = new PeekGenerator<string>(array2Gen('"_"'));
    const it4 = new PeekGenerator<string>(array2Gen('""'));
    const token1 = Token.makeString(it1);
    const token2 = Token.makeString(it2);
    const token3 = Token.makeString(it3);
    const token4 = Token.makeString(it4);
    checkToken(token1, TokenType.STRING, "'_'");
    checkToken(token2, TokenType.STRING, "''");
    checkToken(token3, TokenType.STRING, '"_"');
    checkToken(token4, TokenType.STRING, '""');
  })

  it("make Operator test", () => {
    const arr = ["+= 123", "++ 'fds'", "^=", "+ 1", "-- 1", "-= 1", "=== ", "== ", ";"]
    let i = 0
    for (let a of arr) {
      const it = new PeekGenerator<string>(array2Gen(a));
      const token = Token.makeOperator(it);
      checkToken(token, TokenType.OPERATOR, a.split(' ')[0]);
    }
  })
})


