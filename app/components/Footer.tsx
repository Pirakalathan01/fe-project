import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => (
  <footer className="w-full bg-gradient-to-r from-blue-100 to-purple-100 text-center py-4 mt-auto text-gray-500 text-sm flex items-center justify-center gap-2">
    <FaRegCopyright className="inline text-gray-400" />
    {new Date().getFullYear()} Project Management Application. All rights reserved.
  </footer>
);

export default Footer; 