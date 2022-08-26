import { useAppContext } from "../context/wallet";
import abi from "../interface/abi.json";
import { ethers, BigNumber } from "ethers";
import toast from "react-hot-toast";

export const useNFTs = () => {
	const {
		evmProvider,
		contract,
		evmWalletData,
		setContract,
		CONTRACT_ADDRESS,
	} = useAppContext();

	const getNFTsOnSale = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				if (contract) {
					console.log(contract);
					const data = await contract.getNFTonSale();
					resolve(data);
				}
			} catch (e) {
				console.log("a", e);
				reject(e);
			}
		});
	};

	const buyNFT = async (nft, value) => {
		return new Promise(async (resolve, reject) => {
			const toastId = toast.loading(`Bidding on ${nft.title}`);

			if (Number(value) < nft.saleprice.toNumber()) {
				toast.error(
					`Bid lower than initial price of ${nft.saleprice.toString()} ONE`,
					{
						id: toastId,
					}
				);
				return;
			}

			try {
				if (contract) {
					if (!contract.signer)
						setContract(
							new ethers.Contract(
								CONTRACT_ADDRESS,
								abi,
								evmWalletData.signer
							)
						);

					if (!nft.isOnSale) throw "NFT is not on sale";

					const data = await contract.bid(nft.tokenId, {
						value: value,
						gasPrice: evmProvider.getGasPrice(),
						gasLimit: 100000,
					});

					await data.wait();

					toast.success(`Successfully Bidded on ${nft.title}`, {
						id: toastId,
					});

					resolve("Your Bid was successfully!");
				}
			} catch (e) {
				toast.error(`Can't bid on ${nft.title}`, {
					id: toastId,
				});
				reject(e);
			}
		});
	};

	const listNFT = async (nft, typeOfListing, config) => {
		console.log(nft, config, nft !== undefined && config !== undefined);
		const toastId = toast.loading("Listing your NFT");
		try {
			const contract = new ethers.Contract(
				CONTRACT_ADDRESS,
				abi,
				evmWalletData.signer
			);
			if (nft !== undefined && config !== undefined) {
				if (typeOfListing === 1) {
					const tx = await contract.setSale(
						nft.tokenId,
						BigNumber.from(config.price),
						{
							gasPrice: evmProvider.getGasPrice(),
							gasLimit: 100000,
						}
					);
					await tx.wait();
					toast.success("Successfully listed your NFT", {
						id: toastId,
					});
				} else {
					const tx1 = await contract.startAuction(
						nft.tokenId,
						BigNumber.from(config.price),
						BigNumber.from(config.auctionTime),
						{
							gasPrice: evmProvider.getGasPrice(),
							gasLimit: 100000,
						}
					);
					const tx = await contract.setSale(
						nft.tokenId,
						BigNumber.from(config.price),
						{
							gasPrice: evmProvider.getGasPrice(),
							gasLimit: 100000,
						}
					);
					await tx.wait();
					toast.success("Successfully listed your NFT", {
						id: toastId,
					});
				}
			} else {
				toast.error("Problem with selected nft", {
					id: toastId,
				});
			}
		} catch (e) {
			console.log(e);
			toast.error("Problem with selected nft", {
				id: toastId,
			});
		}
	};

	const getBids = async (tokenId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const contract = new ethers.Contract(
					CONTRACT_ADDRESS,
					abi,
					evmWalletData.signer
				);

				const history = await contract.getBidHistory(tokenId);

				resolve(history);
			} catch (e) {
				console.log(e);
				reject(e);
			}
		});
	};

	return {
		getNFTsOnSale,
		buyNFT,
		listNFT,
		getBids,
	};
};
