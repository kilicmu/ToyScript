export class AlphabetHelper {
  static ptnLetter: RegExp = /^[a-zA-Z]$/; // 字母
  static ptnNumber: RegExp = /^[0-9]$/;
  static ptnLiteral: RegExp = /^[_a-zA-Z0-9]$/; // 字符
  //这里需要注意一下*的转义位置，放在/前面会匹配任意数字字符（幸亏写了测试用例）
  // 这个奇葩问题：/[+-\\*]/.test('2') => true;
  static operator: RegExp = /^[+-/\\*>=<!&%|^]$/; // 运算符 
  static isLetter(c: string) {
    return AlphabetHelper.ptnLetter.test(c);
  }

  static isNumber(c: string): boolean {
    return AlphabetHelper.ptnNumber.test(c);
  }

  static isLiteral(c: string) {
    return AlphabetHelper.ptnLiteral.test(c);
  }

  static isOperator(c: string) {
    console.log(c);
    return AlphabetHelper.operator.test(c);
  }
}