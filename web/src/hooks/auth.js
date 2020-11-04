import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [totalConnections, setTotalConnections] = useState(0);
  const [data, setData] = useState(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;
      // console.log(user);
      setLoading(false);
      setIsAuth(true);
      // console.log(user);
      try {
        api.get("/connections").then((response) => {
          const { total } = response.data;
          // console.log(total);
          setTotalConnections(total);
        });
      } catch (error) {}
      return { token, user: JSON.parse(user) };
    }

    setIsAuth(false);
    return {};
  });
  // useEffect(() => {
  //   async function loadStoragedData() {
  //     const storagedUser = await localStorage.getItem("user");
  //     const storagedToken = await localStorage.getItem("token");

  //     if (storagedUser && storagedToken) {
  //       setData(JSON.parse(storagedUser));
  //       setLoading(false);
  //     }
  //   }
  //   loadStoragedData();
  // }, []);

  async function signIn({ email, password }) {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { token, user } = response.data;
    setIsAuth(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // setIsAuth(true);
    // setData(token, user);
  }

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setData({});
  };
  async function updatedUser({ data, userId, classId }) {
    try {
      await api.put(`/user/${userId}/${classId}`, data);
      const response = await api.get(`/user/${userId}`);
      const { user } = response.data;
      // alert(
      //   "User Successfully Updated! \nLog in again to see your new Profile info!"
      // );
      // history.push("/landing", { user: user });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");
  // setIsAuth(false);
  // setData({});

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        userAuth: data.user,
        tokenAuth: data.token,
        totalConnection: totalConnections,
        loading: loading,
        signIn,
        signOut,
        updatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
