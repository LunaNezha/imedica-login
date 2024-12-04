import { Route } from "react-router";
import { lazy } from "react";
import authRouteLists from "./auth-route-lists";
import mainRouteLists from "./main-route-lists";
import { IonRouterOutlet } from "@ionic/react";

const AuthLayout = lazy(() => import("@src/layouts/auth-layout"));
const MainLayout = lazy(() => import("@src/layouts/main-layout"));
const NotFound = lazy(() => import("@src/pages/not-found"));

const Routes = () => {
  return (
    <IonRouterOutlet>
      {/* main route lists */}
      {mainRouteLists.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          render={() => <MainLayout>{item.component}</MainLayout>}
        />
      ))}

      {/* auth route lists */}
      {authRouteLists.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          render={() => <AuthLayout>{item.component}</AuthLayout>}
        />
      ))}

      {/* not found - 404 */}
      {/* <Route
        path={PathNames.NotFound}
        render={() => (
          <AuthLayout>
            <NotFound />
          </AuthLayout>
        )}
      /> */}
    </IonRouterOutlet>
  );
};

export default Routes;
