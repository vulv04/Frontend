import React, { useEffect, useRef } from "react";

const MapWithLocation = () => {
  return (
    <div className="mt-5">
      <h4 className="mb-3">Find us on the map</h4>
      <div className="ratio ratio-16x9">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.438625938375!2d106.70042487579893!3d10.776374389379732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1fae0c2d4d%3A0xa0f58d71b9a7ec7b!2zQ8O0bmcgdmnDqm4gS2ltIE5naMSp!5e0!3m2!1svi!2s!4v1717425555555"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MapWithLocation;
