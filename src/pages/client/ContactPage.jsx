import React from "react";
import Breadcrumb from "../../components/carts/Breadcrumb";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="container my-5">
      <div className="mb-3">
        <Breadcrumb items={[{ label: "Liên hệ", link: "/contact" }]} />
      </div>
      <h1 className="mb-4 text-center">Liên Hệ Với Chúng Tôi</h1>
      <p className="lead text-center mb-5">
        Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi!
      </p>

      <div className="row">
        {/* Thông tin liên hệ */}
        <div className="col-md-5 mb-4">
          <h4>Văn Phòng</h4>
          <p>
            <FaMapMarkerAlt className="me-2 text-primary" />
            Số 4 Tân Mỹ, Mỹ Đình 2, Nam Từ Liêm, Hà Nội, Việt Nam
          </p>
          <p>
            <FaPhoneAlt className="me-2 text-primary" />
            <a href="tel:+84369800123">+84 369800123</a>
          </p>
          <p>
            <FaEnvelope className="me-2 text-primary" />
            <a href="mailto:support@vukibo.com">support@vukibo.com</a>
          </p>
          <p>
            <FaClock className="me-2 text-primary" />
            Giờ làm việc: Thứ 2 - Thứ 6, 9:00 - 18:00
          </p>

          <h5 className="mt-4">Theo dõi chúng tôi</h5>
          <div className="d-flex gap-3">
            <a href="#" target="_blank" rel="noreferrer">
              <FaFacebookF /> Facebook
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaTwitter /> Twitter
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="col-md-7">
          <h4>Gửi tin nhắn cho chúng tôi</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                placeholder="Email@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Nội dung tin nhắn
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                required
                placeholder="Nhập nội dung bạn muốn gửi..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary px-4">
              Gửi
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps */}
      <div className="mt-5">
        <h4 className="mb-3">Tìm chúng tôi trên bản đồ</h4>
        <div className="ratio ratio-16x9">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d465.53332653362435!2d105.760269!3d21.0220156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454a22050400b%3A0x4a7f303239442008!2zMyBOZ8O1IDQgVMOibiBN4bu5LCBN4bu5IMSQw6xuaCwgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1749544202893!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
