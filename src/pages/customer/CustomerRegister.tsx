import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToaster } from '../../components/ui/Toaster';
import { registerCustomer } from '../../api/api';

interface FormData {
  fullName: string;
  idNumber: string;
  accountNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const CustomerRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToaster();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    } else if (!/^\d{13}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID number must be 13 digits';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{10,12}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 10-12 digits';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      
      registerCustomer({
        fullName: formData.fullName,
        idNumber: formData.idNumber,
        accountNumber: formData.accountNumber,
        userName: formData.username,
        password: formData.password,
        role: 'customer',
      });
      
      addToast({
        title: 'Registration successful',
        description: 'Your account has been created. Welcome to Global Bank!',
        variant: 'success',
      });
      
      navigate('/customer/dashboard');
    } catch (error) {
      addToast({
        title: 'Registration failed',
        description: 'There was an error creating your account. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Link to="/" className="absolute top-4 left-4 text-[#0A2463] hover:text-[#051c4e] transition-colors flex items-center">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Home</span>
      </Link>
      
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Building2 className="h-8 w-8 text-[#E6AF2E] mr-2" />
          <h1 className="text-2xl font-bold text-[#0A2463]">Global Bank</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Customer Registration</CardTitle>
            <CardDescription className="text-center">
              Create an account to access international payments
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Security Notice</p>
                  <p>Fields highlighted in orange contain sensitive information and will be securely stored.</p>
                </div>
              </div>
              
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                autoComplete="name"
                required
              />
              
              <Input
                label="ID Number"
                name="idNumber"
                placeholder="Enter your 13-digit ID number"
                value={formData.idNumber}
                onChange={handleChange}
                error={errors.idNumber}
                autoComplete="off"
                required
                className="border-orange-500 bg-orange-50"
              />
              
              <Input
                label="Account Number"
                name="accountNumber"
                placeholder="Enter your bank account number"
                value={formData.accountNumber}
                onChange={handleChange}
                error={errors.accountNumber}
                autoComplete="off"
                required
                className="border-orange-500 bg-orange-50"
              />
              
              <Input
                label="Username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                autoComplete="username"
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
                required
                className="border-orange-500 bg-orange-50"
              />
              
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />
            </CardContent>
            
            <CardFooter className="flex-col">
              <Button 
                type="submit" 
                fullWidth 
                disabled={isLoading}
                className="mb-3"
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </Button>
              
              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/customer/login" className="text-[#0A2463] font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By registering, you agree to our</p>
          <div className="flex justify-center space-x-3 mt-1">
            <a href="#" className="text-[#0A2463] hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="text-[#0A2463] hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;