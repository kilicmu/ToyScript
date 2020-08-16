import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { Stmt } from './Stmt';
export class AssignStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.ASSIGN_STMT, "assign");
  }
}