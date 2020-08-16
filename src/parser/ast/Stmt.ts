import { Emnu } from './../../common/Emnu';
import { ASTNode } from './ASTNode';


export class Stmt extends ASTNode {
  constructor(type: string, label: string) {
    super(type, label);
  }
}