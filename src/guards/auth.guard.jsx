import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { decrypt } from "../services/crypto";
import { EUserRoles } from "../constants/Role";
import { Routes } from "../constants/routes";

const {
  ADMIN,
  MANAGER,
  CLERK,
  CHEF,
  WAITER
} = EUserRoles;
const {
  AdminRoutes,
  ManagerRoutes
} = Routes;

function AuthGuard() {
  let [authorized, setAuth] = useState(true);
  let location = useLocation();
  useEffect(() => {
    const hash = sessionStorage.getItem("hash");
    const { pathname } = location;
    if (pathname === "/dashboard" || !pathname) {
      setAuth(true);
    } else if (!hash) {
      setAuth(false);
    } else {
      const decode = decrypt(hash);
      const { profile } = decode;
      if (!profile) {
        setAuth(false);
      } else {
        const { role, trainerType } = profile;
        switch (role) {
          case ADMIN:
            setAuth(isAuthorizedToRoute(AdminRoutes));
            break;

          case MANAGER:
            setAuth(isAuthorizedToRoute(ManagerRoutes));
            break;

          default:
            setAuth(false);
        }
      }
    }
  }, [location]);
  const isAuthorizedToRoute = (routes) => {
    const { pathname } = location;
    const routeIndex = routes.findIndex((route) => route === pathname);
    if (routeIndex !== -1) return true;

    const routesWithParams = routes.filter((route) => route.includes(":"));
    const found = searchInRoutesWithParams(routesWithParams);
    return found;
  };

  const searchInRoutesWithParams = (routes) => {
    const { pathname } = location;
    let found = false;
    routes.forEach((route) => {
      let routeWithRemovedParam = route.split(":")[0];
      if (pathname.includes(routeWithRemovedParam)) {
        found = true;
        return false;
      }
    });
    return found;
  };
  return <>{authorized ? <></> : <Redirect to="/page-not-found" />}</>;
}

export default AuthGuard;
