import React from "react";

// Dữ liệu mẫu với ảnh bạn gửi
const featuredProducts = [
  {
    id: 1,
    image:
      "https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/image_set_1.png?1758009215338",
    alt: "Image set 1",
  },
  {
    id: 2,
    image:
      "https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/image_set_2.png?1758009215338",
    alt: "Image set 2",
  },
  {
    id: 3,
    image:
      "https://bizweb.dktcdn.net/100/491/897/themes/915864/assets/image_set_3.png?1758009215338",
    alt: "Image set 3",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="container my-5">
      <h2 className="mb-4 fw-bold">Sản phẩm nổi bật</h2>
      <div className="row g-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative">
              <img
                src={product.image}
                alt={product.alt}
                className="img-fluid w-100"
                style={{ objectFit: "cover", height: "320px" }}
              />

              {/* Overlay text nếu bạn muốn */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: "white",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span className="fs-4">Xem ngay</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
