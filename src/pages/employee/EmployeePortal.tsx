import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Search, 
  ArrowUpDown, 
  AlertTriangle, 
  Check, 
  Filter, 
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useTransactions } from '../../contexts/TransactionContext';
import { useToaster } from '../../components/ui/Toaster';
import { fetchTransactions } from '../../api/api';
import { createTransaction } from '../../api/api';

const EmployeePortal: React.FC = () => {

  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const response = await fetchTransactions();
      setTransactions(response.data);
    };
    loadTransactions();
  }, []);

  const {verifyTransaction} = useTransactions();
  const { addToast } = useToaster();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [filterVerified, setFilterVerified] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipientAccount.includes(searchTerm) ||
      transaction.swiftCode.includes(searchTerm.toUpperCase());
      
    if (filterVerified === null) {
      return matchesSearch;
    } else if (filterVerified === true) {
      return matchesSearch && transaction.verified && !transaction.submittedToSwift;
    } else {
      return matchesSearch && !transaction.verified;
    }
  });

  const handleVerifyTransaction = (id: string) => {
    verifyTransaction(id);
    addToast({
      title: 'Transaction verified',
      description: 'The transaction has been verified successfully',
      variant: 'success',
    });
  };

  const handleSubmitToSwift = async () => {
    if (selectedTransactions.length === 0) {
      addToast({
        title: 'No transactions selected',
        description: 'Please select at least one verified transaction to submit',
        variant: 'error',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
        
      createTransaction(selectedTransactions);
      
      addToast({
        title: 'Submitted to SWIFT',
        description: `${selectedTransactions.length} transaction(s) have been submitted for processing`,
        variant: 'success',
      });
      
      setSelectedTransactions([]);
    } catch (error) {
      addToast({
        title: 'Submission failed',
        description: 'There was an error submitting to SWIFT. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTransactionSelection = (id: string) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter(txId => txId !== id));
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  const selectAllVerified = () => {
    const verifiedIds = transactions
      .filter(tx => tx.verified && !tx.submittedToSwift)
      .map(tx => tx.id);
    setSelectedTransactions(verifiedIds);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2463]">International Payments Portal</h1>
          <p className="text-gray-600">Verify and process customer payment requests</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setFilterVerified(null)}
            className={filterVerified === null ? 'bg-gray-100' : ''}
          >
            All
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterVerified(false)}
            className={filterVerified === false ? 'bg-gray-100' : ''}
          >
            <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
            Pending
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterVerified(true)}
            className={filterVerified === true ? 'bg-gray-100' : ''}
          >
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Verified
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by customer, account or SWIFT code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setSearchTerm('')}>
          <Filter className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Transactions</CardTitle>
            {selectedTransactions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {selectedTransactions.length} selected
                </span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleSubmitToSwift}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit to SWIFT
                    </>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedTransactions([])}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#0A2463] focus:ring-[#0A2463]"
                          onChange={selectAllVerified}
                          checked={selectedTransactions.length > 0 && 
                            selectedTransactions.length === filteredTransactions.filter(tx => tx.verified && !tx.submittedToSwift).length}
                        />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-500">Date</span>
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <span className="text-sm font-medium text-gray-500">Customer</span>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <span className="text-sm font-medium text-gray-500">Amount</span>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <span className="text-sm font-medium text-gray-500">Recipient</span>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <span className="text-sm font-medium text-gray-500">SWIFT</span>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <span className="text-sm font-medium text-gray-500">Status</span>
                    </th>
                    <th className="px-6 py-3 text-right">
                      <span className="text-sm font-medium text-gray-500">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        transaction.submittedToSwift ? 'bg-green-50' : ''
                      }`}
                    >
                      <td className="px-6 py-3">
                        {transaction.verified && !transaction.submittedToSwift && (
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#0A2463] focus:ring-[#0A2463]"
                            checked={selectedTransactions.includes(transaction.id)}
                            onChange={() => toggleTransactionSelection(transaction.id)}
                          />
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                        {transaction.date.toLocaleDateString('en-ZA')}
                      </td>
                      <td className="px-6 py-3 font-medium">
                        {transaction.customerName}
                        <div className="text-xs text-gray-500">
                          Acc: {transaction.accountNumber.slice(0, 4)}...{transaction.accountNumber.slice(-4)}
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="font-medium">
                          {transaction.currency} {transaction.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-gray-700">
                          {transaction.recipientAccount.slice(0, 4)}...{transaction.recipientAccount.slice(-4)}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-gray-700">{transaction.swiftCode}</span>
                      </td>
                      <td className="px-6 py-3">
                        {transaction.submittedToSwift ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Submitted
                          </span>
                        ) : transaction.verified ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right">
                        {!transaction.verified && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyTransaction(transaction.id)}
                          >
                            Verify
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm('');
                setFilterVerified(null);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

};

export default EmployeePortal;


