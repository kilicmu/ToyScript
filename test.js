function co (gen) {

  return new Promise((resolve, reject) => {
    function next (val) {
      let { value, done } = gen.next(val);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(res => {
          next(res);
        })
      }
    }
    next();
  })
}

const p1 = new Promise((resolve, reject) => {
  resolve(1);
})

const p2 = new Promise((resolve, reject) => {
  resolve(2);
})

const p3 = new Promise((resolve, reject) => {
  resolve(3);
})

function* gen () {
  let v1 = yield p1;
  let v2 = yield p2;
  let v3 = yield p3;
  return v1 + v2 + v3;
}
// gen.then()
co(gen()).then(res => { console.log("res:  ", res) })