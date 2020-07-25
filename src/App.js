import React from "react";
import UserList from "./components/UserList";
import { ContextController } from "./Context";

const App = () => {
  return (
    <ContextController>
      <>
        <UserList />
      </>
    </ContextController>
  );
};

export default App;
