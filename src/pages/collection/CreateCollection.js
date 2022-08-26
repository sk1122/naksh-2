import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { HiPlusCircle } from "react-icons/hi";
import { FiMinus, FiPlus } from "react-icons/fi";

import { GradientBtn } from "../../components/uiComponents/Buttons";

export default function CreateCollection(props) {
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
		</div>
	);
}
