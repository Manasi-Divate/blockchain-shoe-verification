async function main() {
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

  const ShoeVerification = await ethers.getContractFactory("ShoeVerification");
  const contract = ShoeVerification.attach(contractAddress);

  const product = await contract.verifyProduct(103);

  console.log("Product ID:", product[0].toString());
  console.log("Name:", product[1]);
  console.log("Brand:", product[2]);
  console.log("Manufacturer:", product[3]);
  console.log("Distributor:", product[4]);
  console.log("Retailer:", product[5]);
  console.log("Status:", product[6]);
  console.log("Verified:", product[7]);
}

main().catch((error) => {
  console.error(error);
});