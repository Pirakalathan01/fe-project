'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaUserPlus } from 'react-icons/fa';
import { register } from '@/services/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token');
      if (token) {
        router.replace('/');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (password !== passwordConfirmation) {
      setErrors({ password_confirmation: "Passwords do not match!" });
      return;
    }
    try {
      const res = await register({name, email, password, password_confirmation: passwordConfirmation});
      Cookies.set('token', res.data.token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Registration successful!');
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed!');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <FaUserPlus className="text-purple-500 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">Register</h2>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
            required
          />
          {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:from-purple-600 hover:to-blue-600 transition text-lg flex items-center gap-2 justify-center shadow-md"
          >
            <FaUserPlus /> Register
          </button>
          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Register; 