const math = require('..');

describe('math', () => {
  test('add', function () {
    expect(math.add(1, 2)).toBe(3);
  });

  test('sub', function () {
    expect(math.sub(1, 2)).toBe(-1);
  });
});

