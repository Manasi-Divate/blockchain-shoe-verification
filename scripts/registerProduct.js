async function main() {

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ShoeVerification = await ethers.getContractFactory(
    "ShoeVerification"
  );

  const contract = ShoeVerification.attach(contractAddress);

  console.log("Registering product...");

  const tx = await contract.registerProduct(
    101,
    "AirMax Genesis",
    "Nike",
    "Nike Factory"
  );

  await tx.wait();

  console.log("Product Registered Successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});