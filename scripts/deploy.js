async function main() {

  const ShoeVerification = await ethers.getContractFactory(
    "ShoeVerification"
  );

  console.log("Deploying contract...");

  const shoeVerification = await ShoeVerification.deploy();

  await shoeVerification.waitForDeployment();

  console.log(
    "Contract deployed to:",
    await shoeVerification.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});