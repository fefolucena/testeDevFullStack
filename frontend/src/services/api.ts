const API_URL = "http://127.0.0.1:8000/api";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export async function deleteUser(userId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting user");
  }

  return response.json();
}

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
  role_level: number;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error creating user");
  }

  return response.json();
}

export async function updateUser(
  userId: number,
  payload: {
    name: string;
    email: string;
    password?: string;
    role_level: number;
  },
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error updating user");
  }

  return response.json();
}
