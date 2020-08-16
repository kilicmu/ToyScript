import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { Stmt } from './Stmt';

export class ForStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.FOR_STMT, 'for')
  }
}