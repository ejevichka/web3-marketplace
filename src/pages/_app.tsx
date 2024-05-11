import { type AppType } from "next/app";
import { Chakra_Petch } from "next/font/google";
import Layout from "./layout";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ConnectionProvider } from "~/contexts/connection";

const inter = Chakra_Petch({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ConnectionProvider>
      <main className={`font-sans ${inter.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ConnectionProvider>
  );
};

export default api.withTRPC(MyApp);
