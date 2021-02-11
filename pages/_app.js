import React from "react";
import App from "next/app";
import { AnimatePresence } from "framer-motion";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
import TagManager from "react-gtm-module";
import "@/core/animate-scroll.css";

class MyApp extends App {
  state = {
    menu: {},
    networks: [],
    information: {},
    config: {},
    general: {},
    completelyLoaded: false,
    darken: false,
    name: 'Улаанбаатар гурил ХХК',
    description: 'Үндэсний томоохон үйлдвэрлэгчийн нэг Улаанбаатар Гурилын Үйлдвэр нь 2001 онд анх байгуулагдсан ба улмаар үйлдвэрээ өргөтгөн 2012 онд Дархан хотын үйлдвэрийн районд Турк улсын Alapala компанийн тоног төхөөрөмжөөс бүтсэн хоногт 300 тн улаан буудай тээрэмдэх хүчин чадалтай бүрэн автоматжсан, компьютер удирдлагын системтэй, босоо технологитой 5 давхар үйлдвэр байгуулсан билээ.',
    serverUrl: 'http://ad-ubguril.tavanbogd.com',
    frontUrl: 'http://ubguril.tavanbogd.com'
  };
  async componentDidMount() {
    const res = await checkLanguage(queryString, null);
    const config = { width: window.innerWidth, height: window.innerHeight };
    this.setState({ completelyLoaded: true, config, menu: res.data.menu.Menu, general: res.data.menu.Footer, information: res.data.menu.Copyright});

    // GOOGLE TAG MANAGER
    const tagManagerArgs = { gtmId: "GTM-NTFNJVQ" };
    TagManager.initialize(tagManagerArgs);
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