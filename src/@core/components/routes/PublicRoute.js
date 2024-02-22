// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// ** Utils
import { isUserLoggedIn } from "@utils";
import { useUser } from "@hooks/useUser";

const PublicRoute = ({ children, route }) => {
  const { can } = useUser();

  let permission;
  if (route.meta) {
    permission = route.meta?.permission || null;
  }

  if (
    (!isUserLoggedIn() && route.meta === undefined) ||
    (!isUserLoggedIn() &&
      route.meta &&
      !route.meta.authRoute &&
      !route.meta.publicRoute)
  ) {
    return <Navigate to="/login" />;
  } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
    return <Navigate to="/" />;
  } else if (isUserLoggedIn() && permission && !can(permission)) {
    return <Navigate to="/misc/not-authorized" />;
  } else {
    return <Suspense fallback={null}>{children}</Suspense>;
  }
};

export default PublicRoute;
