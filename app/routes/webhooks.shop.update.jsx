import { json } from "@remix-run/node";
import shopify from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { topic, shop, body } = await shopify.webhooks.process({
      rawRequest: request,
      rawBody: await request.text(),
    });

    console.log(`Webhook received: ${topic} from ${shop}`);
    // Optional: update shop data in your database if needed

    return json({ success: true });
  } catch (error) {
    console.error("shop/update webhook failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
