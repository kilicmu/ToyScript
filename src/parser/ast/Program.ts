import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
import { ASTNode } from './ASTNode';


class Program extends ASTNode {
  constructor() {
    super(ASTNodeTypes.PROGRAM, "program")
  }
}
