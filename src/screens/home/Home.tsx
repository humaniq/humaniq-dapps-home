import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Avatar, Button, Card, Space, Spin, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { dateFormat } from "../../utils/general";
import { FormInput } from "../../components/input/FormInput";
import colors from "../../utils/colors";
import withStore from "../../hoc/withStore";
import { HomeViewModel } from "./HomeViewModel";
import { UserStore as user } from "../../stores/user/userStore";
import DatePicker from "../../components/date-picker/date-picker";
import { Content } from "antd/es/layout/layout";

export interface HomeScreenInterface {
  store: HomeViewModel;
}

const HomeImpl = ({ store: view }: HomeScreenInterface) => {
  const { t } = useTranslation();
  const inputGalleryRef = useRef<any>();

  useEffect(() => {
    (async () => {
      await view.init(inputGalleryRef);
    })();
  }, []);

  if (user.isFetching) {
    return (
      <Card
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 300,
          borderWidth: 0,
        }}
      >
        <Space direction={"horizontal"}>
          <Spin />
          <Typography.Title level={3}>{t("loading")}</Typography.Title>
        </Space>
      </Card>
    );
  }

  return (
    <Content>
      <Card
        style={{
          textAlign: "center",
          marginBottom: 24,
          borderWidth: 0,
        }}
      >
        <Space direction="vertical">
          <Typography.Title level={1}>{t("yourProfile")}</Typography.Title>

          <Avatar size={100} src={user.avatar} />

          <input
            onChange={view.onFileChoose}
            accept="image/*"
            type="file"
            id="file"
            ref={inputGalleryRef}
            style={{ display: "none" }}
          />
          <Button
            onClick={view.openFileExplorer}
            size={"small"}
            style={{ marginBottom: 20 }}
          >
            {t("changeAvatar")}
          </Button>

          <FormInput
            title={t("firstName")}
            input={user.firstName}
            onChange={user.setFirstName}
            error={user.firstNameError}
          />

          <FormInput
            title={t("lastName")}
            input={user.lastName}
            onChange={user.setLastName}
            error={user.lastNameError}
          />

          <FormInput
            title={t("country")}
            input={user.country}
            onChange={user.setCountry}
            error={user.countryError}
          />

          <FormInput
            title={t("city")}
            input={user.city}
            onChange={user.setCity}
            error={user.cityError}
          />

          <Space direction="vertical" size={12}>
            <Typography.Text>{t("birthDate")}</Typography.Text>
            <DatePicker
              onChange={(value: any, dateString: string) => {
                user.setBirthDate(dateString);
              }}
              style={
                user.birthDateError
                  ? { borderWidth: 1, borderColor: colors.error }
                  : {}
              }
              defaultValue={user.getBirthDate}
              format={dateFormat}
            />
          </Space>

          <Button
            onClick={user.onSubmit}
            size={"large"}
            style={{ marginTop: 30, width: "100%" }}
            type="primary"
          >
            {t("update")}
          </Button>
        </Space>
      </Card>
    </Content>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));
