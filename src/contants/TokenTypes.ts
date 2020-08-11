import { Emnu } from '../common/Emnu';

export const TokenType = {
  KEYWORD: new Emnu('KEYWORD'),
  VARIABLE: new Emnu('VARIABLE'),
  OPERATOR: new Emnu('OPERATOR'),
  BRACKET: new Emnu('BRACKET'),
  INTEGER: new Emnu('INTEGER'),
  FLOAT: new Emnu('FLOAT'),
  BOOLEAN: new Emnu('BOOLEAN'),
  STRING: new Emnu('STRING')
}

Object.freeze(TokenType);