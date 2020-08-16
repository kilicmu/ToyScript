import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { Stmt } from './Stmt';


export class ReturnStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.RETURN_STMT, "return")
  }
}
