import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { HelmetProvider } from "react-helmet-async";

export default function RootLayout() {
  return (
    <>
      <HelmetProvider>
        <Header />
        <Outlet />
      </HelmetProvider>
    </>
  );
}
