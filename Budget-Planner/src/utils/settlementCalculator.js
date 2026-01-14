/**
 * Calculates settlements between users based on expenses
 * Uses a greedy algorithm to minimize the number of transactions
 */
export const calculateSettlements = (users, expenses) => {
  const balances = {};

  // Initialize 0 balance for everyone
  users.forEach((u) => (balances[u.id] = 0));

  // 1. Calculate Net Balance
  expenses.forEach((exp) => {
    const splitAmount = exp.amount / exp.involved.length;

    // Payer gets positive (they are owed money)
    if (balances[exp.payer] !== undefined) {
      balances[exp.payer] += exp.amount;
    }

    // Involved people get negative (they owe money)
    exp.involved.forEach((userId) => {
      if (balances[userId] !== undefined) {
        balances[userId] -= splitAmount;
      }
    });
  });

  // 2. Separate into Debtors and Creditors
  let debtors = [];
  let creditors = [];

  Object.keys(balances).forEach((id) => {
    const amount = balances[id];
    // Round to 2 decimals to handle floating point errors
    const rounded = Math.round(amount * 100) / 100;

    if (rounded < -0.01) debtors.push({ id: parseInt(id), amount: rounded });
    if (rounded > 0.01) creditors.push({ id: parseInt(id), amount: rounded });
  });

  // 3. Sort by magnitude (Greedy approach)
  // Debtors: Ascending (Most negative first) -> -100 before -10
  debtors.sort((a, b) => a.amount - b.amount);
  // Creditors: Descending (Most positive first) -> 100 before 10
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements = [];

  // 4. Match them up
  let i = 0; // debtor index
  let j = 0; // creditor index

  while (i < debtors.length && j < creditors.length) {
    let debtor = debtors[i];
    let creditor = creditors[j];

    // The amount to move is the minimum of (absolute debt) and (available credit)
    let amountToSettle = Math.min(Math.abs(debtor.amount), creditor.amount);

    // Get Names
    const debtorName = users.find((u) => u.id === debtor.id)?.name || 'Unknown';
    const creditorName = users.find((u) => u.id === creditor.id)?.name || 'Unknown';

    settlements.push({
      from: debtorName,
      to: creditorName,
      amount: amountToSettle.toFixed(2),
    });

    // Adjust remaining math
    debtor.amount += amountToSettle;
    creditor.amount -= amountToSettle;

    // Check if settled (using small epsilon for float safety)
    if (Math.abs(debtor.amount) < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }

  return settlements;
};
