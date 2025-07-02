import React from "react";
import Routing from "./Component/Routing";
import UserRoutes from "./User/UserRoutes";
import { UserProvider, useUser } from "./User/UserContext";

function AppContent() {
  const { state } = useUser();

  // If user is logged in (you may check for state.user, state.username, or state.email)
  // const isLoggedIn = !!state?.username || !!state?.email;

  // return isLoggedIn ? <UserRoutes /> : <Routing />;

  if (state.user) {
    return <UserRoutes />;
  } else {
    return <Routing />;
  }
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
      {/* <Routing /> */}
    </UserProvider>
  );
}
