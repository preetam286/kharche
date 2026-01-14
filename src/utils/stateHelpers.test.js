import { describe, it, expect } from 'vitest';
import { cleanStoredExpenses, removeUserFromExpenses } from './stateHelpers';

describe('stateHelpers', () => {
  it('cleanStoredExpenses removes unknown ids and coerces payer', () => {
    const storedUsers = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
    const storedExpenses = [{ id: 10, payer: 1, amount: 90, involved: [1, 2, 4] }];
    const cleaned = cleanStoredExpenses(storedUsers, storedExpenses);
    expect(cleaned[0].involved).toEqual([1, 2]);
    expect([1, 2]).toContain(cleaned[0].payer);
  });

  it('removeUserFromExpenses updates involved and reassigns payer', () => {
    const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expenses = [
      { id: 1, payer: 1, involved: [1, 2, 3] },
      { id: 2, payer: 3, involved: [2, 3] },
    ];
    const after = removeUserFromExpenses(users, expenses, 3);
    expect(after[0].involved).toEqual([1, 2]);
    expect(after[0].payer).toBe(1);
    expect(after[1].involved).toEqual([2]);
    expect(after[1].payer).toBe(1);
  });
});
