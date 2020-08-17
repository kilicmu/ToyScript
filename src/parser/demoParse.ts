import { ASTNode } from './ast/ASTNode';
import { Scalar } from './ast/Scalar';
import { PeekTokenGenerator } from './../common/PeekTokenGenerator';
import { Token } from './../lexer/Token';
import { Expr } from './ast/Expr';

export class DemoParser {
  static parse(it: PeekTokenGenerator<Token>) {
    const token = it.next();
    const scaler = new Scalar(token);
    if (!it.hasNext()) {
      return scaler;
    }
    const op = it.nextMatch('+');
    const expr = Expr.fromToken(op.type, op);
    expr.parent = null;
    expr.addChild(scaler);
    expr.label = '+';
    expr.addChild(DemoParser.parse(it));
    return expr;
  }
}
