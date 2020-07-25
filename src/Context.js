import React, { useEffect, useState } from "react";

export const userContext = React.createContext();

export const ContextController = ({ children }) => {
  const initialState = {
    members: [],
    open: false,
    id: null,
    selectedDate: new Date(),
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          "https://af2e8514-7efb-42be-9ce5-232688c4edfe.mock.pstmn.io/user/?="
        );
        const json = await res.json();
        const members = json.members;
        setState({
          ...state,
          members: members,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <userContext.Provider value={[state, setState]}>
      {children}
    </userContext.Provider>
  );
};
