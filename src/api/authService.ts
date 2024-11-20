import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tu-backend.com', // Cambia por tu URL base
});

export const login = async (email: string, password: string): Promise<{ token: string; role: string; email: string }> => {
  const response = await api.post('/auth/login', { email, password }); // Enviamos email y password
  return {
    token: response.data.token,
    role: response.data.role,
    email: response.data.email,
  }; // Mapeamos la respuesta para ajustarla al modelo esperado
};

export const logout = async (token: string): Promise<void> => {
  // Incluye el token como parte de los headers o el body si el backend lo requiere
  await api.post(
    '/auth/logout',
    {}, // Body vacío si no necesita datos adicionales
    {
      headers: {
        Authorization: `Bearer ${token}`, // Se envía el token en el header
      },
    }
  );
};
