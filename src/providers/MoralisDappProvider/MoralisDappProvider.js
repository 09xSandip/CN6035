import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

window.process = { env: { NODE_ENV: "development" } };

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState("0x539");
  const [contractABI, setContractABI] = useState(
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]',
  );
  const [marketAddress, setMarketAddress] = useState(
    "0x29e698158d6ac107dabb5d3c1106aa2a9a70ab9b",
  );

  useEffect(() => {
    if (Moralis) {
      Moralis.onChainChanged(function (chain) {
        setChainId(chain);
      });

      Moralis.onAccountsChanged(function (address) {
        setWalletAddress(address[0]);
      });
    }
  }, [Moralis]);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get("ethAddress"),
      ),
    [web3, user],
  );

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
