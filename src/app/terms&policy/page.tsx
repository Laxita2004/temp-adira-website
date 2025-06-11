"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const TermsPolicyPage = () => {
  return (
    <>
      <Header />
      <div className=" bg-light">
        <div className="max-w-4xl mt-20 mx-auto px-4 py-10 text-gray-800">
          <h1 className="text-3xl font-bold mb-8">
            Returns, Shipping & Policies
          </h1>

          {/* Returns & Exchanges */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Returns & Exchanges</h2>
            <p>
              We hope you love your Adira saree, but if for any reason you’re
              not satisfied, we’re here to help.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-2">
              <li>
                <strong>Return & Exchange Window:</strong> Within{" "}
                <strong>7 days of delivery</strong> for unused, unwashed, and
                undamaged items with original tags and packaging.
              </li>
              <li>
                <strong>Non-returnable items:</strong> Custom-stitched sarees,
                final sale or discounted items, poshaks and bridal wear.
              </li>
            </ul>
            <p className="mt-4">
              To request a return/exchange, email us at{" "}
              <a
                href="mailto:support@adiraethnic.com"
                className="text-blue-600 underline"
              >
                support@adiraethnic.com
              </a>{" "}
              with your order ID and reason. Our team will respond within 24–48
              hours.
            </p>
            <p className="mt-2">
              Reverse pickup is available in select pin codes. Otherwise,
              customers are requested to ship the item to our return address.
            </p>
          </section>

          {/* Shipping Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
            <p>
              We strive to deliver elegance at your doorstep—swiftly and safely.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-2">
              <li>
                <strong>Processing Time:</strong> 2–4 business days
              </li>
              <li>
                <strong>Delivery Time:</strong> Metro Cities: 4–6 working days,
                Other Areas: 6–10 working days
              </li>
              <li>
                <strong>Shipping Charges:</strong> Prepaid orders: Free, COD:
                ₹75 extra, International: Varies at checkout
              </li>
              <li>
                <strong>Tracking:</strong> Sent via email/SMS once your order is
                dispatched
              </li>
            </ul>
          </section>

          {/* Terms of Service */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                All product images are for representation. Color may vary
                slightly due to lighting and screen settings.
              </li>
              <li>
                Prices and availability are subject to change without notice.
              </li>
              <li>
                Misuse or duplication of Adira’s designs or content is
                prohibited.
              </li>
              <li>
                We reserve the right to cancel orders that appear fraudulent or
                violate our terms.
              </li>
            </ul>
          </section>

          {/* Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>What we collect:</strong> Your name, email, address,
                phone number, and payment details (secured).
              </li>
              <li>
                <strong>How we use it:</strong> To process orders, improve
                services, and communicate updates.
              </li>
              <li>
                We <strong>do not sell or share</strong> your data except with
                trusted logistics/payment partners.
              </li>
              <li>
                You can contact us to update or delete your data at any time.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsPolicyPage;
