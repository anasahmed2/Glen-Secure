import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]); // store dummy registered users
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      const userExists = users.find((u) => u.email === email && u.password === password);
      if (userExists) {
        setMessage('Logged in successfully!');
        navigate('/app'); // instantly redirect to App.jsx route
      } else {
        setMessage('Invalid credentials.');
      }
    } else {
      const alreadyExists = users.find((u) => u.email === email);
      if (alreadyExists) {
        setMessage('User already registered.');
      } else {
        setUsers([...users, { email, password }]);
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me for 30 days
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

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
