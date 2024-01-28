import { Navigate } from "react-router-dom";
import { useEffect, Suspense, useState } from "react";
import Spinner from "../spinner/Loading-spinner";
import { useUser } from "@hooks/useUser";
import { isUserLoggedIn } from "@utils";

const PrivateRoute = ({ children, route }) => {
  const { can } = useUser();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (route) {
      // let action = null;
      // let resource = null;
      let permission = false;

      if (route.meta) {
        // action = route.meta.action;
        // resource = route.meta.resource;
        permission = route.meta?.permission || null;
      }

      if (
        (!isUserLoggedIn() && route.meta === undefined) ||
        (!isUserLoggedIn() &&
          route.meta &&
          !route.meta.authRoute &&
          !route.meta.publicRoute)
      ) {
        setRedirectPath("/login");
      } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
        setRedirectPath("/");
      } else if (isUserLoggedIn() && permission && !can(permission)) {
        setRedirectPath("/misc/not-authorized");
      }
    }
  }, [route]);

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;
