import { app } from "../stores/appStore/appStore";
import { ALERT_TYPE } from "../stores/appStore/alertStore";

export const setAlert = (
  message: string,
  type: ALERT_TYPE = ALERT_TYPE.SUCCESS
) => {
  app.alert.alertType = type;
  app.alert.alertMessage = message;
  app.alert.displayAlert = true;
};
