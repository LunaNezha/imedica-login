import { useIonActionSheet } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

const SWModal = () => {
  // replaced dynamically
  const buildDate = "__DATE__";
  // replaced dyanmicaly
  const reloadSW = "__RELOAD_SW__";

  const [present] = useIonActionSheet();
  const { t } = useTranslation("translations");

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // @ts-expect-error just ignore
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            r.update();
          }, 20000);
      }
    },
    onRegisterError(error) {},
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <>
      {(offlineReady || needRefresh) &&
        present({
          header: offlineReady
            ? t("messages.offline_app")
            : t("messages.reload_page"),
          buttons: [
            needRefresh
              ? {
                  text: t("buttons.reload"),
                  handler: () => {
                    updateServiceWorker(true);
                  },
                  data: {
                    action: "selected",
                  },
                }
              : {},
            {
              text: t("buttons.close"),
              role: "cancel",
              handler: () => {
                close();
              },
              data: {
                action: "cancel",
              },
            },
          ],
        })}

      <div className="invisible">{buildDate}</div>
    </>
  );
};

export default SWModal;
