import { ParseException } from '../parser/exceptions/ParseException ';
import { Token } from './../lexer/Token';
import { PeekGenerator } from './PeekGenerator';


export class PeekTokenGenerator<T extends Token> extends PeekGenerator<T>{
  constructor(it: Generator) {
    super(it);
  }

  nextMatch(value: string) {
    const token = this.it.next() as T;
    if (value !== token.value) {
      throw ParseException.fromToken(token);
    }

  }
}