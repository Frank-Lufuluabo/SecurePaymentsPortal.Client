import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  accountNumber: string;
  amount: number;
  currency: string;
  recipientAccount: string;
  swiftCode: string;
  verified: boolean;
  submittedToSwift: boolean;
  date: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'verified' | 'submittedToSwift'>) => void;
  setCurrentTransaction: (transaction: Transaction | null) => void;
  verifyTransaction: (id: string) => void;
  submitToSwift: (ids: string[]) => void;
  getCustomerTransactions: (customerId: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'verified' | 'submittedToSwift'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date(),
      verified: false,
      submittedToSwift: false,
    };
    
    setTransactions([...transactions, newTransaction]);
    setCurrentTransaction(newTransaction);
    return newTransaction;
  };

  const verifyTransaction = (id: string) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, verified: true } : transaction
      )
    );
  };

  const submitToSwift = (ids: string[]) => {
    setTransactions(
      transactions.map((transaction) =>
        ids.includes(transaction.id) ? { ...transaction, submittedToSwift: true } : transaction
      )
    );
  };

  const getCustomerTransactions = (customerId: string) => {
    return transactions.filter((transaction) => transaction.customerId === customerId);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        currentTransaction,
        addTransaction,
        setCurrentTransaction,
        verifyTransaction,
        submitToSwift,
        getCustomerTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};