import { Stmt } from './Stmt';
import { ASTNodeTypes } from './../../contants/ASTNodeTypes';

export class IfStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.IF_STMT, "if");
  }
}
