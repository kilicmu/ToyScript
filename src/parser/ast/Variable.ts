import { Factor } from './Factor';
import { Token } from './../../lexer/Token';
import { ASTNodeTypes } from './../../contants/ASTNodeTypes';

class Variable extends Factor {

  private _typeLexeme: Token | null = null;

  constructor(token: Token) {
    super(token)
    this.type = ASTNodeTypes.VARIABLE
    this._typeLexeme = null
  }


  set typeLexeme(lexeme: Token) {
    this.typeLexeme = lexeme
  }

  get typeLexeme() {
    return this.typeLexeme
  }



}
