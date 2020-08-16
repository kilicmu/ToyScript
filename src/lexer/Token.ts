import { TokenType } from './../contants/TokenTypes';

import { keywords } from './../contants/KeyWords';
import { PeekGenerator } from './../common/PeekGenerator';
import { AlphabetHelper } from './AlphabetHelper';
import { Emnu } from './../common/Emnu';
import { LexicalException } from './LexicalException';
export class Token {
  private _type: string;
  private _value: string;
  constructor(type: string, value: string) {
    this._type = type;
    this._value = value;
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }

  isVariable() {
    return this._type == TokenType.VARIABLE;
  }

  isScalar() {
    return (
      this._type == TokenType.INTEGER ||
      this._type == TokenType.STRING ||
      this._type == TokenType.BOOLEAN
    );
  }

  toString() {
    return `type ${this._type}, value ${this._value}`;
  }

  static makeVarOrKeyword(it: PeekGenerator<string>) {
    let s = '';
    while (it.hasNext()) {
      const c = it.peek() as string;
      if (AlphabetHelper.isLiteral(c)) {
        s += c;
      } else {
        break;
      }
      it.next();
    }

    if (keywords.has(s)) {
      return new Token(TokenType.KEYWORD, s);
    }
    if (s === 'true' || s === 'false') {
      return new Token(TokenType.BOOLEAN, s);
    }

    if (s === 'null') {
      return new Token(TokenType.NULL, s);
    }

    return new Token(TokenType.VARIABLE, s);
  }

  static makeString(it: PeekGenerator<string>) {
    let s = '';
    let state = 0;
    while (it.hasNext()) {
      const c = it.next();
      switch (state) {
        case 0:
          if (c === '"') {
            state = 1;
          } else {
            state = 2;
          }
          s += c;
          break;
        case 1:
          if (c == '"') {
            return new Token(TokenType.STRING, s + c);
          } else {
            s += c;
          }
          break;
        case 2:
          if (c == "'") {
            return new Token(TokenType.STRING, s + c);
          } else {
            s += c;
          }
          break;
      }
    } // while end
    throw new LexicalException('unexpected error');
  }

  static makeOperator(it: PeekGenerator<string>) {
    let state = 0;
    while (it.hasNext()) {
      let lookahead = it.next();
      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1;
              break;
            case '-':
              state = 2;
              break;
            case '*':
              state = 3;
              break;
            case '/':
              state = 4;
              break;
            case '>':
              state = 5;
              break;
            case '<':
              state = 6;
              break;
            case '=':
              state = 7;
              break;
            case '!':
              state = 8;
              break;
            case '&':
              state = 9;
              break;
            case '|':
              state = 10;
              break;
            case '^':
              state = 11;
              break;
            case '%':
              state = 12;
              break;
            case ',':
              return new Token(TokenType.OPERATOR, ',');
            case ';':
              return new Token(TokenType.OPERATOR, ';');
          }
          break;
        case 1:
          if (lookahead == '+') {
            return new Token(TokenType.OPERATOR, '++');
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '+=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '+');
          }

        case 2:
          if (lookahead == '-') {
            return new Token(TokenType.OPERATOR, '--');
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '-=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '-');
          }
        case 3:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '*=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '*');
          }
        case 4:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '/=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '/');
          }
        case 5:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '>=');
          } else if (lookahead == '>') {
            return new Token(TokenType.OPERATOR, '>>');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '>');
          }
        case 6:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '<=');
          } else if (lookahead == '<') {
            return new Token(TokenType.OPERATOR, '<<');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '<');
          }
        case 7:
          if (lookahead == '=') {
            state = 13;
            continue;
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '=');
          }

        case 8:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '!=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '!');
          }
        case 9:
          if (lookahead == '&') {
            return new Token(TokenType.OPERATOR, '&&');
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '&=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '&');
          }
        case 10:
          if (lookahead == '|') {
            return new Token(TokenType.OPERATOR, '||');
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '|=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '|');
          }
        case 11:
          if (lookahead == '^') {
            return new Token(TokenType.OPERATOR, '^^');
          } else if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '^=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '^');
          }
        case 12:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '%=');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '%');
          }
        case 13:
          if (lookahead == '=') {
            return new Token(TokenType.OPERATOR, '===');
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, '==');
          }
      }
    } // end while

    throw new LexicalException('Unexpected error');
  }

  static makeNumber(it: PeekGenerator<string>) {
    let s = '';
    let state = 0;
    while (it.hasNext()) {
      const lookahead = it.next();
      switch (state) {
        case 0:
          if (AlphabetHelper.isNumber(<string>lookahead) && lookahead !== '0') {
            s += lookahead;
            state = 1;
          } else if (lookahead === '.') {
            s += lookahead;
            state = 2;
          } else if (lookahead === '+' || lookahead === '-') {
            s += lookahead;
            state = 1;
          } else if (lookahead === '0') {
            s += lookahead;
            state = 3;
          }
          break;
        case 1:
          if (AlphabetHelper.isNumber(<string>lookahead)) {
            s += lookahead;
            break;
          } else if (lookahead === '.') {
            s += lookahead;
            break;
          } else {
            it.pushBack();
            return new Token(TokenType.NUMBER, s);
          }
        case 2:
          // console.log(lookahead, AlphabetHelper.isNumber(<string>lookahead));
          if (AlphabetHelper.isNumber(<string>lookahead)) {
            s += lookahead;
            state = 1;
            break;
          } else {
            throw new LexicalException(`Unexpected token: ${lookahead}`);
          }
        case 3:
          if (lookahead === '0') {
            // s += lookahead;
            state = 4;
            break;
          } else if (lookahead === '.') {
            s += lookahead;
            state = 1;
            break;
          } else {
            throw new LexicalException(`Unexpected token: ${s}`);
          }
        case 4:
          if (lookahead === '0') {
            break;
          } else if (AlphabetHelper.isNumber(<string>lookahead)) {
            // != 0
            s += lookahead;
            s = s.slice(1); // 截取第一个0
            break;
          } else if (lookahead === '.') {
            throw new LexicalException(`Unexpected number`);
          } else {
            it.pushBack();
            return new Token(TokenType.NUMBER, s);
          }
        case 5:
          if (AlphabetHelper.isNumber(<string>lookahead)) {
            s += lookahead;
            break;
          } else if (s === '.') {
            throw new LexicalException(`Unexpected number`);
          } else {
            it.pushBack();
            return new Token(TokenType.NUMBER, s);
          }
      }
    } // end while
    throw new LexicalException(`Unexpected error`);
  }

  static makeBracket(it: PeekGenerator<string>) {
    const bracket = it.next();
    return new Token(TokenType.BRACKET, bracket as string);
  }
}
