import { Token } from './../../lexer/Token';
import { Emnu } from './../../common/Emnu';
import { ASTNodeTypes } from './../../contants/ASTNodeTypes';
export class ASTNode {
  protected _children: Array<ASTNode> = [];
  protected _parent: ASTNode | null = null;
  protected _lexeme: Token | null = null;
  protected _type: string | null = null;
  protected _label: string | null = "";
  protected _props: object = {};
  constructor(type: string | null = null, label: string | null = null) {
    this._type = type;
    this._label = label;
  }

  addChild(child: ASTNode) {
    this._children.push(child);
  }

  getChild(index: number) {
    return this._children[index];
  }

  isValueType() {
    return this._type == ASTNodeTypes.VARIABLE ||
      this._type == ASTNodeTypes.SCALAR
  }

  get label() {
    return this._label;
  }

  set label(_label: string | null) {
    this._label = _label;
  }

  set lexeme(lexeme: Token) {
    this._lexeme = lexeme;
  }

  get type() {
    return this._type;
  }

  set type(type: string | null) {
    this._type = type;
  }

  get parent() {
    return this._parent;
  }

  set parent(node: ASTNode | null) {
    this._parent = node;
  }

}