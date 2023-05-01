import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is a string', () =>{
    expect(convertPLNToUSD('one hundred')).toBeNaN();
    expect(convertPLNToUSD('0')).toBeNaN();
    expect(convertPLNToUSD('3')).toBeNaN();
  });
  it('should return Error when input is not a number or string', () => {
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  })
  it('should return 0 when input value is lower than 0 ', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-2.33)).toBe('$0.00');
    expect(convertPLNToUSD(-5.234)).toBe('$0.00');
    expect(convertPLNToUSD(-1345.43234)).toBe('$0.00');
  })
});