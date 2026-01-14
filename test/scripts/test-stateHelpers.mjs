import assert from 'assert/strict';
import { cleanStoredExpenses, removeUserFromExpenses } from '../../src/utils/stateHelpers.js';

const users = [ { id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' } ];
const expenses = [
  { id: 10, payer: 1, amount: 90, involved: [1,2,3] },
  { id: 11, payer: 3, amount: 30, involved: [2,3] },
];

const storedUsers = [ { id: '1', name: 'A' }, { id: '2', name: 'B' } ];
const storedExpenses = [ { id: '10', payer: '1', amount: '90', involved: ['1','2','4'] } ];
const cleaned = cleanStoredExpenses(storedUsers.map(u=>({...u, id: Number(u.id)})), storedExpenses.map(e=>({ ...e, id: Number(e.id), payer: Number(e.payer), amount: Number(e.amount), involved: e.involved.map(Number) })));
assert.deepEqual(cleaned[0].involved, [1,2]);
assert.ok([1,2].includes(cleaned[0].payer));

const afterRemoval = removeUserFromExpenses(users, expenses, 3);
assert.deepEqual(afterRemoval[0].involved, [1,2]);
assert.equal(afterRemoval[0].payer, 1);
assert.deepEqual(afterRemoval[1].involved, [2]);
assert.equal(afterRemoval[1].payer, 1);

console.log('All state helper tests passed');
