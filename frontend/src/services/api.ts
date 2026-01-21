const API_URL = 'http://127.0.0.1:8000/api';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Unauthorized');
  }

  return response.json();
}
