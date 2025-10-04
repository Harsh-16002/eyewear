import api from "./axios";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

// ----- Login -----
export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  message?: string;
}


// Register API
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};



// ----- Login API -----
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
