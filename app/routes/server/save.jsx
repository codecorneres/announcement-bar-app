import prisma from "../../db.server";
import { authenticate } from "../../shopify.server";

const saveBundle = async (request, form) => {
  const { session } = await authenticate.admin(request);

  try {
    const data = await prisma.annoucementBarSettings.upsert({
      where: { shop: session.shop },
      update: { settings: form },
      create: { shop: session.shop, settings: form },
    });

    return data;
  } catch (err) {
    return err;
  }
};

export default saveBundle;
