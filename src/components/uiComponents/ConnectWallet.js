import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/svgs/metamask.svg";
import near from "../../assets/svgs/connect-near.svg";
import walletconnect from "../../assets/svgs/walletconnect.svg";
import configs from "../../configs";
import { ethers } from "ethers";
import { connectHarmonyWallet } from "../../redux/actions/actions";
import "./uiComponents.css";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/wallet";

const WalletCard = ({ src, style, onClick }) => {
	return (
		<div>
			<img src={src} onClick={onClick} className="walletCardImg" />
		</div>
	);
};

const ConnectWallet = ({ isOpen, setIsOpen }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const walletInfo = useSelector((state) => state.nearReducer.walletInfo);
	const isWalletSignedIn = useSelector(
		(state) => state.nearReducer.isWalletSignedIn
	);
	const userData = useSelector((state) => state.nearReducer.userData);
	const searchResultsArtists = useSelector(
		(state) => state.dataReducer.searchResultsArtists
	);
	const searchResultsNfts = useSelector(
		(state) => state.dataReducer.searchResultsNfts
	);
	const loading = useSelector(
		(state) => state.dataReducer.headerSearchLoading
	);

	const { evmWallet, setEVMWalletData, setEVMProvider } = useAppContext();

	const connectNear = async () => {
		const toastId = toast.loading("Connecting to Near");
		try {
			if (walletInfo) {
				walletInfo.requestSignIn({
					successUrl: configs.appUrl,
					failureUrl: `${configs.appUrl}/404`,
				});
			}
			toast.success("Successfully connected to Near", {
				id: toastId,
			});
			setIsOpen(false);
		} catch (e) {
			toast.error("Cannot connect to Near", {
				id: toastId,
			});
		}
	};

	const connectMetamask = async () => {
		const toastId = toast.loading("Connect to Metamask");
		try {
			if (evmWallet) {
				const pr = await evmWallet.connectTo("injected");
				console.log(pr);
				const provider = new ethers.providers.Web3Provider(pr);
				const signer = await provider.getSigner();
				setEVMWalletData({
					address: await signer.getAddress(),
					signer: signer,
				});
				setEVMProvider(provider);
			}
			toast.success("Successfully connected to Metamask", {
				id: toastId,
			});
			setIsOpen(false);
		} catch (e) {
			toast.error("Cannot connect to Metamask", {
				id: toastId,
			});
		}
	};

	const connectWalletConnect = async () => {
		const toastId = toast.loading("Connect to WalletConnect");
		try {
			if (evmWallet) {
				const pr = await evmWallet.connectTo("walletconnect");
				console.log(pr);
				const provider = new ethers.providers.Web3Provider(pr);
				const signer = await provider.getSigner();
				setEVMWalletData({
					address: await signer.getAddress(),
					signer: signer,
				});
				setEVMProvider(provider);
			}
			toast.success("Successfully connected to WalletConnect", {
				id: toastId,
			});
			setIsOpen(false);
		} catch (e) {
			toast.error("Cannot connect to WalletConnect", {
				id: toastId,
			});
		}
	};

	const wallets = [
		{
			name: "Near",
			image: near,
			connect: connectNear,
		},
		{
			name: "Metamask",
			image: logo,
			connect: connectMetamask,
		},
		{
			name: "Wallet Connect",
			image: walletconnect,
			connect: connectWalletConnect,
		},
	];

	return (
		<div className="walletCard">
			<h1>Connect Wallet</h1>
			<p>
				Connect to one of our wallets to create a Naksh account and save
				this NFT!
			</p>
			<div className="walletCardFlex">
				{wallets.map((wallet) => (
					<WalletCard
						src={wallet.image}
						onClick={() => wallet.connect()}
						key={wallet.name}
						className="walletCardFlexCard"
					/>
				))}
			</div>
			<div
				onClick={() => setIsOpen(false)}
				style={{
					position: "absolute",
					right: "55px",
					top: "45px",
					cursor: "pointer",
				}}
			>
				X
			</div>
		</div>
	);
};

export default ConnectWallet;
