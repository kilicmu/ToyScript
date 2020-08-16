import { Emnu } from './../../common/Emnu';
import { ASTNode } from './ASTNode';
import { Token } from './../../lexer/Token';
export class Expr extends ASTNode {
  constructor() {
    super();
  }

  static fromToken(type: string, token: Token) {
    const expr = new Expr();
    expr.label = token.value;
    expr.lexeme = token;
    expr.type = type;
    return expr;
  }
}