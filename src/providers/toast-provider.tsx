import { SnackbarProvider, closeSnackbar } from "notistack";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@src/components/ui/icon";

type Props = {
  children: ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  const { t } = useTranslation("translations");

  return (
    <SnackbarProvider
      dense
      preventDuplicate
      maxSnack={3}
      autoHideDuration={4500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      action={(id) => (
        <button
          type="button"
          className="toast-dismiss"
          onClick={() => closeSnackbar(id)}
        >
          {t("buttons.dismiss")}
        </button>
      )}
      iconVariant={{
        success: <Icon name="check" />,
        error: <Icon name="info" />,
        warning: <Icon name="info" />,
        info: <Icon name="info" />,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastProvider;
