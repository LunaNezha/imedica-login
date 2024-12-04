import { IonSpinner } from "@ionic/react";
import { cn } from "@src/utils/classnames";

type Props = {
  className: string;
};

const ButtonLoader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "bg-white-950/50 dark:bg-big-stone-950/80 absolute inset-0 flex items-center justify-center",
        className,
      )}
    >
      <IonSpinner name="dots" color={"light"} />
    </div>
  );
};

export default ButtonLoader;
