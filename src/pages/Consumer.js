import { useEffect, useState } from "react";
import { getContract } from "../blockchain/contract";
import { fetchJsonFromIpfs } from "../blockchain/ipfs";

export default function Consumer({ theme }) {
  const isDark = theme === "dark";
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    if (id) setProductId(id);
  }, []);

  const verifyProduct = async () => {
    if (!productId) {
      alert("Please enter a Product ID to verify.");
      return;
    }

    try {
      const contract = await getContract();

      const result = await contract.verifyProduct(Number(productId));

      let image = null;
      let description = '';
      const metadataUri = result[7];

      if (metadataUri && metadataUri.startsWith("ipfs://")) {
        try {
          const cid = metadataUri.replace("ipfs://", "");
          const ipfsMeta = await fetchJsonFromIpfs(cid);
          image = ipfsMeta.image;
          description = ipfsMeta.description;
        } catch (err) {
          console.warn("IPFS metadata fetch failed", err);
        }
      }

      if (!image) {
        try {
          image = localStorage.getItem(`product:${productId}:image`);
        } catch {
          image = null;
        }
      }

      if (!description) {
        try {
          description = localStorage.getItem(`product:${productId}:description`) || '';
        } catch {
          description = '';
        }
      }

      setProductData({
        id: result[0].toString(),
        name: result[1],
        brand: result[2],
        manufacturer: result[3],
        distributor: result[4],
        retailer: result[5],
        status: result[6],
        verified: result[8],
        image: image || '/images/nike.jpg',
        description: description || ''
      });
    } catch (error) {
      console.error("Verify product error:", error);
      const msg = (error && (error.reason || error.message || (error.error && error.error.message))) || "Product not found";
      alert(msg);
    }
  };

  const panelClass = isDark ? "bg-gradient-to-br from-zinc-900 to-black border border-gray-800 text-white" : "bg-slate-100 border border-gray-300 text-black";
  const innerPanelClass = isDark ? "bg-black border border-gray-700 rounded-3xl p-8" : "bg-white border border-gray-300 rounded-3xl p-8";
  const inputClass = isDark ? "w-full bg-zinc-900 border border-gray-700 rounded-2xl px-6 py-4 text-white" : "w-full bg-white border border-gray-300 rounded-2xl px-6 py-4 text-black";
  const cardBgClass = isDark ? "mt-10 bg-zinc-900 border" : "mt-10 bg-white border";
  const cardTextClass = isDark ? "text-gray-400" : "text-slate-600";

  return (
    <section className={`px-10 pb-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className={`max-w-2xl mx-auto rounded-[40px] p-12 ${panelClass}`}>
        <div className="text-center mb-8">
          <p className={`${isDark ? "text-gray-500" : "text-slate-500"} uppercase tracking-[0.3em] mb-4`}>Consumer Verification</p>
          <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}>Verify Product Authenticity</h2>
        </div>

        <div className={innerPanelClass}>
          <input
            type="number"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={inputClass}
          />

          <button onClick={verifyProduct} className={`w-full mt-6 py-4 rounded-2xl font-bold ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>Verify Product</button>
        </div>

        {productData && (
          <div className={`${cardBgClass} ${productData.verified ? "border-green-500" : "border-red-500"} rounded-3xl p-8`}>
            <div className="flex justify-between items-center">
              <div>
                  <h3 className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}>{productData.name || "Unknown Product"}</h3>
                <p className={`${cardTextClass} mt-2`}>Product ID: {productData.id}</p>
              </div>

              <div className={`font-bold text-xl ${productData.verified ? "text-green-400" : "text-red-400"}`}>
                {productData.verified ? "✓ Authentic" : "✗ Fake"}
              </div>
            </div>

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                <div className="md:col-span-1">
                  <img src={productData.image || '/images/nike.jpg'} alt={productData.name} className="w-full h-48 object-cover rounded-2xl" onError={(e)=>{e.currentTarget.src='/images/nike.jpg'}} />
                  {productData.description && <p className={`mt-3 ${cardTextClass}`}>{productData.description}</p>}
                </div>
              <InfoCard title="Brand" value={productData.brand} theme={theme} />
              <InfoCard title="Manufacturer" value={productData.manufacturer} theme={theme} />
              <InfoCard title="Distributor" value={productData.distributor || "Not updated yet"} theme={theme} />
              <InfoCard title="Retailer" value={productData.retailer || "Not updated yet"} theme={theme} />
              <InfoCard title="Current Status" value={productData.status || "Not registered"} theme={theme} />
              <InfoCard title="Blockchain Status" value={productData.verified ? "Verified" : "Fake"} theme={theme} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function InfoCard({ title, value, theme }) {
  const isDarkCard = theme === "dark";
  return (
    <div className={`${isDarkCard ? "bg-black border border-gray-800 text-white" : "bg-white border border-gray-300 text-black"} rounded-2xl p-6`}>
      <p className={`${isDarkCard ? "text-gray-500" : "text-slate-500"} text-sm`}>{title}</p>
      <h4 className="mt-2 text-xl font-semibold">{value || "Not available"}</h4>
    </div>
  );
}
