export interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    category: string;
    userId: string;
    date: string;
  }