import { describe, it, expect } from 'vitest';
import { calculateSettlements } from '../../src/utils/settlementCalculator';

describe('calculateSettlements', () => {
  it('returns empty for no users', () => {
    expect(calculateSettlements([], [])).toEqual([]);
  });

  it('ignores unknown involved ids', () => {
    const A = { id: 1, name: 'A' };
    const B = { id: 2, name: 'B' };
    const users = [A, B];
    const expenses = [{ id: 201, desc: 'X', amount: 100, payer: 1, involved: [1, 3] }];
    const s = calculateSettlements(users, expenses);
    expect(s).toEqual([]);
  });

  it('rounding for three people splits correctly', () => {
    const A = { id: 1, name: 'A' };
    const B = { id: 2, name: 'B' };
    const C = { id: 3, name: 'C' };
    const users = [A, B, C];
    const expenses = [{ id: 202, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2, 3] }];
    const s = calculateSettlements(users, expenses);
    expect(s.length).toBe(2);
    expect(s[0].amount).toBe('33.33');
  });
});
