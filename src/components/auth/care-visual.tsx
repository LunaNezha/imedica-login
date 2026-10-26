import { useTranslation } from "react-i18next";
import { BrandMark } from "@src/components/ui/brand";
import { Icon } from "@src/components/ui/icon";

export default function CareVisual() {
  const { t } = useTranslation();
  return (
    <div className="care-visual" aria-hidden="true">
      <div className="care-orbit care-orbit--outer" />
      <div className="care-orbit care-orbit--inner" />
      <div className="care-grid" />
      <div className="care-core">
        <BrandMark />
        <svg className="care-pulse" viewBox="0 0 180 50" fill="none">
          <path
            d="M0 26H43L53 18L65 36L82 7L98 43L111 20L122 26H180"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="care-chip care-chip--top">
        <span className="care-chip-icon">
          <Icon name="sparkles" />
        </span>
        <span>
          {t("auth.personal_care")}
          <small>{t("auth.personal_care_detail")}</small>
        </span>
      </div>
      <div className="care-chip care-chip--bottom">
        <span className="care-chip-icon care-chip-icon--heart">
          <Icon name="heart" />
        </span>
        <span>
          {t("auth.peace_of_mind")}
          <small>{t("auth.peace_of_mind_detail")}</small>
        </span>
        <span className="care-status" />
      </div>
      <span className="care-spark care-spark--one" />
      <span className="care-spark care-spark--two" />
    </div>
  );
}
