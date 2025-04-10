import prisma from "../../db.server";
import { authenticate } from "../../shopify.server";

const getAnnoucementBarSettings = async (request) => {
  const { admin, session } = await authenticate.admin(request);

  try {
    const data = await prisma.annoucementBarSettings.findFirst();
    return JSON.parse(data.settings);
  } catch (err) {
    return err;
  }
};

export default getAnnoucementBarSettings;
