export class LexicalException extends Error {
  constructor(msg: string | undefined) {
    super(msg);
  }

  static fromChar(c: string) {
    return new LexicalException(`LexicalException: Unexpected token ${c}`);
  }
}