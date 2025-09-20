// netlify/functions/save-post.js
export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const post = JSON.parse(event.body || "{}");
  // TODO: Validate & store in your DB (e.g., MongoDB Atlas / Deta / Fauna / Supabase)
  return { statusCode: 200, body: JSON.stringify({ ok: true, id: Date.now() }) };
};
