// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'project_manager' | 'researcher';
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Mock authentication - in real app, this would call an API
//     if (email === 'admin@arcair.com' && password === 'admin123') {
//       const userData = {
//         id: '1',
//         name: 'Admin User',
//         email: 'admin@arcair.com',
//         role: 'admin' as const
//       };
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//       return true;
//     } else if (email === 'manager@arcair.com' && password === 'manager123') {
//       const userData = {
//         id: '2',
//         name: 'Project Manager',
//         email: 'manager@arcair.com',
//         role: 'project_manager' as const
//       };
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       logout, 
//       isAuthenticated: !!user 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// link my backend to login it is workin but the token is not setting at cokies

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface JwtPayload {
//   user_id: string;
//   email: string;
//   name?: string;
//   role?: string;
//   exp: number;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   accessToken: string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [refreshToken, setRefreshToken] = useState<string | null>(null);

//   useEffect(() => {
//     const storedAccess = localStorage.getItem('accessToken');
//     const storedRefresh = localStorage.getItem('refreshToken');
//     if (storedAccess && storedRefresh) {
//       setAccessToken(storedAccess);
//       setRefreshToken(storedRefresh);
//       try {
//         const decoded: JwtPayload = jwtDecode(storedAccess);
//         setUser({
//           id: decoded.user_id,
//           email: decoded.email,
//           name: decoded.name || '',
//           role: decoded.role || '',
//         });
//       } catch (err) {
//         console.error('Failed to decode token:', err);
//         logout();
//       }
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       // Send {email, password} exactly as backend expects
//       const response = await axios.post('http://localhost:8000/api/login/', { email, password });

//       const { access_token, refresh_token } = response.data;
//       console.log("acces_token/n",accessToken);
//       console.log("refresh_token/n",refreshToken);

//       setAccessToken(access_token);
//       setRefreshToken(refresh_token);
//       localStorage.setItem('accessToken', access_token);
//       localStorage.setItem('refreshToken', refresh_token);

//       const decoded: JwtPayload = jwtDecode(access_token);
//       setUser({
//         id: decoded.user_id,
//         email: decoded.email,
//         name: decoded.name || '',
//         role: decoded.role || '',
//       });

//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setAccessToken(null);
//     setRefreshToken(null);
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, accessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
























// let's try stting tokens at cokies

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch user when app starts
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // const res = await axios.get('http://localhost:8000/api/whoami/', {
//         //   withCredentials: true,
//         // });

//         // const data = res.data;
//         // setUser({
//         //   id: data.id,
//         //   name: data.username || '',
//         //   email: data.email,
//         //   role: data.is_superuser ? 'superuser' : data.is_staff ? 'admin' : 'user',
//         // });
//       } catch (err) {
//         console.error('Initial user fetch failed:', err);
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   // ✅ Updated login function: also fetch user after login
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       await axios.post(
//         'http://localhost:8000/api/login/',
//         { email, password },
//         { withCredentials: true }
//       );

//       // ✅ Fetch user info after login
//       // const res = await axios.get('http://localhost:8000/api/whoami/', {
//       //   withCredentials: true,
//       // });

//       // const data = res.data;
//       // setUser({
//       //   id: data.id,
//       //   name: data.username || '',
//       //   email: data.email,
//       //   role: data.is_superuser ? 'superuser' : data.is_staff ? 'admin' : 'user',
//       // });

//       // return true;
//     } catch (err) {
//       console.error('Login failed:', err);
//       return false;
//     }
//   };

//   // Logout (client-side only)
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };












//this is working for not who ami api and work perfectly if somthing crash come back to it

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   // 👇 Fetch real user info from whoami API
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/whoami/', {
//         withCredentials: true,
//       });

//       const data = response.data;
//       setUser({
//         id: data.id,
//         name: data.username,
//         email: data.email,
//         role: data.is_superuser ? 'admin' : 'user', // or map your actual role field
//       });
//     } catch (err) {
//       console.error('Failed to fetch user:', err);
//       setUser(null); // not authenticated
//     }
//   };

//   // Call this when the component mounts (initial auth check)
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // 👇 Login
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       await axios.post(
//         'http://localhost:8000/api/login/',
//         { email, password },
//         { withCredentials: true }
//       );

//       await fetchUser(); // ✅ Get real user after login
//       return true;
//     } catch (err) {
//       console.error('Login failed:', err);
//       return false;
//     }
//   };

//   // 👇 Logout
//   const logout = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/logout/', {}, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (error) {
//       console.error("Logout API error:", error);
//     }

//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };

















// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const fetchUser = async () => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) return;

//     try {
//       const response = await axios.get('http://localhost:8000/api/whoami/', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const data = response.data;
//       setUser({
//         id: data.id,
//         name: data.username,
//         email: data.email,
//         role: data.is_superuser ? 'admin' : 'user',
//       });
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser(); // auto check on load
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/login/', {
//         email,
//         password,
//       });
//       // console.log("acc")
//       const { access_token, refresh_token } = response.data;
//       localStorage.setItem('accessToken', access_token);
//       localStorage.setItem('refresh_token', refresh_token);

//       await fetchUser(); // Get user info
//       return true;
//     } catch (err) {
//       console.error('Login failed:', err);
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       const refresh = localStorage.getItem('refreshToken');
//       if (refresh) {
//         await axios.post('http://localhost:8000/api/logout/', { refresh });
//       }
//     } catch (err) {
//       console.error('Logout failed:', err);
//     }

//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refresh_token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };










import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom axios instance
const authAxios = axios.create({
  baseURL: 'http://localhost:8000/api',
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        const newAccessToken = refreshRes.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest); // Retry the request
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // or trigger logout
      }
    }

    return Promise.reject(error);
  }
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await authAxios.get('/whoami/');
      const data = response.data;
      setUser({
        id: data.id,
        name: data.username,
        email: data.email,
        role: data.is_superuser ? 'admin' : 'user',
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(); // Check on load
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      await fetchUser();
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        await axios.post('http://localhost:8000/api/logout/', { refresh });
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
