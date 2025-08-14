import axios from 'axios';

const colorUrl = process.env.EXPO_PUBLIC_API_URL
const ENDPOINT = `${colorUrl}/score`;

export async function fetchScore(params: { imageBase64: string; themeHex: string }) {
  const res = await axios.post(
    ENDPOINT,
    { image_base64: params.imageBase64, theme_hex: params.themeHex },
    { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
  );
  return {
    score: Number(res.data?.score ?? 0),
    avgColorHex: String(res.data?.avg_color_hex ?? ''),
    method: String(res.data?.method ?? ''),
  };
}
