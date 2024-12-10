const API_URL = import.meta.env.VITE_APP_API_URL;

interface User {
  id: string;
  username: string;
  name: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export const registerUser = async (userData: { username: string; password: string }) => {
  const response = await fetch(`${API_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de l\'inscription');
  }
  
  return response.json();
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la connexion');
  }
  
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
  
  return response.json();
};

export const sendMessage = async (message: { receiverId: string; text: string }) => {
  const response = await fetch(`${API_URL}messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(message),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de l\'envoi du message');
  }
  
  return response.json();
};

export const getMessages = async (receiverId: string) => {
  const response = await fetch(`${API_URL}messages/${receiverId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des messages');
  }
  
  return response.json();
};