import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { Stmt } from './Stmt';


export class Block extends Stmt {
  constructor() {
    super(ASTNodeTypes.BLOCK, 'block');
  }
}