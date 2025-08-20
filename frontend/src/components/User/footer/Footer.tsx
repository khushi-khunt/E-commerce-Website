import ProductTags from "@/pages/dashboard/user/products/ProductTags";
import { FooterApp } from "./FooterApp";
import { Newsletter } from "./NewsLetter";
import { SocialIcons } from "./SocialIcons";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-200">
      <Newsletter />
      {/* product tags */}
      <ProductTags />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-10 text-sm">
        {/* Logo + Contact */}
        <div>
          <h2
            className="text-2xl font-bold mb-4 text-[rgb(174,204,197)]"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Ecommerce
          </h2>
          <p className="text-gray-600 font-semibold mb-2">Contact</p>
          <p className="text-gray-500 text-sm">
            <strong className="text-gray-700">Address:</strong> 562 Wellington Road, Street 32, San Francisco
          </p>
          <p className="text-gray-500 text-sm mt-1">
            <strong className="text-gray-700">Phone:</strong> +01 2222 365 / (+91) 01 2345 6789
          </p>
          <p className="text-gray-500 text-sm mt-1">
            <strong className="text-gray-700">Hours:</strong> 10:00 - 18:00, Mon - Sat
          </p>
          <div className="mt-4">
            <SocialIcons />
          </div>
        </div>

        {/* Help Links */}
        <div className="cursor-pointer">
          <h3 className="font-semibold mb-3 text-lg text-gray-800">Help</h3>
          <ul className="space-y-2 text-gray-600">
            {["Payments", "Shipping", "Cancellation & Returns", "FAQ", "Help", "Order"].map((item) => (
              <li
                key={item}
                className="hover:text-[rgb(63,107,97)] transition duration-200 hover:translate-x-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Consumer Policy Links */}
        <div className="cursor-pointer">
          <h3 className="font-semibold mb-3 text-lg text-gray-800">Consumer Policy</h3>
          <ul className="space-y-2 text-gray-600">
            {[
              "Cancellation and Returns",
              "Terms of Use",
              "Privacy",
              "Security",
              "Sitemap",
              "ERP Compliance",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-[rgb(142,166,161)] transition duration-200 hover:translate-x-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Install App Section */}
        <FooterApp />
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-muted-foreground text-sm border-t border-gray-200 px-4">
        © 2025, <span className="font-medium text-foreground">Ecommerce</span> — HTML eCommerce Template. Designed by{" "}
        <a className="underline" href="https://alithemes.com" target="_blank" rel="noopener noreferrer">
          Alithemes
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
