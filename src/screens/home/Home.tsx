import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Avatar, Button, Card, Space, Spin, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT } from "../../constants/general";
import { FormInput } from "../../components/input/FormInput";
import colors from "../../utils/colors";
import { HomeViewModel } from "./HomeViewModel";
import { UserStore as user } from "../../stores/user/userStore";
import DatePicker from "../../components/date-picker/date-picker";
import { Content } from "antd/es/layout/layout";
import { withStore } from "../../utils/hoc";

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
  }, [view]);

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
      <div
        style={{
          textAlign: "center",
          margin: 24,
          borderWidth: 0,
        }}
      >
        <Space direction="vertical">
          <Typography.Title level={1}>{t("yourProfile")}</Typography.Title>

          {user.photoUploading ? (
            <Space
              align={"center"}
              style={{
                width: 100,
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size={"large"} />
            </Space>
          ) : (
            <Avatar size={100} src={user.photoURI} />
          )}

          <input
            type="file"
            accept="image/*"
            id="file"
            ref={inputGalleryRef}
            onChange={view.onFileChoose}
            hidden
          />

          <Button
            onClick={view.openFileExplorer}
            size={"middle"}
            style={{ marginBottom: 10 }}
            type="primary"
            color={colors.textGrey}
            loading={user.photoUploading}
            disabled={user.photoUploading}
          >
            {user.photoUploading ? t("uploading") : t("changeAvatar")}
          </Button>

          <FormInput
            title={t("firstName")}
            input={user.firstName}
            onChange={user.setFirstName}
            error={user.firstNameError}
            hint={t("userProfile.form.firstNameHint")}
          />

          <FormInput
            title={t("lastName")}
            input={user.lastName}
            onChange={user.setLastName}
            error={user.lastNameError}
            hint={t("userProfile.form.lastNameHint")}
          />

          <FormInput
            title={t("country")}
            input={user.country}
            onChange={user.setCountry}
            error={user.countryError}
            hint={t("userProfile.form.countryHint")}
          />

          <FormInput
            title={t("city")}
            input={user.city}
            onChange={user.setCity}
            error={user.cityError}
            hint={t("userProfile.form.cityHint")}
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
              format={DATE_FORMAT}
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
      </div>
    </Content>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));
