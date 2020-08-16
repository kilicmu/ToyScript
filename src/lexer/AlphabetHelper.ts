// import { AlphabetHelper } from './AlphabetHelper';
export class AlphabetHelper {
  static ptnLetter: RegExp = /^[a-zA-Z]$/; // 字母
  static ptnNumber: RegExp = /^[0-9]$/;
  static ptnLiteral: RegExp = /^[_a-zA-Z0-9]$/; // 字符
  //这里需要注意一下*的转义位置，放在/前面会匹配任意数字字符（幸亏写了测试用例）
  // 这个奇葩问题：/[+-\\*]/.test('2') => true;
  static operator: RegExp = /^[+-/\\*>=<!&%|^]$/; // 运算符 
  static bracket: RegExp = /^[\{\}\[\]\(\)]$/;
  static isLetter(c: string | null) {
    if (c == null) return false;
    return AlphabetHelper.ptnLetter.test(c);
  }

  static isNumber(c: string | null): boolean {
    if (c == null) return false;
    return AlphabetHelper.ptnNumber.test(c);
  }

  static isLiteral(c: string | null) {
    if (c == null) return false;
    return AlphabetHelper.ptnLiteral.test(c);
  }

  static isOperator(c: string | null) {
    if (c == null) return false;
    return AlphabetHelper.operator.test(c);
  }

  static isBracket(c: string | null) {
    if (c == null) return false;
    return AlphabetHelper.bracket.test(c);
  }
}