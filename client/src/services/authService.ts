import { User } from "../types/types";

type AuthResponse = {
  user: User;
  token: string;
};

// In dev we proxy `/api` to the server via Vite.
// In production (Render), set `VITE_API_BASE_URL` to your server base, e.g.
// https://your-api.onrender.com/api
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? "/api";

const getErrorMessage = async (res: Response): Promise<string> => {
  try {
    const data = await res.json();
    if (data?.message && typeof data.message === "string") return data.message;
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`;
};

const jsonFetch = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return (await res.json()) as T;
};
export const authService = {
  login: async (email: string, password: string) => {
    const { user, token } = await jsonFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  },
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { user, token } = await jsonFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token };
  },
  me: async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Not authenticated");

    const data = await jsonFetch<{ user: User }>("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },
  getToken: () => {
    return localStorage.getItem("auth_token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};
