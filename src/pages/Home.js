import { Link } from "react-router-dom";

export default function Home({ theme }) {
  const isDark = theme === "dark";
  const titleColor = isDark ? "text-gray-400" : "text-slate-500";
  const panelClass = isDark ? "bg-zinc-950" : "bg-slate-100";
  const buttonPrimary = isDark ? "bg-white text-black" : "bg-black text-white";
  const buttonSecondary = isDark ? "border border-gray-700 text-gray-300" : "border border-gray-300 text-slate-700";

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className={`${titleColor} uppercase tracking-[0.3em] mb-4`}>
          Blockchain Shoe Authentication
        </p>

        <h1 className={`text-5xl sm:text-6xl font-extrabold ${isDark ? "text-white" : "text-black"}`}>
          Complete Supply Chain Verification
        </h1>

        <p className={`${titleColor} mt-6 text-lg sm:text-xl leading-8 max-w-3xl mx-auto`}>
          Manufacturer registers the product, distributor updates shipment,
          retailer confirms availability, and consumer verifies authenticity.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/manufacturer" className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold ${buttonPrimary} transition hover:opacity-90`}>
            Start
          </Link>
          <Link to="/consumer" className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold ${buttonSecondary} transition hover:opacity-90`}>
            Verify Product
          </Link>
        </div>
      </div>

      <section className="mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className={`${titleColor} uppercase tracking-[0.3em] mb-3 text-sm`}>Featured sneaker collections</p>
            <h2 className={`text-3xl sm:text-4xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
              Trusted brands, authentic supply chain flow
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <article className={`overflow-hidden rounded-3xl border ${isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white shadow-sm"}`}>
              <object data="/images/nike.pdf" type="application/pdf" className="h-56 w-full object-cover">
                <img src="/images/nike.svg" alt="Premium Nike style sneaker" loading="lazy" className="h-56 w-full object-cover" />
              </object>
              <div className="p-5 text-left">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-400">Nike</p>
                <h3 className={`mt-3 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                  Air Performance
                </h3>
                <p className={`${titleColor} mt-2 text-sm`}>
                  Inspired by authentic brand craftsmanship for a premium product flow.
                </p>
              </div>
            </article>

            <article className={`overflow-hidden rounded-3xl border ${isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white shadow-sm"}`}>
              <object data="/images/adidas.pdf" type="application/pdf" className="h-56 w-full object-cover">
                <img src="/images/adidas.svg" alt="Adidas inspired sneaker display" loading="lazy" className="h-56 w-full object-cover" />
              </object>
              <div className="p-5 text-left">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Adidas</p>
                <h3 className={`mt-3 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                  Boost Collection
                </h3>
                <p className={`${titleColor} mt-2 text-sm`}>
                  Visuals that match a modern retail distribution experience.
                </p>
              </div>
            </article>

            <article className={`overflow-hidden rounded-3xl border ${isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white shadow-sm"}`}>
              <object data="/images/puma.pdf" type="application/pdf" className="h-56 w-full object-cover">
                <img src="/images/puma.svg" alt="Puma style athletic shoe" loading="lazy" className="h-56 w-full object-cover" />
              </object>
              <div className="p-5 text-left">
                <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-400">Puma</p>
                <h3 className={`mt-3 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                  RS-X Impact
                </h3>
                <p className={`${titleColor} mt-2 text-sm`}>
                  A sleek retail display that supports authenticity verification.
                </p>
              </div>
            </article>

            <article className={`overflow-hidden rounded-3xl border ${isDark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white shadow-sm"}`}>
              <object data="/images/newbalance.pdf" type="application/pdf" className="h-56 w-full object-cover">
                <img src="/images/newbalance.svg" alt="New Balance inspired lifestyle sneaker" loading="lazy" className="h-56 w-full object-cover" />
              </object>
              <div className="p-5 text-left">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-400">New Balance</p>
                <h3 className={`mt-3 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>
                  990 Heritage
                </h3>
                <p className={`${titleColor} mt-2 text-sm`}>
                  Clean visuals for a trustworthy consumer verification journey.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
