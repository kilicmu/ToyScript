import { Token } from './../../lexer/Token';
import { ASTNode } from './ASTNode';


export class Factor extends ASTNode {
  constructor(token: Token) {
    super(token.type, token.value);
    this.lexeme = token;
  }

  get type() {
    return <string>this._type;
  }

  set type(type: string) {
    this._type = type
  }


}