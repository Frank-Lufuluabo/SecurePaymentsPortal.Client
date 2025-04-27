import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, CreditCard, Globe, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-[#0A2463] to-[#051c4e] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-[#E6AF2E]" />
              <span className="font-bold text-xl">Global Bank</span>
            </div>
            <div className="flex space-x-2">
              <Link to="/customer/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Customer Login
                </Button>
              </Link>
              <Link to="/employee/login">
                <Button variant="secondary">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                International Payments Made <span className="text-[#E6AF2E]">Simple</span> and <span className="text-[#E6AF2E]">Secure</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Send money globally with our trusted international payment system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/customer/register">
                  <Button size="lg" variant="secondary" className="text-base">
                    Register Now
                  </Button>
                </Link>
                <Link to="/customer/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-[#E6AF2E] text-[#0A2463] font-bold py-1 px-3 rounded-md text-sm">
                    Secure & Fast
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-lg p-5">
                    <div className="text-[#E6AF2E] font-bold text-2xl mb-1">Global Bank</div>
                    <div className="text-white text-sm mb-6">International Payment</div>
                    
                    <div className="bg-gradient-to-r from-[#0A2463] to-[#051c4e] p-4 rounded-md mb-6">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-300 text-xs">Amount</div>
                        <div className="text-gray-300 text-xs">Currency</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-white font-bold">5,000.00</div>
                        <div className="text-white font-bold">USD</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-300 text-xs">SWIFT Transfer</div>
                        <div className="text-white font-medium">Secure • Fast • Reliable</div>
                      </div>
                      <CreditCard className="h-8 w-8 text-[#E6AF2E]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0A2463]">
            Why Choose Our International Payment System
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0A2463]/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-[#0A2463]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A2463]">Secure Transactions</h3>
              <p className="text-gray-600">
                Bank-grade security protocols ensure your international payments are protected at every step.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0A2463]/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#0A2463]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A2463]">Global Network</h3>
              <p className="text-gray-600">
                Send money to over 180 countries worldwide with competitive exchange rates.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0A2463]/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-[#0A2463]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0A2463]">Expert Verification</h3>
              <p className="text-gray-600">
                Every transaction is verified by our team of banking professionals for added security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E6AF2E]/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#0A2463]">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
            Join thousands of customers who trust Global Bank for their international payment needs.
          </p>
          <Link to="/customer/register">
            <Button size="lg" className="text-base px-8">
              Open an Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051c4e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-[#E6AF2E]" />
                <span className="font-bold text-lg">Global Bank</span>
              </div>
              <p className="text-sm text-gray-300">
                Your trusted partner for international banking services.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Locations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <address className="text-sm text-gray-300 not-italic">
                123 Banking Street<br />
                Financial District<br />
                South Africa<br /><br />
                <a href="mailto:contact@globalbank.com" className="hover:text-white transition-colors">contact@globalbank.com</a>
              </address>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-center text-gray-400">
            <p>© {new Date().getFullYear()} Global Bank. All rights reserved.</p>
            <p className="mt-1">Global Bank is a licensed financial service provider.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;