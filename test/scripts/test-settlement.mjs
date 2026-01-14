import { calculateSettlements } from '../../src/utils/settlementCalculator.js';

const A = { id: 1, name: 'A' };
const B = { id: 2, name: 'B' };
const C = { id: 3, name: 'C' };

let users = [A, B];
let expenses = [{ id: 101, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2] }];
console.log('Scenario 1:', calculateSettlements(users, expenses));

users = [A, B, C];
expenses = [{ id: 101, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2, 3] }];
console.log('Scenario 2:', calculateSettlements(users, expenses));

users = [A, B, C];
expenses = [{ id: 101, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2] }];
console.log('Scenario 3:', calculateSettlements(users, expenses));

users = [A, B];
expenses = [{ id: 101, desc: 'Dinner', amount: 100, payer: 1, involved: [1, 2, 4] }];
console.log('Scenario 4:', calculateSettlements(users, expenses));
