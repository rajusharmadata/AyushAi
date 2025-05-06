import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from 'lucide-react';

// Define UI components since they're missing
const Card = {
  Root: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  ),
  Header: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  ),
  Title: ({ children, className }) => (
    <h2 className={className}>
      {children}
    </h2>
  ),
  Description: ({ children, className }) => (
    <p className={className}>
      {children}
    </p>
  ),
  Content: ({ children }) => (
    <div>
      {children}
    </div>
  ),
  Footer: ({ children, className }) => (
    <div className={className}>
      {children}
    </div>
  )
};

const Label = {
  Root: ({ children, htmlFor, className }) => (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  )
};

const Input = ({ id, type, placeholder, value, onChange, className }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${className}`}
  />
);

const Button = ({ children, type, className, disabled, onClick }) => (
  <button
    type={type}
    className={`px-4 py-2 ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await axios.post('https://ayushai-1.onrender.com/api/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || { email }));
        navigate('/chat');
      } else {
        setLoginError(response.data?.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        setLoginError(error.response.data?.message || `Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setLoginError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setLoginError(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 px-4 py-12">
      <Card.Root className="w-full max-w-md shadow-lg rounded-2xl border border-green-200 bg-white p-6">
        <Card.Header className="space-y-1 mb-6">
          <Card.Title className="text-3xl font-extrabold text-center text-emerald-700">Login to AyushAI</Card.Title>
          <Card.Description className="text-center text-gray-600">
            Enter your email and password to access your account
          </Card.Description>
        </Card.Header>
        <Card.Content>
          {loginError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{loginError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label.Root htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
                Email
              </Label.Root>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`focus:ring-2 focus:ring-green-500 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <Label.Root htmlFor="password" className="block text-sm font-medium text-green-700">
                  Password
                </Label.Root>
                <Link to="/forgot-password" className="text-xs text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`focus:ring-2 focus:ring-green-500 ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-medium transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card.Content>
        <Card.Footer className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-700 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}