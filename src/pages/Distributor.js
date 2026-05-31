import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../blockchain/contract";

export default function Distributor({ theme }) {
  const isDark = theme === "dark";
  const [dProductId, setDProductId] = useState("");
  const [distributor, setDistributor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    if (id) setDProductId(id);
  }, []);

  const updateDistributor = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.updateDistributor(Number(dProductId), distributor);
      await tx.wait();

      alert("Distributor updated successfully!");

      // Move to retailer flow
      navigate(`/retailer?productId=${dProductId}`);
    } catch (error) {
      console.error(error);
      alert("Distributor update failed");
    }
  };

  const panelClass = isDark ? "bg-zinc-900 border border-gray-800 text-white" : "bg-slate-100 border border-gray-300 text-black";
  const inputClass = isDark ? "w-full mb-4 bg-black border border-gray-700 text-white rounded-xl px-4 py-3" : "w-full mb-4 bg-white border border-gray-300 text-black rounded-xl px-4 py-3";
  const buttonClass = isDark ? "w-full bg-white text-black py-3 rounded-xl font-bold" : "w-full bg-black text-white py-3 rounded-xl font-bold";

  return (
    <section className={`px-10 pb-20 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className={`max-w-2xl mx-auto rounded-3xl p-8 ${panelClass}`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>🚚 Distributor Update</h3>

        <input
          type="number"
          placeholder="Product ID"
          value={dProductId}
          onChange={(e) => setDProductId(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Distributor Name"
          value={distributor}
          onChange={(e) => setDistributor(e.target.value)}
          className={inputClass}
        />

        <button onClick={updateDistributor} className={buttonClass}>Update Distributor</button>
      </div>
    </section>
  );
}
