import React from "react";

const AnnouncementPreview = ({
  showAnnouncement,
  message,
  bgColor,
  textColor,
  width,
  fontSize,
  fontWeight,
  borderWidth,
  borderColor,
  borderRadius,
  padding,
  textAlign,
}) => {
  if (!showAnnouncement) return null;

  return (
    <div
      style={{
        background: bgColor,
        color: textColor,
        width,
        fontSize,
        fontWeight,
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius,
        padding,
        textAlign,
        margin: "0 auto",
      }}
    >
      {message}
    </div>
  );
};

export default AnnouncementPreview;
