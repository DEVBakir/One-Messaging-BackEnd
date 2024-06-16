import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    session();
  }, [loaded]);

  const session = async () => {
    setUser((await supabase.auth.getSession()).data.session.user);

  };
  const signin = async (email, password) => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      setUser(data.user);
      setloaded(!loaded);
      await supabase.auth.setSession();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, signin }}>
      {children}
    </UserContext.Provider>
  );
};
