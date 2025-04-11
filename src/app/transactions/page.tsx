"use client";
import React, { useState, useEffect } from "react";
import api from "../../../core/axios";
import { getUserId } from "../../../lib/getUserId";
import { Button, InputAdornment } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
//import { useRouter } from "next/router";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  userId: string;
  date: string;
}

const CATEGORIES = [
  "INCOME",
  "RENT",
  "FOOD",
  "TRANSPORT",
  "ENTERTAINMENT",
  "UTILITIES",
  "EDUCATION",
  "OTHER"
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);
  //const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const userId = getUserId();
      const res = await api.get("/transaction", {
        params: { userId },
      });
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      amount: 0,
      type: 'EXPENSE',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date.split('T')[0]
    });
    setEditModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = getUserId();
      const payload = {
        ...formData,
        userId : userId
      };

      console.log(userId);

      console.log("formData:",formData)

      if (editModalOpen && currentTransaction) {
        await api.put(`/transaction/${currentTransaction.id}`, payload);
      } else {
        await api.post("/transaction/", payload);
      }

      fetchTransactions();
      setAddModalOpen(false);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  
const handleDelete = async (id: string) => {
  try {
    const response = await api.delete(`/transaction/${id}`);
    
    if (response.status === 200) {
      toast.success("Transaction deleted successfully!");
      // Refresh the data or page if needed
      //router.refr(); // If you're using Next.js App Router
      fetchTransactions()
    } else {
      toast.error("Failed to delete transaction.");
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    toast.error("Something went wrong!");
  }
};

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all your income and expenses
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="contained" 
            onClick={handleOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Transaction
          </Button>
        </div>

        {/* Transaction table remains the same */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold">All Transactions</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Loading transactions...
            </div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">{tx.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{tx.category}</td>
                      <td className={`px-6 py-4 whitespace-nowrap font-medium ${
                        tx.type === "INCOME" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}>
                        {tx.type === "INCOME" ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Button 
                          size="small" 
                          onClick={() => handleOpenEditModal(tx)}
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          onClick={()=>handleDelete(tx.id)}
                          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No transactions found. Add your first transaction!
            </div>
          )}
        </div>

        {/* Enhanced Add Transaction Modal */}
        <Dialog 
          open={addModalOpen} 
          onClose={() => setAddModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <Box sx={{ p: 2 }}>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                Add New Transaction
              </Typography>
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                  />
                  
                  <TextField
                    label="Amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                  />
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as 'INCOME' | 'EXPENSE'})}
                      label="Type"
                      required
                      variant="outlined"
                    >
                      <MenuItem value="INCOME">Income</MenuItem>
                      <MenuItem value="EXPENSE">Expense</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      label="Category"
                      required
                      variant="outlined"
                    >
                      {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category.charAt(0) + category.slice(1).toLowerCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 2 }}>
                <Button 
                  onClick={() => setAddModalOpen(false)}
                  variant="outlined"
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Save Transaction
                </Button>
              </DialogActions>
            </form>
          </Box>
        </Dialog>

        {/* Enhanced Edit Transaction Modal */}
        <Dialog 
          open={editModalOpen} 
          onClose={() => setEditModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <Box sx={{ p: 2 }}>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                Edit Transaction
              </Typography>
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                  />
                  
                  <TextField
                    label="Amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Typography color="text.secondary" sx={{ mr: 1 }}>₹</Typography>
                      ),
                    }}
                  />
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as 'INCOME' | 'EXPENSE'})}
                      label="Type"
                      required
                      variant="outlined"
                    >
                      <MenuItem value="INCOME">Income</MenuItem>
                      <MenuItem value="EXPENSE">Expense</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      label="Category"
                      required
                      variant="outlined"
                    >
                      {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category.charAt(0) + category.slice(1).toLowerCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 2 }}>
                <Button 
                  onClick={() => setEditModalOpen(false)}
                  variant="outlined"
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Update Transaction
                </Button>
              </DialogActions>
            </form>
          </Box>
        </Dialog>
      </main>
    </div>
  );
}