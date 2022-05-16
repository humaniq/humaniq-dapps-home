import "./styles.sass";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { User } from "../../stores/userStore";
import { t } from "i18next";
import { observer } from "mobx-react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00/00/0000"
        inputRef={ref as any}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export interface HumaniqIdFormProps {
  user: User;
  onBackClick: () => void;
  inputRef: any;
  onFileChoose: (val: any) => any;
  openFileExplorer: (val: any) => any;
}

export const HumaniqIdForm: React.FC<HumaniqIdFormProps> = observer(
  ({ user, onBackClick, inputRef, onFileChoose, openFileExplorer }) => {
    return (
      <div className={"card-container"}>
        <input
          onChange={onFileChoose}
          accept="image/png, image/jpeg"
          type="file"
          id={"file"}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <IconButton className={"back-icon"} onClick={onBackClick}>
          <ArrowBackIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <div className={"image-container"} onClick={openFileExplorer}>
          <Avatar sx={{ width: 80, height: 80 }} src={user.photoURI} />
          <div className={"change-photo"}>Change profile photo</div>
        </div>
        <div className={"form-container"}>
          <TextField
            label={t("firstName")}
            value={user.firstName}
            onChange={(e) => {
              user.setFirstName(e.target.value);
            }}
            error={!!user.firstNameError}
            helperText={user.firstNameError}
          />
          <TextField
            label={t("lastName")}
            value={user.lastName}
            onChange={(e) => user.setLastName(e.target.value)}
            error={!!user.lastNameError}
            helperText={user.lastNameError}
          />
          <FormControl variant="outlined">
            <InputLabel
              variant={"outlined"}
              htmlFor="formatted-text-mask-input"
              error={!!user.birthDateError}
            >
              {t("birthDate")}
            </InputLabel>
            <OutlinedInput
              label={t("birthDate")}
              id="formatted-text-mask-input"
              value={user.getBirthDate}
              onChange={(e) => user.setBirthDate(e.target.value)}
              inputComponent={TextMaskCustom as any}
              error={!!user.birthDateError}
            />
            <FormHelperText error={!!user.birthDateError}>
              {user.birthDateError}
            </FormHelperText>
          </FormControl>
          <TextField
            label={t("country")}
            value={user.country}
            onChange={(e) => user.setCountry(e.target.value)}
            error={!!user.countryError}
            helperText={user.countryError}
          />
          <TextField
            label={t("city")}
            value={user.city}
            onChange={(e) => user.setCity(e.target.value)}
            error={!!user.cityError}
            helperText={user.cityError}
          />
        </div>
      </div>
    );
  }
);
