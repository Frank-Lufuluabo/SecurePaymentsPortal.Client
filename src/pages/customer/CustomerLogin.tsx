import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToaster } from '../../components/ui/Toaster';
import { loginCustomer } from '../../api';

interface FormData {
  username: string;
  accountNumber: string;
  password: string;
}

const CustomerLogin: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToaster();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    accountNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const loginData = {
        userName: formData.username,
        accountNumber: formData.accountNumber,
        password: formData.password,
      };

      const response = await loginCustomer(loginData);
      const user = response.data.user;

      if (!user.isAuthenticated) {
        throw new Error('Authentication failed');
      }

      addToast({
        title: 'Login successful',
        description: 'Welcome back to Global Bank',
        variant: 'success',
      });

      localStorage.setItem('customerId', user?.id.toString());
      navigate('/customer/dashboard');

    } catch (error: any) {
      console.error('Login error:', error);
      addToast({
        title: 'Login failed',
        description: error.response?.data?.message || error.message || 'Please check your credentials and try again',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 relative">
      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center text-[#0A2463] hover:text-[#051c4e] transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Home</span>
      </Link>

      <div className="flex items-center mb-8">
        <Building2 className="h-8 w-8 text-[#E6AF2E] mr-2" />
        <h1 className="text-2xl font-bold text-[#0A2463]">Global Bank</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Customer Login</CardTitle>
          <CardDescription className="text-center">
            Access your account to make international payments
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              autoComplete="username"
              required
            />
            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter your account number"
              value={formData.accountNumber}
              onChange={handleChange}
              error={errors.accountNumber}
              autoComplete="off"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
              required
            />
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="mb-3"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/customer/register"
                className="text-[#0A2463] font-medium hover:underline"
              >
                Register now
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Having trouble logging in? Contact customer support at</p>
        <a
          href="mailto:support@globalbank.com"
          className="text-[#0A2463] hover:underline"
        >
          support@globalbank.com
        </a>
      </div>
    </div>
  );
};

export default CustomerLogin;