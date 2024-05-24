import "@/styles/globals.css";
import { AppProps } from "next/app";
import React from "react";
import { FolderProvider } from "src/context/FolderContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <FolderProvider>
      <Component {...pageProps} />
    </FolderProvider>
  );
}

export default App;
