import assert from 'assert/strict';
import { calculateSettlements } from '../../src/utils/settlementCalculator.js';

let users = [];
let expenses = [];
assert.deepEqual(calculateSettlements(users, expenses), []);

const A = { id: 1, name: 'A' };
const B = { id: 2, name: 'B' };
users = [A, B];
expenses = [{ id: 201, desc: 'X', amount: 100, payer: 1, involved: [1, 3] }];
let s = calculateSettlements(users, expenses);
assert.deepEqual(s, []);

const C = { id: 3, name: 'C' };
users = [A, B, C];
expenses = [{ id: 202, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2, 3] }];
s = calculateSettlements(users, expenses);
assert.equal(s.length, 2);
assert.equal(s[0].amount, '33.33');
assert.equal(s[1].amount, '33.33');

const D = { id: 4, name: 'D' };
users = [A, B, C, D];
expenses = [
  { id: 301, desc: 'E1', amount: 120, payer: 1, involved: [1, 2, 3] },
  { id: 302, desc: 'E2', amount: 60, payer: 4, involved: [2, 3, 4] },
];
s = calculateSettlements(users, expenses);
import { removeUserFromExpenses } from '../../src/utils/stateHelpers.js';
users = [{ id: 1, name: 'Only' }];
expenses = [{ id: 401, desc: 'Solo', amount: 50, payer: 1, involved: [1] }];
let after = removeUserFromExpenses(users, expenses, 1);
assert.equal(after[0].involved.length, 0);
assert.equal(after[0].payer, null);

console.log('All additional settlement tests passed');
