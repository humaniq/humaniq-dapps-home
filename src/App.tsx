import React, { useEffect } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./screens/home/Home";
import "antd/dist/antd.css";
import "./App.scss";
import routes from "./utils/routes";
import NotFound from "./screens/404/404";
import b from "buffer";
import { observer } from "mobx-react";
import { Layout } from "antd";
import { WalletNotConnected } from "./components/app/WalletNotConnected";
import { ProviderNotFound } from "./components/app/ProviderNotFound";
import { ETHProvider } from "./stores/provider/providerStore";

window.Buffer = b.Buffer;

export const getProviderStore = ETHProvider;

export const App = observer(() => {
  useEffect(() => {
    (async () => {
      await getProviderStore.init();
    })();
  }, []);

  return (
    <Layout className="App">
      <Header />
      {getProviderStore.initialized ? (
        <>
          {getProviderStore.hasProvider ? (
            <>
              {getProviderStore.currentAccount ? (
                <Router>
                  <Routes>
                    <Route path={routes.home.path} element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              ) : (
                <WalletNotConnected />
              )}
            </>
          ) : (
            <ProviderNotFound />
          )}
        </>
      ) : null}
      <Footer />
    </Layout>
  );
});
