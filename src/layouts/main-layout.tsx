import { IonContent, IonPage } from "@ionic/react";
import { lazy } from "react";

const Menu = lazy(() => import("@src/components/main/menu"));
const Navbar = lazy(() => import("@src/components/main/navbar"));

const MainLayout = ({ children }: any) => {
  return (
    <>
      {/* sidebar menu */}
      <Menu />

      <div className="mx-auto h-screen w-full max-w-sm overflow-x-hidden drop-shadow-light">
        <IonPage id="main">
          {/* navbar */}
          <Navbar />

          {/* router outlet */}
          <IonContent>{children}</IonContent>
        </IonPage>
      </div>
    </>
  );
};

export default MainLayout;
