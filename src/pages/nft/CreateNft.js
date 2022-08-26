import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { HiPlusCircle } from "react-icons/hi";
import { FiMinus, FiPlus } from "react-icons/fi";

import { GradientBtn } from "../../components/uiComponents/Buttons";

export default function CreateNft(props) {
	const [royalty, setRoyalty] = useState(1);

	const incrementRoyalty = () => {
		if (royalty >= 6) return;
		setRoyalty(() => royalty + 1);
	};

	return (
		<div className="w-full space-y-10 h-full md:mt-[105px] sm:mt-0 md:px-[8%] sm:px-0 mb-20">
			<div className="w-full flex justify-around items-center">
				<div className="w-1/2 flex justify-start items-center space-x-4">
					<span className="text-xl font-bold">&larr;</span>
					<h1 className="text-3xl font-bold">Create NFT</h1>
				</div>
				<div className="w-1/2 flex justify-end items-center space-x-4">
					<GradientBtn
						content="Mint NFT"
						style={{ width: "187px" }}
					/>
				</div>
			</div>
			<p>NFT DETAILS</p>
			<div className="w-full h-full md:flex-row flex-col flex justify-center items-center md:items-start space-y-5 md:space-y-0 md:space-x-5">
				<div className="w-full md:w-1/3 h-[500px] flex flex-col justify-center items-start">
					<div className="w-full h-full flex flex-col justify-center items-center p-5 bg-brand-gray">
						<FiUploadCloud className="w-full h-1/2" />
						<h3 className="text-xl font-bold">
							Upload your NFT here
						</h3>
						<p className="text-gray-500">
							(Supports JPEG, .jpg, .png, .mp4 format)
						</p>
					</div>
				</div>
				<div className="w-full px-0 md:w-2/3 h-full space-y-6 flex flex-col justify-center items-center">
					<input
						type="text"
						className="w-full p-3 text-white bg-brand-gray"
						placeholder="Name*"
					/>
					<div className="w-full space-y-3 flex flex-col justify-center items-end">
						<textarea
							name="description"
							id="desc"
							className="w-full bg-brand-gray p-3"
							placeholder="Description*"
							rows={8}
						></textarea>
						<p>0/300</p>
					</div>
					<input
						type="text"
						className="w-full p-3 text-white bg-brand-gray"
						placeholder="Wallet Address*"
					/>
					<div className="w-full space-x-4 flex justify-around items-center">
						<select
							className="w-full p-3 text-white bg-brand-gray"
							name="artform"
							id="artform"
							placeholder="Artwork"
						>
							<option value="Worli">Worli</option>
							<option value="Worli">Worli</option>
							<option value="Worli">Worli</option>
						</select>
						<select
							className="w-full p-3 text-white bg-brand-gray"
							name="collection"
							id="collection"
							placeholder="Collection"
						>
							<option value="Collection 1">Collection 1</option>
							<option value="Collection 2">Collection 2</option>
							<option value="Collection 3">Collection 3</option>
						</select>
					</div>
				</div>
			</div>
			<div className="w-full  h-full space-y-4 flex flex-col justify-center items-start">
				<div className="w-full h-full flex justify-around items-center">
					<div className="w-1/2 h-full flex flex-col justify-center items-start">
						<h1 className="text-lg font-bold">FOREVER ROYALTIES</h1>
						<p className="text-gray-500">
							Forever Royalties are perpetual. You can add
							royalties up to 20% across 6 accounts
						</p>
					</div>
					<div className="w-1/2 h-full flex flex-col justify-center items-end">
						<HiPlusCircle
							onClick={() => incrementRoyalty()}
							className="text-5xl"
						/>
					</div>
				</div>
				<div className="w-full h-full space-y-2 flex flex-col justify-center items-start">
					{Array(royalty)
						.fill(1)
						.map((i) => (
							<div className="w-full h-full space-x-3 flex justify-around items-center">
								<div className="w-2/3 py-3 px-3 flex justify-center items-center bg-brand-gray">
									<input
										type="text"
										className="w-full p-0 text-white bg-brand-gray"
										placeholder="Wallet Address*"
									/>
								</div>
								<div className="w-1/3 py-3 px-3 flex justify-center items-center bg-brand-gray">
									<input
										type="text"
										className="w-full p-0 text-white bg-brand-gray"
										placeholder="Percentage*"
									/>
									<p className="text-md p-0">%</p>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className="space-y-4 ">
				<h1 className="text-lg font-bold">PRICING AND QUANTITY</h1>
				<div className="w-full h-full space-x-4 md:flex-row flex-col flex justify-center items-start">
					<div className="w-full md:w-1/2 h-full space-y-4 flex flex-col justify-center items-start">
						<div className="w-full p-4 flex justify-center items-center bg-brand-gray">
							<input
								type="text"
								className="w-full p-0 text-white bg-brand-gray"
								placeholder="Price for one item"
							/>
							<p className="text-md p-0">ONE</p>
						</div>
						<div className="w-full h-full flex justify-between items-center">
							<div className="w-1/2 flex flex-col justify-center items-start space-y-2">
								<h2>
									Royalties:{" "}
									<span className="font-bold">20%</span>
								</h2>
								<h2>
									Platform Fee:{" "}
									<span className="font-bold">3%</span>
								</h2>
							</div>
							<div className="w-1/2 flex flex-col justify-start items-end space-y-2">
								<h2>
									You Will Receive:{" "}
									<span className="font-bold">100 ONE</span>
								</h2>
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2 h-full py-3 md:py-0 md:px-5 space-x-4 flex justify-center md:justify-end items-center">
						<h1 className="text-md font-normal text-gray-400">
							Quantity (Max 10)
						</h1>
						<div className="flex justify-center items-center space-x-3">
							<FiMinus className="text-3xl cursor-pointer" />
							<h2 className="p-2 text-3xl bg-brand-gray">10</h2>
							<FiPlus className="text-3xl cursor-pointer" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
