import React, { useState, useEffect } from "react";
import {
  Card,
  Layout,
  Page,
  TextField,
  Select,
  InlineStack,
  Box,
} from "@shopify/polaris";
import AnnouncementPreview from "./components/AnnouncementPreview";
import actions from "./action/actions";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import getAnnoucementBarSettings from "./server/getAnnoucementBarSettings";

export const loader = async ({ request }) => {
  const data = await getAnnoucementBarSettings(request);

  return { data };
};

export const action = async ({ request }) => {
  const data = await actions(request);

  return data;
};

export default function AdditionalPage() {
  const { data } = useLoaderData();

  const initialSettings = {
    message: "Free Shipping on Orders Over $50!",
    bg_color: "#000000",
    text_color: "#ffffff",
    width: "100%",
    font_size: "18px",
    font_weight: "normal",
    border_width: "0px",
    border_color: "#cccccc",
    border_radius: "5px",
    padding: "10px",
    text_align: "center",
  };

  const [settings, setSettings] = useState(
    data && Object.keys(data).length > 0 ? data : initialSettings,
  );

  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  const handleSave = () => {
    setLoading(true);
    fetcher.submit(
      { type: "save", form: JSON.stringify(settings) },
      { method: "POST" },
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setSettings(fetcher.data);
      setLoading(false);
      shopify.toast.show("Saved");
    }
  }, [fetcher.state]);

  const handleChange = (key) => (value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const fontWeightOptions = [
    { label: "Normal", value: "normal" },
    { label: "Bold", value: "bold" },
    { label: "Light", value: "300" },
    { label: "Medium", value: "500" },
    { label: "Semi Bold", value: "600" },
    { label: "Extra Bold", value: "800" },
  ];

  const textAlignOptions = [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ];

  const renderColorInput = (label, key) => (
    <Box>
      <label style={{ fontWeight: 500, display: "block", marginBottom: "4px" }}>
        {label}
      </label>
      <InlineStack align="start" blockAlign="center" gap="200">
        <input
          type="color"
          value={settings[key]}
          onChange={(e) => handleChange(key)(e.target.value)}
          style={{
            width: "50px",
            height: "40px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        />
        <TextField
          labelHidden
          value={settings[key]}
          onChange={handleChange(key)}
          autoComplete="off"
        />
      </InlineStack>
    </Box>
  );

  return (
    <Page
      title="Settings"
      fullWidth
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        loading: loading,
      }}
    >
      <Layout>
        <Layout.Section variant="oneHalf">
          <Card title="Design Settings" sectioned>
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
              }}
            >
              <TextField
                label="Message"
                value={settings.message}
                onChange={handleChange("message")}
              />
              <TextField
                label="Font Size"
                value={settings.font_size}
                onChange={handleChange("font_size")}
              />

              <Select
                label="Font Weight"
                options={fontWeightOptions}
                value={settings.font_weight}
                onChange={handleChange("font_weight")}
              />
              <Select
                label="Text Align"
                options={textAlignOptions}
                value={settings.text_align}
                onChange={handleChange("text_align")}
              />

              <TextField
                label="Width"
                value={settings.width}
                onChange={handleChange("width")}
              />
              <TextField
                label="Padding"
                value={settings.padding}
                onChange={handleChange("padding")}
              />

              <TextField
                label="Border Radius"
                value={settings.border_radius}
                onChange={handleChange("border_radius")}
              />
              <TextField
                label="Border Width"
                value={settings.border_width}
                onChange={handleChange("border_width")}
              />

              {renderColorInput("Border Color", "border_color")}
              {renderColorInput("Background Color", "bg_color")}
              {renderColorInput("Text Color", "text_color")}
            </Box>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <Card title="Live Preview" sectioned>
            <Box padding="4" border="base" background="bg-surface">
              <AnnouncementPreview {...settings} />
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
