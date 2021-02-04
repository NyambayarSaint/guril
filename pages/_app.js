import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";

class MyApp extends App {
  state = {
    menu: {},
    networks: [],
    information: {},
    config: {},
    general: {},
    completelyLoaded: false,
    darken: false,
    name: 'Ub guril',
    description: 'To be continued...',
    serverUrl: 'http://192.168.10.88:1351',
    frontUrl: 'http://192.168.10.88:8087'
  };
  async componentDidMount() {
    const res = await checkLanguage(queryString, null);
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config, menu: res.data.menu.Menu, general: res.data.menu.Footer, information: res.data.menu.Copyright});

    // GOOGLE TAG MANAGER
    // const tagManagerArgs = { gtmId: "GTM-5GWNX89" };
    // TagManager.initialize(tagManagerArgs);
  }

  handleDarken = (msg) => {
    msg === "close" && this.setState({ darken: false });
    !msg && this.setState({ darken: !this.state.darken });
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MenuProvider value={{
          ...this.state,
          handleDarken: this.handleDarken
        }}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

const queryString = `
{
  menu {
    Menu {
      Name
      Path
      Sub{
        Name Path Icon {url formats}
      }
    }
    Footer{
      Name Path
    }
    Copyright
  }
}
`;