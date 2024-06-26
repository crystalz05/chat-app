import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import ChatApp from "./components/test";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ChatPage from "./components/ChatPage";
import ChatInterface from "./components/ChatInterface";
import AuthProvider from "./components/security/AuthContext";
import { useAuth } from "./components/security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  
  if (authContext.isAuthenticated) 
    return children;

    return <Navigate to="/login"/>
  
}

function App() {
  return (
    <div className="container mx-auto min-h-lvh">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/chat"
              element={
                <AuthenticatedRoute>
                  <ChatPage />
                </AuthenticatedRoute>
              }
            ></Route>

            <Route
              path="/chat/id"
              element={
                <AuthenticatedRoute>
                  <ChatInterface />
                </AuthenticatedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
