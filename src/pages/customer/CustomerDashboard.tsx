import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { fetchCurrentCustomer, fetchTransactions } from '../../api/api';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  recipientAccount: string;
  verified: boolean;
  submittedToSwift: boolean;
}

interface Customer {
  id: string;
  fullName: string;
  accountNumber: string;
  availableBalance: number;
  [key: string]: any;
}

const CustomerDashboard: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recentActivity, setRecentActivity] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadCustomerData = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        if (!customerId) return;

         const response = await fetchCurrentCustomer(customerId);
        setCustomer(response.data);

        const txResponse = await fetchTransactions(customerId);
        const userTransactions: Transaction[] = txResponse.data;
        setTransactions(userTransactions);
        setRecentActivity(userTransactions.slice(0, 5));
      } catch (error) {
        console.error('Failed to load customer data', error);
      }
    };

    loadCustomerData();
  }, []);

  const accountBalance = {
    available: customer?.availableBalance || 0,
    currency: 'ZAR',
    pendingTransactions: transactions.filter((t) => !t.verified).length,
  };

  const getStatusIcon = (transaction: Transaction) => {
    if (transaction.submittedToSwift) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (transaction.verified) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (transaction: Transaction) => {
    if (transaction.submittedToSwift) {
      return <span className="text-green-600 font-medium">Completed</span>;
    } else if (transaction.verified) {
      return <span className="text-blue-600 font-medium">Verified</span>;
    } else {
      return <span className="text-yellow-600 font-medium">Pending</span>;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Balance Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <div className="flex items-baseline mt-1">
                  <h3 className="text-3xl font-bold text-[#0A2463]">
                    {accountBalance.currency}{' '}
                    {accountBalance.available.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </h3>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/customer/payment">
                  <Button className="w-full md:w-auto">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Make a Payment
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">All Transactions</p>
                <p className="text-2xl font-bold text-[#0A2463]">{transactions.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{accountBalance.pendingTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Amount</th>
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Recipient</th>
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Status</th>
                    <th className="px-4 py-3 text-right text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">
                        {transaction.date ? new Date(transaction.date).toLocaleDateString('en-ZA') : 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {transaction.currency} {transaction.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {transaction.recipientAccount.slice(0, 4)}...{transaction.recipientAccount.slice(-4)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {getStatusIcon(transaction)}
                          <span className="ml-1.5">{getStatusText(transaction)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-[#0A2463] hover:text-[#051c4e] font-medium text-sm flex items-center ml-auto">
                          <span>Details</span>
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't made any payments yet.</p>
              <Link to="/customer/payment">
                <Button variant="outline" className="mt-4">
                  Make Your First Payment
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;