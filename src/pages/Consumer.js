import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getContract } from "../blockchain/contract";
import { fetchJsonFromIpfs } from "../blockchain/ipfs";

export default function Consumer({ theme }) {
  const isDark = theme === "dark";
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    if (id) {
      setProductId(id);
    }
  }, []);

  const resolveImagePath = (src) => {
    if (!src) return null;
    // if it's already an absolute url or a PDF path, return as-is
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
      // if jpg/png extension, prefer pdf sibling
      if (/\.(jpe?g|png)$/i.test(src)) {
        return src.replace(/\.(jpe?g|png)$/i, '.pdf');
      }
      return src;
    }
    // src is a filename like 'nike.jpg' or 'nike.pdf' — normalize to /images/* and prefer .pdf
    if (/\.(jpe?g|png)$/i.test(src)) {
      return `/images/${src.replace(/\.(jpe?g|png)$/i, '.pdf')}`;
    }
    return `/images/${src}`;
  };

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
          image = resolveImagePath(ipfsMeta.image);
          description = ipfsMeta.description;
        } catch (err) {
          console.warn("IPFS metadata fetch failed", err);
        }
      }

      if (!image) {
        try {
          image = resolveImagePath(localStorage.getItem(`product:${productId}:image`));
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
        image: image || '/images/nike.pdf',
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
  const qrValue = productData
    ? JSON.stringify({
        id: productData.id,
        name: productData.name,
        brand: productData.brand,
        manufacturer: productData.manufacturer,
        distributor: productData.distributor,
        retailer: productData.retailer,
        status: productData.status,
        verified: productData.verified,
        description: productData.description,
        image: productData.image,
        verifyLink: `${window.location.origin}/consumer?productId=${productData.id}`
      })
    : "";

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
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className={`text-3xl font-bold ${isDark ? "text-white" : "text-black"}`}>{productData.name || "Unknown Product"}</h3>
                <p className={`${cardTextClass} mt-2`}>Product ID: {productData.id}</p>
              </div>

              <div className={`inline-flex items-center rounded-full px-4 py-3 text-sm font-semibold ${productData.verified ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20" : "bg-red-500/10 text-red-300 border border-red-500/20"}`}>
                {productData.verified ? "✓ Authentic" : "✗ Fake"}
              </div>
            </div>

            <div className="space-y-6 mt-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
                <div className="rounded-3xl overflow-hidden border border-gray-700">
                  <object data={productData.image || '/images/nike.pdf'} type="application/pdf" className="w-full h-64 object-cover">
                    <img src="/images/nike.svg" alt={productData.name} className="w-full h-64 object-cover" />
                  </object>
                </div>

                <div className={`rounded-3xl p-6 ${isDark ? 'bg-zinc-950/80 border border-gray-700' : 'bg-slate-50 border border-gray-200'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'} uppercase tracking-[0.2em] mb-4 text-center`}>Scan to Verify</p>
                  <div className="flex justify-center">
                    {qrValue ? (
                      <QRCodeSVG value={qrValue} size={180} bgColor={isDark ? "#000000" : "#ffffff"} fgColor={isDark ? "#ffffff" : "#000000"} />
                    ) : (
                      <div className={`h-44 w-44 rounded-2xl ${isDark ? 'bg-zinc-900' : 'bg-slate-100'} flex items-center justify-center text-sm text-gray-500`}>
                        QR code will appear here
                      </div>
                    )}
                  </div>
                  <p className={`mt-4 text-center text-sm ${cardTextClass}`}>Scan this QR code to verify the product details instantly.</p>
                </div>
              </div>

              {productData.description && <p className={`text-sm leading-7 ${cardTextClass}`}>{productData.description}</p>}

              <div className="grid gap-6 sm:grid-cols-2">
                <InfoCard title="Brand" value={productData.brand} theme={theme} />
                <InfoCard title="Manufacturer" value={productData.manufacturer} theme={theme} />
                <InfoCard title="Distributor" value={productData.distributor || "Not updated yet"} theme={theme} />
                <InfoCard title="Retailer" value={productData.retailer || "Not updated yet"} theme={theme} />
                <InfoCard title="Current Status" value={productData.status || "Not registered"} theme={theme} />
                <InfoCard title="Blockchain Status" value={productData.verified ? "Verified" : "Fake"} theme={theme} />
              </div>
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
