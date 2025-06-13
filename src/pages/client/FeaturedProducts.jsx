import React from "react";

// Dữ liệu mẫu
const featuredProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    alt: "Couple on the beach",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    alt: "Girl with cloth",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    alt: "Man in brown jacket",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="container my-5">
      <h2 className="mb-4 fw-bold">Set sản phẩm nổi bật</h2>
      <div className="row g-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4">
            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.alt}
                className="img-fluid w-100"
                style={{ objectFit: "cover", height: "320px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
