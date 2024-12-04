import "./globals.css";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Suspense } from "react";
import Routes from "./routes/routes";
import AppLoading from "./pages/app-loading";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => (
  <Suspense fallback={<AppLoading />}>
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
    </IonApp>
  </Suspense>
);

export default App;
