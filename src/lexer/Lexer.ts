import { TokenType } from './../contants/TokenTypes';
import { AlphabetHelper } from './AlphabetHelper';
import { PeekGenerator } from './../common/PeekGenerator';
import { LexicalException } from './LexicalException';
import { Token } from './Token';

export class Lexer {
  public tokens: Array<Token> = [];
  private readonly source: Generator;

  constructor(source: Generator) {
    this.source = source;
  }

  public analyse() {
    const source = this.source;
    const it = new PeekGenerator(source, '\0');
    while (it.hasNext()) {
      let c = it.next();
      if (c == '\0') {
        break;
      }
      const lookahead = it.peek();
      // console.log(lookahead);
      if (c === ' ' || c === '\n' || c === '\r') {
        continue;
      }
      // handle commit
      if (c === '/') {
        if (lookahead === '/') {
          while (it.hasNext() && (c = it.next()) !== '\n');
        } else if (lookahead === '*') {
          let flag = true;
          while (it.hasNext()) {
            if ((c = it.next()) === '*' && it.peek() === '/') {
              it.next();
              flag = false;
              break;
            }
          }
          if (flag) {
            throw new LexicalException(`cant match commit`)
          }
          continue;
        }
      }

      if (AlphabetHelper.isBracket(c)) {
        debugger
        it.pushBack();
        this.tokens.push(Token.makeBracket(it));
        continue;
      }

      if (c === '"' || c === "'") {
        it.pushBack();
        this.tokens.push(Token.makeString(it));
        continue;
      }

      if (AlphabetHelper.isLiteral(c)) {
        it.pushBack();
        this.tokens.push(Token.makeVarOrKeyword(it));
        continue;
      }

      if (AlphabetHelper.isNumber(c)) {
        it.pushBack();
        this.tokens.push(Token.makeNumber(it));
        continue;
      }

      // 特殊考虑operator的+-号是数字的还是运算符
      if (AlphabetHelper.isOperator(c)) {
        if ((c === '+' || c === '-') && AlphabetHelper.isNumber(lookahead as string)) {
          const lastToken = this.tokens[this.tokens.length - 1];
          if (lastToken == null || !lastToken.isScalar()) {
            it.pushBack();
            this.tokens.push(Token.makeNumber(it));
          }
        } else {
          it.pushBack();
          this.tokens.push(Token.makeOperator(it));
        }
        continue;
      }
    } // end while
    return this.tokens;
  }

  *stream() {
    for (let _ of this.tokens) {
      yield _;
    }
  }
}