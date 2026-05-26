import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getContract } from "./blockchain/contract";

function App() {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);

  const [mProductId, setMProductId] = useState("");
  const [mName, setMName] = useState("");
  const [mBrand, setMBrand] = useState("");
  const [mManufacturer, setMManufacturer] = useState("");

  const [dProductId, setDProductId] = useState("");
  const [distributor, setDistributor] = useState("");

  const [rProductId, setRProductId] = useState("");
  const [retailer, setRetailer] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");

    if (id) {
      setProductId(id);
    }
  }, []);

  const registerProduct = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.registerProduct(
        Number(mProductId),
        mName,
        mBrand,
        mManufacturer
      );

      await tx.wait();

      alert("Product registered successfully by Manufacturer!");

      <div className="mt-8 bg-black border border-gray-700 rounded-2xl p-6 text-center">
  <h3 className="text-xl font-bold mb-4">Product QR Code</h3>

  <div className="bg-white p-4 inline-block rounded-xl">
    <QRCodeCanvas
      value={`http://localhost:3000?productId=${mProductId || "103"}`}
      size={180}
    />
  </div>

  <p className="text-gray-400 mt-4">
    Scan this QR to verify product
  </p>
</div>

      setMProductId("");
      setMName("");
      setMBrand("");
      setMManufacturer("");
    } catch (error) {
      console.error(error);
      alert("Product registration failed");
    }
  };

  const updateDistributor = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.updateDistributor(
        Number(dProductId),
        distributor
      );

      await tx.wait();

      alert("Distributor updated successfully!");

      setDProductId("");
      setDistributor("");
    } catch (error) {
      console.error(error);
      alert("Distributor update failed");
    }
  };

  const updateRetailer = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.updateRetailer(
        Number(rProductId),
        retailer
      );

      await tx.wait();

      alert("Retailer updated successfully!");

      setRProductId("");
      setRetailer("");
    } catch (error) {
      console.error(error);
      alert("Retailer update failed");
    }
  };

  const verifyProduct = async () => {
    try {
      const contract = await getContract();

      const result = await contract.verifyProduct(Number(productId));

      setProductData({
        id: result[0].toString(),
        name: result[1],
        brand: result[2],
        manufacturer: result[3],
        distributor: result[4],
        retailer: result[5],
        status: result[6],
        verified: result[7],
      });
    } catch (error) {
      console.error(error);
      alert("Product not found");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide">BlockSole</h1>

        <ul className="flex gap-8 text-gray-300">
          <li>Manufacturer</li>
          <li>Distributor</li>
          <li>Retailer</li>
          <li>Consumer</li>
        </ul>
      </nav>

      <section className="text-center px-6 py-20">
        <p className="text-gray-400 uppercase tracking-[0.3em] mb-4">
          Blockchain Shoe Authentication
        </p>

        <h1 className="text-6xl font-extrabold">
          Complete Supply Chain Verification
        </h1>

        <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
          Manufacturer registers the product, distributor updates shipment,
          retailer confirms availability, and consumer verifies authenticity.
        </p>
      </section>

      <section className="px-10 pb-20">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <div className="text-5xl mb-6">🏭</div>
            <h3 className="text-2xl font-bold mb-4">Manufacturer</h3>
            <p className="text-gray-400">
              Registers original product details on blockchain.
            </p>
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <div className="text-5xl mb-6">🚚</div>
            <h3 className="text-2xl font-bold mb-4">Distributor</h3>
            <p className="text-gray-400">
              Updates distributor and shipment information.
            </p>
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <div className="text-5xl mb-6">🏬</div>
            <h3 className="text-2xl font-bold mb-4">Retailer</h3>
            <p className="text-gray-400">
              Confirms product reached retail store.
            </p>
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <div className="text-5xl mb-6">📱</div>
            <h3 className="text-2xl font-bold mb-4">Consumer</h3>
            <p className="text-gray-400">
              Verifies whether the product is authentic or fake.
            </p>
          </div>
        </div>
      </section>

      <section className="px-10 pb-24">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Supply Chain Dashboard
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              🏭 Manufacturer Register Product
            </h3>

            <input
              type="number"
              placeholder="Product ID"
              value={mProductId}
              onChange={(e) => setMProductId(e.target.value)}
              className="w-full mb-4 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Shoe Name"
              value={mName}
              onChange={(e) => setMName(e.target.value)}
              className="w-full mb-4 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Brand"
              value={mBrand}
              onChange={(e) => setMBrand(e.target.value)}
              className="w-full mb-4 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Manufacturer"
              value={mManufacturer}
              onChange={(e) => setMManufacturer(e.target.value)}
              className="w-full mb-6 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <button
              onClick={registerProduct}
              className="w-full bg-white text-black py-3 rounded-xl font-bold"
            >
              Register Product
            </button>
          {mProductId && (
  <div className="mt-6 bg-black border border-gray-700 rounded-2xl p-6 text-center">
    <h4 className="text-lg font-bold mb-4">
      Product QR Code
    </h4>

    <div className="bg-white p-4 inline-block rounded-xl">
      <QRCodeCanvas
        value={`http://192.168.1.7:3000?productId=${mProductId}`}
        size={160}
      />
    </div>

    <p className="text-gray-400 mt-4 text-sm">
      Scan this QR to verify Product ID {mProductId}
    </p>
  </div>
)}
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              🚚 Distributor Update
            </h3>

            <input
              type="number"
              placeholder="Product ID"
              value={dProductId}
              onChange={(e) => setDProductId(e.target.value)}
              className="w-full mb-4 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Distributor Name"
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
              className="w-full mb-6 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <button
              onClick={updateDistributor}
              className="w-full bg-white text-black py-3 rounded-xl font-bold"
            >
              Update Distributor
            </button>
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              🏬 Retailer Update
            </h3>

            <input
              type="number"
              placeholder="Product ID"
              value={rProductId}
              onChange={(e) => setRProductId(e.target.value)}
              className="w-full mb-4 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Retailer Name"
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
              className="w-full mb-6 bg-black border border-gray-700 rounded-xl px-4 py-3"
            />

            <button
              onClick={updateRetailer}
              className="w-full bg-white text-black py-3 rounded-xl font-bold"
            >
              Update Retailer
            </button>
          </div>
        </div>
      </section>

      <section className="px-10 pb-32">
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-gray-800 rounded-[40px] p-12">
          <div className="text-center mb-12">
            <p className="text-gray-500 uppercase tracking-[0.3em] mb-4">
              Consumer Verification
            </p>

            <h2 className="text-5xl font-bold">
              Verify Product Authenticity
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-gray-700 rounded-3xl p-8">
              <input
                type="number"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full bg-zinc-900 border border-gray-700 rounded-2xl px-6 py-4 text-white"
              />

              <button
                onClick={verifyProduct}
                className="w-full mt-6 bg-white text-black py-4 rounded-2xl font-bold"
              >
                Verify Product
              </button>
            </div>

            {productData && (
              <div
                className={`mt-10 bg-zinc-900 border ${
                  productData.verified ? "border-green-500" : "border-red-500"
                } rounded-3xl p-8`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold">
                      {productData.name || "Unknown Product"}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      Product ID: {productData.id}
                    </p>
                  </div>

                  <div
                    className={`font-bold text-xl ${
                      productData.verified ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {productData.verified ? "✓ Authentic" : "✗ Fake"}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-10">
                  <InfoCard title="Brand" value={productData.brand} />
                  <InfoCard
                    title="Manufacturer"
                    value={productData.manufacturer}
                  />
                  <InfoCard
                    title="Distributor"
                    value={productData.distributor || "Not updated yet"}
                  />
                  <InfoCard
                    title="Retailer"
                    value={productData.retailer || "Not updated yet"}
                  />
                  <InfoCard
                    title="Current Status"
                    value={productData.status || "Not registered"}
                  />
                  <InfoCard
                    title="Blockchain Status"
                    value={productData.verified ? "Verified" : "Fake"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-black rounded-2xl p-6 border border-gray-800">
      <p className="text-gray-500 text-sm">{title}</p>
      <h4 className="mt-2 text-xl font-semibold">
        {value || "Not available"}
      </h4>
    </div>
  );
}

export default App;