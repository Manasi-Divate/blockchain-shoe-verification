import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../blockchain/contract";

export default function Retailer({ theme }) {
  const isDark = theme === "dark";
  const [rProductId, setRProductId] = useState("");
  const [retailer, setRetailer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    if (id) setRProductId(id);
  }, []);

  const updateRetailer = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.updateRetailer(Number(rProductId), retailer);
      await tx.wait();

      alert("Retailer updated successfully!");

      // Move to consumer verification
      navigate(`/consumer?productId=${rProductId}`);
    } catch (error) {
      console.error(error);
      alert("Retailer update failed");
    }
  };

  const panelClass = isDark ? "bg-zinc-900 border border-gray-800 text-white" : "bg-slate-100 border border-gray-300 text-black";
  const inputClass = isDark ? "w-full mb-4 bg-black border border-gray-700 text-white rounded-xl px-4 py-3" : "w-full mb-4 bg-white border border-gray-300 text-black rounded-xl px-4 py-3";
  const buttonClass = isDark ? "w-full bg-white text-black py-3 rounded-xl font-bold" : "w-full bg-black text-white py-3 rounded-xl font-bold";

  return (
    <section className={`px-10 pb-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className={`max-w-2xl mx-auto rounded-3xl p-8 ${panelClass}`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>🏬 Retailer Update</h3>

        <input
          type="number"
          placeholder="Product ID"
          value={rProductId}
          onChange={(e) => setRProductId(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Retailer Name"
          value={retailer}
          onChange={(e) => setRetailer(e.target.value)}
          className={inputClass}
        />

        <button onClick={updateRetailer} className={buttonClass}>Update Retailer</button>
      </div>
    </section>
  );
}
