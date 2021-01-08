import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem("accessToken") ? (
                <Component {...props} {...rest} />
            ) : (
                    <Redirect to="/" />
                )
        }
    />
);

export const isLogged = () => {
    let logged = false;
    const access = localStorage.getItem('accessToken');
    if (access) {
        logged = true;
    }
    return logged;
}

export const logout = () => {
    localStorage.clear();
    <Redirect to="/" />
}