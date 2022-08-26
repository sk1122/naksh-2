import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga4";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/wallet";
import "./output.css";
import Header from "./components/uiComponents/Header";
import Routes from "./routes";
import reducer from "./redux";
import { establishWalletConnection } from "./redux/actions/actions";
import "./App.css";
import { useEVMWallet } from "./hooks/useEVMWallet";
import { ethers } from "ethers";
import abi from "./interface/abi.json";

// google analytics initialization
ReactGA.initialize("G-54RZ2BX11S");

function App() {
	const dispatch = useDispatch();
	const { establishHarmonyConnection } = useEVMWallet();

	useEffect(() => {
		// near wallet connection
		dispatch(establishWalletConnection());
	}, []);

	useEffect(() => {
		establishHarmonyConnection();
	}, []);

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className="app-content">
					<Routes />
				</div>
			</div>
		</BrowserRouter>
	);
}

export default function AppWrapper() {
	const store = createStore(reducer, applyMiddleware(thunk));

	const [evmWallet, setEVMWallet] = useState();
	const [evmWalletData, setEVMWalletData] = useState();
	const [evmProvider, setEVMProvider] = useState();
	const [contract, setContract] = useState();
	const CONTRACT_ADDRESS = "0x0e1A78B450efC965C84E4997699206Fc39622B1c";

	// set contract (read-only)
	useEffect(() => {
		const provider = new ethers.providers.JsonRpcProvider(
			"https://polygon-mumbai.g.alchemy.com/v2/Tv9MYE2mD4zn3ziBLd6S94HvLLjTocju"
		);
		const contract1 = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
		setContract(contract1);
	}, []);

	// set contract (read-write)
	useEffect(() => {
		(async () => {
			console.log(evmWalletData, "evmWalletData");
			if (evmWalletData && evmWalletData.signer) {
				console.log(evmWalletData, "evmWalletData1");
				const contract1 = new ethers.Contract(
					CONTRACT_ADDRESS,
					abi,
					evmWalletData.signer
				);
				console.log(await contract1.getNFTonSale());
				setContract(contract1);
			}
		})();
	}, [evmWalletData]);

	const stateValue = {
		evmWallet,
		setEVMWallet,
		evmWalletData,
		setEVMWalletData,
		evmProvider,
		setEVMProvider,
		contract,
		setContract,
		CONTRACT_ADDRESS,
	};

	return (
		<AppContext.Provider value={stateValue}>
			<Provider store={store}>
				<App />
				<Toaster
					containerStyle={{
						top: 90,
					}}
					toastOptions={{
						success: {
							style: {
								background: "rgba(255, 255, 255, 0.6)",
								border: "2px solid #00D115",
								backdropRilter: "blur(17px)",
								borderRadius: 8,
							},
						},
						error: {
							style: {
								background: "red",
							},
						},
					}}
				/>
			</Provider>
		</AppContext.Provider>
	);
}
