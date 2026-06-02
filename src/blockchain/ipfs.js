const WEB3_STORAGE_ENDPOINT = "https://api.web3.storage/upload";
const PUBLIC_GATEWAY = "https://ipfs.io/ipfs";

export const addJsonToIpfs = async (data) => {
  const token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
  if (!token) {
    return null;
  }

  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: "application/json" });
  const formData = new FormData();
  formData.append("file", blob, "metadata.json");

  const response = await fetch(WEB3_STORAGE_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`IPFS upload failed: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return result.cid;
};

export const fetchJsonFromIpfs = async (cid) => {
  const response = await fetch(`${PUBLIC_GATEWAY}/${cid}`);
  if (!response.ok) {
    throw new Error(`IPFS fetch failed: ${response.status}`);
  }
  return response.json();
};
