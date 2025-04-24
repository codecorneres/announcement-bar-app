import prisma from "../../db.server";
import { authenticate } from "../../shopify.server";
import { setAnnouncementMetafields } from "./setAnnouncementMetafields";

const saveBundle = async (request, form) => {
  const { session } = await authenticate.admin(request);
  const settings = JSON.parse(form);

  try {
    const data = await prisma.annoucementBarSettings.upsert({
      where: { shop: session.shop },
      update: { settings: form },
      create: { shop: session.shop, settings: form },
    });

    await setAnnouncementMetafields(session, settings);

    return data;
  } catch (err) {
    return err;
  }
};

export default saveBundle;
