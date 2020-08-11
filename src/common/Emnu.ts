let value = 0;
export class Emnu {
  private _type: string;
  private _value: number;
  constructor(type: string) {
    this._type = type;
    this._value = value++;
  }
  get type() {
    return this._type;
  }
  public toString() {
    return this.type;
  }
}
