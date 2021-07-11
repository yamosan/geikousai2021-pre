import type { VFC, ReactNode } from "react";
import Head from "next/head";
import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: VFC<Props> = ({ children, title = "GEIKO TEN 2021" }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" sizes="48x48" href="/favicon/favicon.ico" />
    </Head>
    <Header />
    <main className="bg-bg min-h-screen">{children}</main>
    <Footer />
  </>
);

export default Layout;
