import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CONTRACT_ADDRESS } from "../lib/constants";

export default async function checkBalance(sdk: ThirdwebSDK, address: string) {
  const contract = await sdk.getContract(CONTRACT_ADDRESS);

  const balance = await contract.erc1155.balanceOf(address, 0);
  return balance;

 
}
