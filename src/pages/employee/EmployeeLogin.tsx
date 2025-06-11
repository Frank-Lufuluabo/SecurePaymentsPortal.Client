import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToaster } from '../../components/ui/Toaster';
import { loginUser } from '../../api';

interface FormData {
  username: string;
  password: string;
}

const EmployeeLogin: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToaster();
  
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      console.log('Attempting login with:', { userName: formData.username, password: formData.password });
      
      const response = await loginUser({
        userName: formData.username,
        password: formData.password,
      });

      const userData = response.data;
      console.log('Login response:', userData);

      if (!userData.token) {
        throw new Error('No authentication token received');
      }

      // Store the employee ID and token
      localStorage.setItem('employeeId', userData.employeeId || userData.id?.toString());
      localStorage.setItem('authToken', userData.token);

      addToast({
        title: 'Login successful',
        description: `Welcome ${userData.name || userData.userName}`,
        variant: 'success',
      });

      navigate('/employee/portal');
    } catch (error: any) {
      console.error('Login failed', error);
      
      const errorMessage = error?.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      
      addToast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <Link to="/" className="absolute top-4 left-4 text-[#0A2463] hover:text-[#051c4e] transition-colors flex items-center">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Home</span>
      </Link>
      
      <div className="flex items-center mb-8">
        <Building2 className="h-8 w-8 text-[#E6AF2E] mr-2" />
        <h1 className="text-2xl font-bold text-[#0A2463]">Global Bank</h1>
        <span className="bg-[#E6AF2E] text-[#0A2463] text-xs font-bold px-2 py-0.5 rounded-md ml-2 flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" />
          EMPLOYEE
        </span>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Employee Login</CardTitle>
          <CardDescription className="text-center">
            Access the international payments portal
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
          
          <CardFooter className="flex-col">
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
              className="mb-3"
            >
              {isLoading ? 'Logging in...' : 'Access Portal'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For technical support, contact IT department at</p>
        <a href="mailto:it-support@globalbank.com" className="text-[#0A2463] hover:underline">it-support@globalbank.com</a>
      </div>
    </div>
  );
};

export default EmployeeLogin;