import { json } from "@remix-run/node";
import shopify from "../shopify.server";

export const action = async ({ request }) => {
  try {
    await shopify.webhooks.process({
      rawRequest: request,
      rawBody: await request.text(),
    });

    console.log("Customer data erasure request received.");
    return json({ success: true });
  } catch (error) {
    console.error("Error handling customers/redact:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
