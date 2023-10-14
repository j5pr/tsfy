import { toUnknown, unknownList } from '../../src/types/unknown';

describe('toUnknown', () => {
  it('should return the value as unknown', () => {
    const value = 'hello';
    const result = toUnknown(value);
    expect(result).toBe(value);
  });
});

describe('unknownList', () => {
  describe('when given a list of unknowns', () => {
    it('should return the list as unknown', () => {
      const list = [1, 'hello', true];
      const result = unknownList(list);
      expect(result).toBe(list);
    });
  });

  describe('when given an undefined list', () => {
    it('should return undefined', () => {
      const result = unknownList(undefined);
      expect(result).toBeUndefined();
    });
  });
});
