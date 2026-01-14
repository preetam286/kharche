import { useState } from 'react';

export const useExpenseState = (initialUsers) => {
  const [users, setUsers] = useState(initialUsers);
  const [expenses, setExpenses] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(() => (initialUsers.length > 0 ? initialUsers[0].id : ''));
  const [involvedUsers, setInvolvedUsers] = useState(() => initialUsers.map((u) => u.id));
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const addUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    const newUser = { id: Date.now(), name: newUserName.trim() };
    setUsers((prev) => [...prev, newUser]);
    setInvolvedUsers((prev) => [...prev, newUser.id]);
    setPayer((prev) => prev || newUser.id);
    setNewUserName('');
  };

  const removeUser = (id) => {
    const nextUsers = users.filter((u) => u.id !== id);
    setUsers(nextUsers);
    setInvolvedUsers((prev) => prev.filter((uid) => uid !== id));
    if (payer === id) {
      setPayer(nextUsers.length > 0 ? nextUsers[0].id : '');
    }
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!amount || !desc || involvedUsers.length === 0) return;

    const newExpense = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
      payer: parseInt(payer),
      involved: involvedUsers,
    };

    setExpenses([...expenses, newExpense]);

    // Reset form
    setDesc('');
    setAmount('');
    setInvolvedUsers(users.map((u) => u.id));
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const toggleInvolved = (userId) => {
    if (involvedUsers.includes(userId)) {
      setInvolvedUsers(involvedUsers.filter((id) => id !== userId));
    } else {
      setInvolvedUsers([...involvedUsers, userId]);
    }
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e)));
    setEditingExpenseId(null);
  };

  return {
    users,
    expenses,
    newUserName,
    desc,
    amount,
    payer,
    involvedUsers,
    editingExpenseId,
    setNewUserName,
    setDesc,
    setAmount,
    setPayer,
    setInvolvedUsers,
    setEditingExpenseId,
    addUser,
    removeUser,
    addExpense,
    removeExpense,
    toggleInvolved,
    updateExpense,
  };
};
