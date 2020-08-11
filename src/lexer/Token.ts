import { TokenType } from './../contants/TokenTypes';

import { keywords } from './../contants/KeyWords';
import { PeekGenerator } from './../common/PeekGenerator';
import { AlphabetHelper } from './AlphabetHelper';
import { Emnu } from './../common/Emnu';
import { LexicalException } from './LexicalException';
export class Token {
  private _type: Emnu;
  private _value: string;
  constructor(type: Emnu, value: string) {
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
    return this._type == TokenType.INTEGER ||
      this._type == TokenType.FLOAT ||
      this._type == TokenType.STRING ||
      this._type == TokenType.BOOLEAN
  }

  toString() {
    return `type ${this._type.type}, value ${this._value}`
  }

  static makeVarOrKeyword(it: PeekGenerator<string>) {

    let s = "";
    while (it.hasNext()) {
      const c = it.peek() as string;
      if (AlphabetHelper.isLiteral(c)) {
        s += c
      } else {
        break;
      }
      it.next();
    }

    if (keywords.has(s)) {
      return new Token(TokenType.KEYWORD, s);
    }
    if (s === "true" || s === "false") {
      return new Token(TokenType.BOOLEAN, s);
    }

    return new Token(TokenType.VARIABLE, s);

  }

  static makeString(it: PeekGenerator<string>) {
    let s = "";
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
    throw new LexicalException('unexpected error')
  }

  static makeOperator(it: PeekGenerator<string>) {
    let state = 0;
    while (it.hasNext()) {
      let lookahead = it.next();
      switch (state) {
        case 0:
          switch (lookahead) {
            case "+":
              state = 1;
              break;
            case "-":
              state = 2;
              break;
            case "*":
              state = 3;
              break;
            case "/":
              state = 4;
              break;
            case ">":
              state = 5;
              break;
            case "<":
              state = 6;
              break;
            case "=":
              state = 7;
              break;
            case "!":
              state = 8;
              break;
            case "&":
              state = 9;
              break;
            case "|":
              state = 10;
              break;
            case "^":
              state = 11;
              break;
            case "%":
              state = 12;
              break;
            case ",":
              return new Token(TokenType.OPERATOR, ",");
            case ";":
              return new Token(TokenType.OPERATOR, ";");
          }
          break;
        case 1:
          if (lookahead == "+") {
            return new Token(TokenType.OPERATOR, "++");
          } else if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "+=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "+");
          }

        case 2:
          if (lookahead == "-") {
            return new Token(TokenType.OPERATOR, "--");
          } else if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "-=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "-");
          }
        case 3:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "*=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "*");
          }
        case 4:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "/=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "/");
          }
        case 5:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, ">=");
          } else if (lookahead == ">") {
            return new Token(TokenType.OPERATOR, ">>");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, ">");
          }
        case 6:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "<=");
          } else if (lookahead == "<") {
            return new Token(TokenType.OPERATOR, "<<");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "<");
          }
        case 7:
          if (lookahead == "=") {
            state = 13;
            continue;
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "=");
          }

        case 8:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "!=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "!");
          }
        case 9:
          if (lookahead == "&") {
            return new Token(TokenType.OPERATOR, "&&");
          } else if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "&=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "&");
          }
        case 10:
          if (lookahead == "|") {
            return new Token(TokenType.OPERATOR, "||");
          } else if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "|=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "|");
          }
        case 11:
          if (lookahead == "^") {
            return new Token(TokenType.OPERATOR, "^^");
          } else if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "^=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "^");
          }
        case 12:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "%=");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "%");
          }
        case 13:
          if (lookahead == "=") {
            return new Token(TokenType.OPERATOR, "===");
          } else {
            it.pushBack();
            return new Token(TokenType.OPERATOR, "==");
          }
      }
    } // end while

    throw new LexicalException("Unexpected error");
  }

  static makeNumber(it: PeekGenerator<string>) {
    let s = "";
    let state = 0;
    while (it.hasNext()) {
      const lookahead = it.peek();
      switch (state) {
        case 1:
          if (AlphabetHelper.isNumber(<string>lookahead) && lookahead !== '0') {
            state = 1;
          } else if (lookahead === '.') {
            state = 2
          } else if (lookahead === '+' || lookahead === '-') {
            state = 3;
          } else if (lookahead === '0') {
            state = 4;
          }
          break;
      }
    }
  }


}
