import type { APIRoute } from "astro";

/**
 * Optional: REST-Proxy für CleverReach (wenn du NICHT den Einbettungs-Snippet nutzt).
 * ⚠️ Für rechtssicheren DOI-Nachweis empfiehlt CleverReach die Nutzung der Formularfunktion.
 *    Die API-Route hier ist ein Gerüst; du brauchst Client-ID, Secret & Access Token (OAuth v3).
 */
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const email = (form.get("email") || "").toString().trim();
  if (!email) return new Response(JSON.stringify({ error: "email_required" }), { status: 400 });

  // TODO: Hole access_token via OAuth (Server-seitig speichern/refreshen).
  const ACCESS_TOKEN = process.env.CLEVERREACH_ACCESS_TOKEN; // nur Beispiel

  // Beispiel: Empfänger in Gruppe eintragen (kein DOI-Versand!)
  // Für DOI nutze stattdessen CleverReach-Formulare (Einbettung).
  const GROUP_ID = process.env.CLEVERREACH_GROUP_ID;

  const res = await fetch(`https://rest.cleverreach.com/v3/groups/${GROUP_ID}/receivers`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      activated: false,
      source: "website",
    }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: await res.text() }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true }));
};
