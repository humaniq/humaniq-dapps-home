import React, { useEffect, useState } from "react";
import closeIcon from "../../static/images/close-icon.svg";
// @ts-ignore
import { Collapse } from "react-collapse";
import "./index.sass";
import arrowIcon from "../../static/images/arrow-down.svg";
import { IDapp } from "../../data/all-dapps";
import { app } from "../../stores/appStore/appStore";

export interface DappProps {
  onClose?: (str: string) => any;
  data: IDapp;
  size?: string;
  closable?: boolean;
  position: number;
}

export const Dapp: React.FC<DappProps> = ({
  onClose: close,
  data: { icon, url, description, name, title },
  size,
  closable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    const site = new URL(url);
    setHost(site.host);
  }, [url]);

  const renderDescription = (
    description:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  ) => {
    return (
      description && (
        <div>
          {/*<div className={ 'dapp-border' }/>*/}
          <p className={"dapp-desc"}>{description}</p>
        </div>
      )
    );
  };

  const onClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (close) {
      close(url);
    }
  };

  return (
    <div className={"dapp"}>
      <div
        className={"row"}
        onClick={(e) => {
          e.stopPropagation();
          app.alert.displayAlert = true;
          app.alert.alertMessage = "Link copied";
          console.log("ASDASDSA");
        }}
      >
        {title && <p className={"title"}>{title}</p>}
      </div>
      <div className={"row"}>
        <div className={"column"}>
          <img
            src={icon}
            className={`dapp-logo ${size === "small" ? "dapp-logo-small" : ""}`}
            alt={`${name} logo`}
          />
        </div>
        <div
          className={"column grow"}
          onClick={() => (window.location.href = url)}
        >
          <div className={"dapp-row"}>
            <div className="dapp-content">
              <p
                className={`dapp-name ${
                  size === "small" ? "dapp-name-small" : ""
                }`}
              >
                {name}
              </p>
              {description ? renderDescription(description) : null}
            </div>
            {closable && (
              <button className={"dapp-close"} onClick={onClose}>
                <img src={closeIcon} alt={"close button"} />
              </button>
            )}
          </div>
          <div className={"dapp-row"}>
            <Collapse isOpened={isOpen}>
              <a href={url} className={"dapp-url"}>
                {host}
              </a>
            </Collapse>
          </div>
        </div>
        <div className={"column center"} onClick={() => setIsOpen(!isOpen)}>
          <img src={arrowIcon} className={`arrow ${!isOpen ? "rotate" : ""}`} />
        </div>
      </div>
    </div>
  );
};
