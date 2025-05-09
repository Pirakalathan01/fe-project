import api from './api';

export const login = async (email: string, password: string) => {
  return api.post('api/login', { email, password });
};

export const register = async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
  return api.post('api/register', data);
};

export const logout = async () => {
  return api.post('api/logout');
};