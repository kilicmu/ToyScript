import { PeekGenerator } from './../src/common/PeekGenerator';
import { array2Gen } from '../src/common/array2Gen';
import { equal } from '../src/common/equal';


describe('PeekGenerator test', () => {
  const str = "abcdefghijklmnopqrstuvwxyz";
  let gen: Generator;
  let iter: PeekGenerator<string>;

  beforeEach(() => {
    gen = array2Gen(str);
    iter = new PeekGenerator<string>(gen, '\0');
  })

  it('pushBack test', () => {
    equal(iter.next(), 'a');
    iter.pushBack();
    equal(iter.next(), 'a');
    equal(iter.next(), 'b');
    equal(iter.next(), 'c');
    iter.pushBack();
    equal(iter.peek(), 'c');
  })

  it('peek test', () => {
    equal(iter.peek(), 'a');
    equal(iter.next(), 'a');
    equal(iter.peek(), 'b');
    equal(iter.next(), 'b');
    equal(iter.next(), 'c');
    equal(iter.peek(), 'd');
  })

  it('end Token test', () => {
    for (let i of str) {
      equal(iter.next(), i);
    }
    equal(iter.hasNext(), '\0');
    equal(iter.next(), '\0');
    equal(iter.hasNext(), false);
  })
})
