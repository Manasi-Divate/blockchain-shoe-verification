import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../blockchain/contract";
import { addJsonToIpfs } from "../blockchain/ipfs";

export default function Manufacturer({ theme }) {
  const isDark = theme === "dark";
  const [mProductId, setMProductId] = useState("");
  const [mName, setMName] = useState("");
  const [mBrand, setMBrand] = useState("");
  const [mManufacturer, setMManufacturer] = useState("");
  const [mImage, setMImage] = useState("nike.pdf");
  const [mDescription, setMDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerProduct = async () => {
    if (!mProductId || !mName || !mBrand || !mManufacturer) {
      alert("Please fill all fields before registering the product.");
      return;
    }

    try {
      setLoading(true);

      const metadata = {
        productId: Number(mProductId),
        image: mImage,
        description: mDescription,
        registeredAt: new Date().toISOString(),
      };

      const cid = await addJsonToIpfs(metadata);
      const metadataURI = cid ? `ipfs://${cid}` : "";

      const contract = await getContract();

      const tx = await contract.registerProduct(
        Number(mProductId),
        mName,
        mBrand,
        mManufacturer,
        metadataURI
      );

      await tx.wait();

      // keep a local fallback for browser display if IPFS retrieval is delayed
      try {
        localStorage.setItem(`product:${mProductId}:image`, mImage);
        localStorage.setItem(`product:${mProductId}:description`, mDescription);
      } catch (err) {
        console.warn('Could not save product metadata to localStorage', err);
      }

      alert("Product registered successfully by Manufacturer!");

      // Navigate to distributor flow with productId
      navigate(`/distributor?productId=${mProductId}`);
    } catch (error) {
      console.error("Register product error:", error);
      // Try to extract a useful message
      const msg = (error && (error.reason || error.message || (error.error && error.error.message))) || "Product registration failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const panelClass = isDark ? "bg-zinc-900 border border-gray-800 text-white" : "bg-slate-100 border border-gray-300 text-black";
  const inputClass = isDark ? "w-full mb-4 bg-black border border-gray-700 text-white rounded-xl px-4 py-3" : "w-full mb-4 bg-white border border-gray-300 text-black rounded-xl px-4 py-3";
  const secondaryPanelClass = isDark ? "mt-6 bg-black border border-gray-700 rounded-2xl p-6 text-center" : "mt-6 bg-white border border-gray-300 rounded-2xl p-6 text-center";
  const helperTextClass = isDark ? "text-gray-400 mt-4 text-sm" : "text-slate-500 mt-4 text-sm";

  return (
    <section className="px-10 pb-20">
      <div className={`max-w-2xl mx-auto rounded-3xl p-8 ${panelClass}`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>🏭 Manufacturer Register Product</h3>

        <input
          type="number"
          placeholder="Product ID"
          value={mProductId}
          onChange={(e) => setMProductId(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Shoe Name"
          value={mName}
          onChange={(e) => setMName(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Brand"
          value={mBrand}
          onChange={(e) => setMBrand(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Manufacturer"
          value={mManufacturer}
          onChange={(e) => setMManufacturer(e.target.value)}
          className={inputClass}
        />

        <label className="block text-sm mb-2">Shoe Image</label>
        <select value={mImage} onChange={(e) => setMImage(e.target.value)} className={inputClass}>
          <option value="nike.pdf">nike.pdf</option>
          <option value="adidas.pdf">adidas.pdf</option>
          <option value="puma.pdf">puma.pdf</option>
          <option value="newbalance.pdf">newbalance.pdf</option>
        </select>

        <textarea
          placeholder="Short description / details (materials, color, serials...)"
          value={mDescription}
          onChange={(e) => setMDescription(e.target.value)}
          className={`${inputClass} h-28 resize-none`}
        />

        {/* Preview image */}
        <div className="my-4">
          <p className="text-sm mb-2">Preview</p>
          <object data={`/images/${mImage}`} type="application/pdf" className="w-48 h-32 object-cover rounded-lg shadow-md">
            <img src="/images/nike.svg" alt="preview" className="w-48 h-32 object-cover rounded-lg shadow-md" />
          </object>
        </div>

        <button
          onClick={registerProduct}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
        >
          {loading ? 'Registering...' : 'Register Product'}
        </button>

        {mProductId && (
          <div className={secondaryPanelClass}>
            <h4 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>Product QR Code</h4>

            <div className="bg-white p-4 inline-block rounded-xl">
              <QRCodeCanvas value={`${window.location.origin}/?productId=${mProductId}`} size={160} />
            </div>

            <p className={helperTextClass}>Scan this QR to verify Product ID {mProductId}</p>
          </div>
        )}
      </div>
    </section>
  );
}
