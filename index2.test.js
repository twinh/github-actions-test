import {sum, sub} from './index2'

describe('test', () => {
  it('should return sum result', function () {
    expect(sum(1, 2)).toBe(3);
  });

  it('should return sub result', function () {
    expect(sub(2, 1)).toBe(1);
  });
});