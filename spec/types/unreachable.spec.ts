import { unreachable } from '../../src/types/unreachable';

describe('unreachable', () => {
  function stringify(n: number): string {
    switch (n) {
      case 0:
        return 'zero';
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
    }

    return unreachable();
  }

  it('should throw an error', () => {
    expect(unreachable).toThrowError();
  });

  it('should not throw an error', () => {
    for (let i = 0; i < 4; i++) expect(() => stringify(i)).toBeTruthy();
  });

  it('should throw an error', () => {
    for (let i = 4; i < 10; i++) expect(() => stringify(i)).toThrowError();
  });
});
