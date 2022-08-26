import { ethers } from "ethers";
import { useSelector } from "react-redux";
import abi from "../../interface/abi.json";

export const CONTRACT_ADDRESS = "0x0e1A78B450efC965C84E4997699206Fc39622B1c";

export default function HarmonyHelperFunction() {
	this.contrat = {};

	this.connectContract = async (userData, dispatch, actionTypes) => {
		const contract = new ethers.Contract(
			CONTRACT_ADDRESS,
			abi,
			userData.signer
		);
		this.contrat = contract;
		dispatch({ type: actionTypes.HARMONY_CONTRACT, payload: contract });
	};

	this.storeSigner = async (provider, dispatch, actionTypes) => {
		return new Promise(async (resolve, reject) => {
			try {
				const signer = await provider.getSigner();
				const address = await signer.getAddress();
				const user = {
					provider: provider,
					address: address,
					signer: signer,
				};

				dispatch({
					type: actionTypes.HARMONY_USER_DATA,
					payload: user,
				});
				dispatch({
					type: actionTypes.HARMONY_IS_WALLET_SIGNED_IN,
					payload: true,
				});

				this.connectContract(user, dispatch, actionTypes);

				resolve(true);
			} catch (e) {
				reject(false);
			}
		});
	};

	this.getAllNFTs = async (contract) => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await contract.getNFTonSale();
				resolve(data);
			} catch (e) {
				reject(e);
			}
		});
	};

	this.buyNFt = async (contract, nft, value) => {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(nft);
				if (!nft.isOnSale) throw "NFT is not on sale";

				const data = await contract.bid(nft.tokenId, { value: value });
				await data.wait();

				resolve("Your Bid was successfully!");
			} catch (e) {
				reject(e);
			}
		});
	};
}
