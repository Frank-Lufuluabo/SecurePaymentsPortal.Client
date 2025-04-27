import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText, DownloadCloud, Home } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTransactions } from '../../contexts/TransactionContext';

const PaymentConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentTransaction } = useTransactions();

  useEffect(() => {
    // If no current transaction, redirect to dashboard
    if (!currentTransaction) {
      navigate('/customer/dashboard');
    }
  }, [currentTransaction, navigate]);

  if (!currentTransaction) {
    return null;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Payment Confirmed</h1>
        <p className="text-gray-600 mt-1">
          Your international payment has been submitted successfully
        </p>
      </div>

      <Card className="bg-white shadow-md mb-6">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Reference ID</p>
              <p className="font-medium">{currentTransaction.id.slice(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDate(currentTransaction.date)}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-2xl font-bold text-[#0A2463]">
              {currentTransaction.currency} {currentTransaction.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500 mb-2">Recipient Details</p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Account:</span> {currentTransaction.recipientAccount}
              </p>
              <p className="text-sm mt-1">
                <span className="font-medium">SWIFT Code:</span> {currentTransaction.swiftCode}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3">
              <p className="flex items-center text-yellow-800">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                Pending verification by bank staff
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => window.print()}>
            <FileText className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
          <Button variant="ghost" className="w-full flex items-center justify-center">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </CardFooter>
      </Card>

      <div className="bg-blue-50 rounded-lg p-4 mb-8">
        <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal pl-4">
          <li>Our bank staff will verify your payment details</li>
          <li>The payment will be forwarded to SWIFT for processing</li>
          <li>Funds will typically arrive in 1-3 business days</li>
        </ol>
      </div>

      <div className="flex justify-between space-x-4">
        <Link to="/customer/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/customer/payment" className="flex-1">
          <Button className="w-full">
            Make Another Payment
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation;