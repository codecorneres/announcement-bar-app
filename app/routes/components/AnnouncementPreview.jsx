import React from "react";

const AnnouncementPreview = ({
  message,
  bg_color,
  text_color,
  width,
  font_size,
  font_weight,
  border_width,
  border_color,
  border_radius,
  padding,
  text_align,
}) => {
  return (
    <div
      style={{
        background: bg_color,
        color: text_color,
        width,
        fontSize: font_size,
        fontWeight: font_weight,
        border: `${border_width} solid ${border_color}`,
        borderRadius: border_radius,
        padding,
        textAlign: text_align,
        margin: "0 auto",
      }}
    >
      {message}
    </div>
  );
};

export default AnnouncementPreview;
