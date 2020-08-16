import { Emnu } from './Emnu';
import { Token } from './../lexer/Token';
import { assert } from 'chai';

export function equal(a: any, b: any) {
  return assert.equal(a, b);
}

export function checkToken(token: Token, type: string, value: string) {
  equal(token.type, type);
  equal(token.value, value);
}