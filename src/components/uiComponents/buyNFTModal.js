import "./uiComponents.css";
import { useNFTs } from "../../hooks";
import { useState } from "react";
import toast from "react-hot-toast";

const BuyNFTModal = ({ isOpen, setIsOpen, nft }) => {
	const { buyNFT } = useNFTs();

	const [value, setValue] = useState(nft.saleprice.toString());

	return (
		<div
			style={{
				boxSizing: "border-box",
				borderRadius: "8px",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: "491px",
				height: "355px",
				background: "#12192B",
				padding: "10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Place an offer</h1>
			<p>You are about to bid to {nft.title}</p>
			<div
				className="walletCardFlex"
				style={{ flexDirection: "column", marginTop: "20px" }}
			>
				<div
					style={{
						width: "80%",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						padding: "10px",
						marginBottom: "20px",
						background: "#24293C",
						backdropFilter: "blur(96.1806px)",
					}}
				>
					<input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						type="number"
						style={{
							width: "80%",
							padding: "10px",
							background: "transparent",
							color: "#fff",
						}}
					/>
					ONE
				</div>
				<div
					style={{
						width: "80%",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						marginBottom: "20px",
						color: "#eee",
					}}
				>
					<p
						style={{
							width: "80%",
						}}
					>
						Minimum Offer
					</p>
					<p>{nft.saleprice.toString()} ONE</p>
				</div>
			</div>
			<div
				style={{
					width: "80%",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					marginBottom: "20px",
					color: "#eee",
				}}
			>
				<div
					style={{
						padding: "10px",
						borderRadius: "10px",
						border: "2px solid #fff",
						cursor: "pointer",
						width: "80%",
						margin: "10px",
						textAlign: "center",
					}}
				>
					Cancel
				</div>
				<div
					onClick={() => buyNFT(nft, value)}
					style={{
						padding: "10px",
						background: "#fff",
						color: "#000",
						cursor: "pointer",
						borderRadius: "10px",
						width: "80%",
						margin: "10px",
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					SUBMIT OFFER
				</div>
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

export default BuyNFTModal;
