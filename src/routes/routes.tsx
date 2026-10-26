import { matchPath, Route, useLocation } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { updateDocumentMetadata } from "@src/utils/document-metadata";
import authRouteLists from "./auth-route-lists";
import mainRouteLists from "./main-route-lists";
import { IonRouterOutlet } from "@ionic/react";
import { PathNames } from "@src/constants/pathnames.const";

import AuthLayout from "@src/layouts/auth-layout";
import MainLayout from "@src/layouts/main-layout";
import NotFound from "@src/pages/not-found";

const Routes = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isKnownRoute = [...mainRouteLists, ...authRouteLists].some(({ path }) =>
    matchPath(pathname, { path, exact: true }),
  );
  useEffect(() => {
    updateDocumentMetadata(
      t(isKnownRoute ? "metadata.title" : "metadata.not_found_title"),
      t("metadata.description"),
    );
  }, [isKnownRoute, t]);
  return (
    <IonRouterOutlet>
      {/* main route lists */}
      {mainRouteLists.map((item) => (
        <Route
          exact
          key={item.path}
          path={item.path}
          render={() => <MainLayout>{item.component}</MainLayout>}
        />
      ))}

      {/* auth route lists */}
      {authRouteLists.map((item) => (
        <Route
          exact
          key={item.path}
          path={item.path}
          render={() => (
            <AuthLayout welcome={item.path === PathNames.Login}>
              {item.component}
            </AuthLayout>
          )}
        />
      ))}

      {/* Ionic requires a pathless fallback so it cannot override matched routes. */}
      <Route
        render={() => (
          <AuthLayout welcome>
            <NotFound />
          </AuthLayout>
        )}
      />
    </IonRouterOutlet>
  );
};

export default Routes;
