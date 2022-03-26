import Header from "./components/Header";
import Sign from "./components/auth/Sign";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
function App() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!user ? (
        <Sign />
      ) : (
        <>
          <Header />
          <div className="h-screen w-full flex">
            <Sidebar />
            <Routes>
              <Route path="/room/:id" element={<Home />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
