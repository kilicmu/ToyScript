class T1 {
  [ Symbol.toPrimitive ] () {
    return 1;
  }
}


class T2 {
  [ Symbol.toPrimitive ] () {
    return 2;
  }
}

console.log(new T1() == 1)