import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      // 🔥 LOGIN: Fetch user from Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (data) {
        setMessage('Logged in successfully!');
        navigate('/app');
      } else {
        setMessage('Invalid credentials.');
      }
    } else {
      // 🔥 REGISTER: Insert user into Supabase
      const { error } = await supabase
        .from('users')
        .insert([{ email, password }]);

      if (error) {
        console.error('Registration error:', error);
        setMessage('Registration failed.');
      } else {
        setMessage('Registered successfully! You can now log in.');
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to GLEN Secure</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account or create a new one to manage your security services
        </p>

        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 font-semibold ${isLogin ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold ${!isLogin ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>

        {message && <p className="text-center text-sm text-red-600 mt-4">{message}</p>}

        <div className="text-center mt-6 text-sm text-gray-500">
          Return to <a href="/app" className="text-blue-600 hover:underline">Home Page</a>
        </div>
      </div>
    </div>
  );
}

