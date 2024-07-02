import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { HelmetProvider } from "react-helmet-async";
import Copyright from "@/components/Copyright";

export default function RootLayout() {
  return (
    <>
      <HelmetProvider>
        <Header />
        <Outlet />
        <Copyright />
      </HelmetProvider>
    </>
  );
}
