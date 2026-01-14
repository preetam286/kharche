// Pure helpers for cleaning stored expenses and removing a user from expenses
export const cleanStoredExpenses = (storedUsers, storedExpenses) => {
  const userIds = new Set(storedUsers.map((u) => u.id));
  return storedExpenses.map((exp) => ({
    ...exp,
    involved: Array.isArray(exp.involved) ? exp.involved.filter((id) => userIds.has(id)) : [],
    payer: userIds.has(exp.payer) ? exp.payer : storedUsers[0]?.id || null,
  }));
};

export const removeUserFromExpenses = (users, expenses, removedUserId) => {
  const nextUsers = users.filter((u) => u.id !== removedUserId);
  return expenses.map((exp) => {
    const newInvolved = Array.isArray(exp.involved) ? exp.involved.filter((uid) => uid !== removedUserId) : [];
    const newPayer = exp.payer === removedUserId ? (nextUsers.length > 0 ? nextUsers[0].id : null) : exp.payer;
    return { ...exp, involved: newInvolved, payer: newPayer };
  });
};
