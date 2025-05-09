'use client';
import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No"
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-blue-100 flex flex-col items-center">
        <FaQuestionCircle className="text-blue-400 text-4xl mb-3" />
        <h3 className="text-xl font-extrabold mb-2 text-gray-800 text-center">{title}</h3>
        <p className="mb-6 text-gray-600 text-center text-base">{message}</p>
        <div className="flex justify-center gap-4 w-full">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition shadow-sm border border-gray-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition shadow-md border-none"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;