export const setAnnouncementMetafields = async (session, settings) => {
  // GraphQL query to get the Shop ID (ownerId)
  const getShopIdQuery = `
    {
      shop {
        id
      }
    }
  `;

  // Fetch the shop ID dynamically
  const shopIdResponse = await fetch(
    `https://${session.shop}/admin/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: getShopIdQuery }),
    },
  );

  const shopIdJson = await shopIdResponse.json();
  const shopId = shopIdJson?.data?.shop?.id;

  if (!shopId) {
    throw new Error("Failed to fetch shop ID");
  }

  // Metafields mutation
  const metafieldsSetQuery = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          namespace
          key
          value
          type
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const metafields = Object.entries(settings).map(([key, value]) => ({
    namespace: "announcement_bar",
    key,
    value: value.toString(),
    type: "single_line_text_field",
    ownerId: shopId,
  }));

  // Make the metafieldsSet mutation call
  const response = await fetch(
    `https://${session.shop}/admin/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: metafieldsSetQuery,
        variables: { metafields },
      }),
    },
  );

  const json = await response.json();
  console.log("Metafields response:", JSON.stringify(json, null, 2));

  if (json?.data?.metafieldsSet?.userErrors?.length > 0) {
    console.error("Metafield save errors:", json.data.metafieldsSet.userErrors);
  } else {
    console.log(
      "Metafields saved successfully:",
      json.data.metafieldsSet.metafields,
    );
  }

  return json?.data?.metafieldsSet;
};
