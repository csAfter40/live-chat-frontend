import React from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const value = {
		isAuthenticated: isAuthenticated,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
