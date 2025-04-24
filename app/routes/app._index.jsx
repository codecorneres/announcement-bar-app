import {
  Page,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  Link,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <Page fullWidth>
      <div style={{ marginBottom: "20px" }}>
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingLg">
              📢 Announcement Bar – Overview
            </Text>
            <Text variant="bodyMd" as="p">
              This app allows you to create customizable announcement bars that
              can be managed either dynamically through metafields or manually
              via the Shopify Theme Editor.
            </Text>
            <Text variant="bodyMd" as="p">
              <strong>By default</strong>, the announcement bar uses values from
              your store’s metafields to control its message, styling
              (background and text colors, font size, etc.), and visibility.
              This approach is perfect if you want the bar to automatically
              reflect data set elsewhere in your system.
            </Text>
            <Text variant="bodyMd" as="p">
              If you want more control, simply check the{" "}
              <strong>"Customize this announcement bar"</strong> option in the
              Theme Editor. This overrides the metafield settings and allows you
              to manually set the:
            </Text>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Message</li>
              <li>Text color and background color</li>
              <li>Font size and weight</li>
              <li>Width, padding, and alignment</li>
              <li>Border width, color, and radius</li>
            </ul>
            <Text variant="bodyMd" as="p">
              You can easily toggle between default (metafield-based) and manual
              (theme editor) control anytime. Unchecking the "Customize this
              announcement bar" box will revert it back to follow your store’s
              metafield values.
            </Text>

            <Text as="h3" variant="headingMd">
              🎥 How to Use
            </Text>
            <Box
              padding="200"
              background="bg-surface-subdued"
              borderRadius="200"
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src="/video/barvideo.mp4"
                  title="How to use Announcement Bar"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            </Box>
          </BlockStack>
        </Card>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingLg">
              🖼️ Announcement Bar Previews
            </Text>
            <Text variant="bodyMd" as="p">
              Below are some screenshots showing how your custom announcement
              bar looks on different parts of your Shopify store. You can
              preview both desktop and mobile views.
            </Text>
            <BlockStack gap="400">
              {[
                { src: "/images/defaultbar.png", alt: "Default bar" },
                { src: "/images/barsimple.png", alt: "Simple bar" },
                { src: "/images/circulorbar.png", alt: "Circular bar" },
                { src: "/images/circlebar.png", alt: "Circle bar" },
                { src: "/images/boxbar.png", alt: "Box bar" },
              ].map((img, index) => (
                <Box
                  key={index}
                  padding="100"
                  background="bg-surface"
                  borderRadius="100"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      maxWidth: "1000px",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              ))}
            </BlockStack>
            <Text variant="bodyMd" as="p">
              These bars are fully customizable with text, background color,
              font style, and even dynamic content using metafields.
            </Text>
          </BlockStack>
        </Card>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingLg">
              ⚙️ Customize Your Announcement Bar
            </Text>
            <Text variant="bodyMd" as="p">
              Want to update your bar's message, style, or dynamic content? You
              can configure everything like background color, font, alignment,
              and metafield bindings on the settings page.
            </Text>
            <Text variant="bodyMd" as="p">
              Click the button below to access the settings:
            </Text>

            <Box padding="200">
              <Link url="/app/settings" removeUnderline>
                <Button variant="primary">Go to Settings</Button>
              </Link>
            </Box>
          </BlockStack>
        </Card>
      </div>
    </Page>
  );
}
