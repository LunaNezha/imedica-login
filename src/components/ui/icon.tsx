import { IonIcon } from "@ionic/react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  checkmarkOutline,
  chevronForwardOutline,
  closeOutline,
  eyeOffOutline,
  eyeOutline,
  heartOutline,
  homeOutline,
  informationCircleOutline,
  keyOutline,
  leafOutline,
  lockClosedOutline,
  logoApple,
  logoGoogle,
  menuOutline,
  moonOutline,
  personOutline,
  phonePortraitOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  sunnyOutline,
} from "ionicons/icons";

const icons = {
  arrowBack: arrowBackOutline,
  arrowForward: arrowForwardOutline,
  check: checkmarkOutline,
  chevron: chevronForwardOutline,
  close: closeOutline,
  eye: eyeOutline,
  eyeOff: eyeOffOutline,
  heart: heartOutline,
  home: homeOutline,
  info: informationCircleOutline,
  key: keyOutline,
  leaf: leafOutline,
  lock: lockClosedOutline,
  apple: logoApple,
  google: logoGoogle,
  menu: menuOutline,
  moon: moonOutline,
  user: personOutline,
  phone: phonePortraitOutline,
  shield: shieldCheckmarkOutline,
  sparkles: sparklesOutline,
  sun: sunnyOutline,
};
export type IconName = keyof typeof icons;
export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <IonIcon
      icon={icons[name]}
      className={"im-icon " + className}
      aria-hidden="true"
    />
  );
}
