import saveBundle from "../server/save";

const actions = async (request) => {
  const formData = await request?.formData();
  const type = formData?.get("type");
  const form = formData?.get("form");

  switch (type) {
    case "save": {
      const data = await saveBundle(request, form);
      return JSON.parse(data.settings);
    }

    default:
      return null;
  }
};

export default actions;
