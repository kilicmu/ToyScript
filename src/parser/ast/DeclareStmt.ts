import { Stmt } from './Stmt';
import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
export class DeclareStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.DECLARE_STMT, 'declare')
  }

}