import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useUser } from '../../contexts/UserContext';
import { useTransactions } from '../../contexts/TransactionContext';
import { useToaster } from '../../components/ui/Toaster';

interface FormData {
  amount: string;
  currency: string;
  recipientName: string;
  recipientAccount: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
  reference: string;
}

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addTransaction } = useTransactions();
  const { addToast } = useToaster();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    currency: 'USD',
    recipientName: '',
    recipientAccount: '',
    swiftCode: '',
    bankName: '',
    bankAddress: '',
    reference: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }
    
    if (!formData.recipientAccount.trim()) {
      newErrors.recipientAccount = 'Account number is required';
    }
    
    if (!formData.swiftCode.trim()) {
      newErrors.swiftCode = 'SWIFT code is required';
    } else if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.swiftCode)) {
      newErrors.swiftCode = 'Invalid SWIFT code format';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTransaction = addTransaction({
        customerId: user.id,
        customerName: user.name,
        accountNumber: user.accountNumber || '',
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        recipientAccount: formData.recipientAccount,
        swiftCode: formData.swiftCode,
      });
      
      addToast({
        title: 'Payment initiated',
        description: 'Your payment has been submitted for processing',
        variant: 'success',
      });
      
      navigate('/customer/confirmation');
    } catch (error) {
      addToast({
        title: 'Payment failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0A2463] mb-6">Make an International Payment</h1>
      
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= 1 ? 'bg-[#0A2463] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            <CreditCard className="w-5 h-5" />
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep >= 2 ? 'bg-[#0A2463]' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= 2 ? 'bg-[#0A2463] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            <Globe className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-center w-32">
            <p className={`text-sm font-medium ${currentStep >= 1 ? 'text-[#0A2463]' : 'text-gray-500'}`}>
              Payment Details
            </p>
          </div>
          <div className="text-center w-32">
            <p className={`text-sm font-medium ${currentStep >= 2 ? 'text-[#0A2463]' : 'text-gray-500'}`}>
              Recipient Details
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 ? 'Payment Details' : 'Recipient Details'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 
              ? 'Enter the amount and currency for your international payment'
              : 'Enter the recipient\'s bank details for the transfer'
            }
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {currentStep === 1 ? (
              <>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-2">
                  <p className="text-sm text-blue-800 flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Foreign exchange rates are updated daily. The final rate will be confirmed when your payment is processed.
                    </span>
                  </p>
                </div>
                
                <Input
                  label="Amount"
                  type="number"
                  step="0.01"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  error={errors.amount}
                  required
                />
                
                <Select
                  label="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  options={currencies}
                  error={errors.currency}
                  required
                />
                
                <Input
                  label="Payment Reference (Optional)"
                  name="reference"
                  placeholder="Add a reference for this payment"
                  value={formData.reference}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-2">
                  <p className="text-sm text-blue-800 flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Please ensure you have the correct SWIFT code and account details to avoid payment delays.
                    </span>
                  </p>
                </div>
                
                <Input
                  label="Recipient Name"
                  name="recipientName"
                  placeholder="Enter recipient's full name"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  error={errors.recipientName}
                  required
                />
                
                <Input
                  label="Account Number / IBAN"
                  name="recipientAccount"
                  placeholder="Enter recipient's account number"
                  value={formData.recipientAccount}
                  onChange={handleInputChange}
                  error={errors.recipientAccount}
                  required
                />
                
                <Input
                  label="SWIFT / BIC Code"
                  name="swiftCode"
                  placeholder="Enter SWIFT code"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  error={errors.swiftCode}
                  required
                />
                
                <Input
                  label="Bank Name"
                  name="bankName"
                  placeholder="Enter recipient's bank name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  error={errors.bankName}
                  required
                />
                
                <Input
                  label="Bank Address (Optional)"
                  name="bankAddress"
                  placeholder="Enter bank address"
                  value={formData.bankAddress}
                  onChange={handleInputChange}
                />
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {currentStep === 1 ? (
              <div className="w-full">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  fullWidth
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex w-full space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Pay Now'}
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-[#0A2463] mb-2">Important Information</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• International payments typically take 1-3 business days to process.</li>
          <li>• Transaction fees may apply depending on your account type and destination country.</li>
          <li>• All payments are subject to verification by our compliance team.</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentForm;