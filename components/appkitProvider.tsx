// context/index.tsx
"use client";

import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bsc } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "Alpha",
  description: "Binance Alpha",
  url: "https://alpha.muyuai.top", // origin must match your domain & subdomain
  icons: [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  ],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  themeMode: "light",
  networks: [bsc],
  defaultNetwork: bsc,
  metadata: metadata,
  allWallets: "HIDE",

  features: {
    connectMethodsOrder: ["wallet"],
    emailShowWallets: false,
    email: false,
    analytics: false, // Optional - defaults to your Cloud configuration
    socials: [],
  },
  featuredWalletIds: [
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
  ],
  excludeWalletIds: [
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709", //okx
    "8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6", //Me
    "541d5dcd4ede02f3afaf75bf8e3e4c4f1fb09edb5fa6c4377ebf31c2785d9adf",
  ],
  enableWalletGuide: false,
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
