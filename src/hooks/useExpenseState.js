import { useState, useEffect, useRef } from 'react';
import { cleanStoredExpenses, removeUserFromExpenses } from '../utils/stateHelpers';

const STORAGE_KEY = 'kharche:expense-splitter:v1';
const STORAGE_VERSION = 1;

export const useExpenseState = (initialUsers) => {
  const loadStored = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== STORAGE_VERSION) return null;
      const storedUsers = Array.isArray(parsed.users)
        ? parsed.users.map((u) => ({ ...u, id: Number(u.id) }))
        : null;
      const storedExpenses = Array.isArray(parsed.expenses)
        ? parsed.expenses.map((exp) => ({
            ...exp,
            id: Number(exp.id),
            payer: Number(exp.payer),
            amount: Number(exp.amount),
            involved: Array.isArray(exp.involved) ? exp.involved.map(Number) : [],
          }))
        : null;
      if (storedUsers && storedExpenses) {
        const cleaned = cleanStoredExpenses(storedUsers, storedExpenses);
        return { users: storedUsers, expenses: cleaned };
      }
    } catch (e) {
      // ignore parse errors and fall back to defaults
    }
    return null;
  };

  const stored = typeof window !== 'undefined' ? loadStored() : null;

  const [users, setUsers] = useState(() => (stored ? stored.users : initialUsers));
  const [expenses, setExpenses] = useState(() => (stored ? stored.expenses : []));
  const [newUserName, setNewUserName] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(() => (users && users.length > 0 ? users[0].id : ''));
  const [involvedUsers, setInvolvedUsers] = useState(() => (users ? users.map((u) => u.id) : []));
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const saveTimeout = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      try {
        const payload = { version: STORAGE_VERSION, users, expenses };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        // ignore storage errors
      }
    }, 400);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [users, expenses]);

  // Sync across tabs and handle clear
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : null;
        if (parsed && parsed.version === STORAGE_VERSION) {
          if (Array.isArray(parsed.users)) setUsers(parsed.users.map((u) => ({ ...u, id: Number(u.id) })));
          if (Array.isArray(parsed.expenses))
            setExpenses(
              parsed.expenses.map((exp) => ({
                ...exp,
                id: Number(exp.id),
                payer: Number(exp.payer),
                amount: Number(exp.amount),
                involved: Array.isArray(exp.involved) ? exp.involved.map(Number) : [],
              }))
            );
        } else if (parsed === null) {
          // storage was removed
          setUsers(initialUsers);
          setExpenses([]);
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [initialUsers]);

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

    // Remove user from any existing expenses' involved arrays, and reassign payer if needed
    setExpenses((prevExpenses) => removeUserFromExpenses(users, prevExpenses, id));

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

  const resetState = () => {
    setUsers(initialUsers);
    setExpenses([]);
    setNewUserName('');
    setDesc('');
    setAmount('');
    setPayer(initialUsers.length > 0 ? initialUsers[0].id : '');
    setInvolvedUsers(initialUsers.map((u) => u.id));
    setEditingExpenseId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
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
    resetState,
  };
};
