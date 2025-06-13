import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import translations from "../../i18n/lang";
import { useLanguage } from "../../contexts/LanguageContext";

const CategoryPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        const products = response.data.products || response.data;
        const uniqueCategories = Array.from(
          new Set(products.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle"
        role="button"
        id="categoriesDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer" }}
      >
        {t.categories}
      </span>
      <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
        {loading && <li className="dropdown-item">{t.loading}</li>}
        {error && (
          <li className="dropdown-item text-danger">{t.errorLoading}</li>
        )}
        {!loading && !error && categories.length === 0 && (
          <li className="dropdown-item">{t.noCategories}</li>
        )}
        {!loading &&
          !error &&
          categories.map((cat) => (
            <li key={cat}>
              <NavLink
                to={`/categories/${encodeURIComponent(cat)}`}
                className="dropdown-item"
              >
                {cat}
              </NavLink>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default CategoryPage;
