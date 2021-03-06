import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { Token } from './../../lexer/Token';
import { Factor } from './Factor';
export class Scalar extends Factor {
  constructor(token: Token) {
    super(token);
    this.type = ASTNodeTypes.SCALAR;
  }

  get lexeme() {
    return <Token>this._lexeme;
  }

  set lexeme(token: Token) {
    this._lexeme = token;
  }
}
