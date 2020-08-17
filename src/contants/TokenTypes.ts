import { Emnu } from '../common/Emnu';

export enum TokenType {
  KEYWORD = 'keyword',
  VARIABLE = 'variable',
  OPERATOR = 'operator',
  BRACKET = 'bracket',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  NULL = 'null',
}

// Object.freeze(TokenType);
