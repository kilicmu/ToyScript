import { Stmt } from './Stmt';
import { ASTNodeTypes } from './../../contants/ASTNodeTypes';

export class FunctionDeclareStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.FUNCTION_DECLARE_STMT, 'func')
  }

}