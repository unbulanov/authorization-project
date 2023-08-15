import React, { useState } from "react";
import AuthContext from "../contexts/index.jsx";
import useAuth from "../hooks/index.jsx";
import { Link, Navigate, Route, Router, Routes, useLocation } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import PublicPage from "./PublicPage.jsx";
import LoginPage from "./LoginPage.jsx";
import PrivatePage from "./PrivatePage.jsx";

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = () => setLoggedIn(true);
    const logOut = () => {
        localStorage.removeItem("userId");
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    return (
        auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
    );
};

const AuthButton = () => {
    const auth = useAuth();
    const location = useLocation();

    return (
        auth.loggedIn 
            ? <Button onClick={auth.logOut}>Log Out</Button>
            : <Button as={Link} to="/login" state={{ from: location }}>Log In</Button>
    );
};

const App = () => {
    <AuthProvider>
        <Router>
            <Navbar>
                <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/public">Public Page</Nav.Link>
                    <Nav.Link as={Link} to="/private">Private Page</Nav.Link>
                </Nav>
                <AuthButton />
            </Navbar>

            <div className="container p-3">
                <h1 className="text-center mt-5 mb-4">Welcome to the secret place!</h1>
                <Routes>
                    <Route path="/" element={null} />
                    <Route path="/public" element={<PublicPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/private"
                        element={(
                            <PrivateRoute>
                                <PrivatePage />
                            </PrivateRoute>
                        )}
                    />
                </Routes>
            </div>
        </Router>
    </AuthProvider>
};
export default App;