import { json } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const data = await prisma?.annoucementBarSettings?.findFirst();

  if (!data || !data?.settings) {
    return json({});
  }

  return json(JSON.parse(data?.settings));
};
