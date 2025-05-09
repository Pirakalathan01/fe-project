'use client';

import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import ConfirmModal from "./components/ConfirmModal";
import Cookies from 'js-cookie';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [modal, setModal] = useState<{
    open: boolean;
    action: null | "done" | "delete" | "cancel";
    taskId: number | null;
  }>({ open: false, action: null, taskId: null });

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!Cookies.get('token'));


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token');
      const isLoggedInNow = !!token;
      setIsLoggedIn(isLoggedInNow);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);
 
  const handleAddTask = async (title: string, description: string) => {
    setCreating(true);
    try {
    
      setError("");
      if(!isLoggedIn){
        await api.post("api/guest/tasks", { title, description });
      }else{
        await api.post("api/tasks", { title, description });
      }
      await fetchTasks();
      toast.success("Task created successfully!");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
      } else {
        setError("Failed to add task.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleDoneTask = async (id: number) => {
    try {
      setError("");
      if(!isLoggedIn){
        await api.put(`api/guest/tasks/update-status/${id}`,{status:'done'});
      }else{
        await api.put(`api/tasks/update-status/${id}`,{status:'done'});
      }
      await fetchTasks();
      toast.success("Task updated successfully!");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
      } else {
        setError("Failed to update task.");
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setError("");
      if(!isLoggedIn){
        await api.delete(`api/guest/tasks/${id}`);
      }else{
        await api.delete(`api/tasks/${id}`);
      }
      await fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
      } else {
        setError("Failed to delete task.");
      }
    }
  };

  const handleCancelTask = async (id: number) => {
    try {
      setError("");
     
      if(!isLoggedIn){
        await api.put(`api/guest/tasks/update-status/${id}`,{status:'cancelled'});
      }else{
        await api.put(`api/tasks/update-status/${id}`,{status:'cancelled'});
      }
      await fetchTasks();
      toast("Task cancelled.", { icon: "🚫" });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
      } else {
        setError("Failed to update task.");
      }
    }
    
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      if (!token) {
        const res = await api.get("api/guest/tasks");
        setTasks(res.data.data || res.data);
      } else {
        const res = await api.get("api/tasks");
        setTasks(res.data.data || res.data);
      }
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
      } else {
        setError("Failed to load tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openModal = (action: "done" | "delete" | "cancel", taskId: number) => {
    setModal({ open: true, action, taskId });
  };

  const closeModal = () => setModal({ open: false, action: null, taskId: null });

  const handleModalConfirm = async () => {
    if (!modal.taskId) return;
    if (modal.action === "done") await handleDoneTask(modal.taskId);
    if (modal.action === "delete") await handleDeleteTask(modal.taskId);
    if (modal.action === "cancel") await handleCancelTask(modal.taskId);
    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1 flex flex-col md:flex-row gap-10 px-4 py-10 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex items-start justify-center">
          <TaskForm onAdd={handleAddTask} />
        </div>
        <div className="flex-1 flex items-start justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onDone={id => openModal("done", id)}
              onDelete={id => openModal("delete", id)}
              onCancel={id => openModal("cancel", id)}
            />
          )}
        </div>
      </main>
      {creating && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 px-6 py-3 rounded shadow-lg z-50">
          Creating task...
        </div>
      )}
      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-6 py-3 rounded shadow-lg z-50">
          {error}
        </div>
      )}
      <ConfirmModal
        open={modal.open}
        title={
          modal.action === "done"
            ? "Mark as Done"
            : modal.action === "delete"
            ? "Delete Task"
            : "Cancel Task"
        }
        message={
          modal.action === "done"
            ? "Are you sure you want to mark this task as done?"
            : modal.action === "delete"
            ? "Are you sure you want to delete this task? This action cannot be undone."
            : "Are you sure you want to cancel this task?"
        }
        onConfirm={handleModalConfirm}
        onCancel={closeModal}
        confirmText={
          modal.action === "done"
            ? "Yes, Done"
            : modal.action === "delete"
            ? "Yes, Delete"
            : "Yes, Cancel"
        }
      />
      <Footer />
    </div>
  );
}
