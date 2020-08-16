import { Token } from './../../lexer/Token';


export class ParseException extends Error {
  constructor(msg: string) {
    super(msg)
  }

  static fromToken(token: Token) {
    return new ParseException(`Synctax Error, unexpected token ${token.value}`)
  }
}