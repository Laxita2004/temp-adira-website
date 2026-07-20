"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const TermsPolicyPage = () => {
  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="max-w-4xl mt-20 mx-auto px-4 py-10 text-gray-800">
          <h1 className="text-3xl font-bold mb-8">Returns, Shipping & Policies</h1>

          {/* Returns & Exchanges */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Returns & Exchanges</h2>
            <p className="mb-4">
              We hope you love your RATNAWAD saree, but if for any reason you’re not satisfied, please review our policies below.
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Only <strong>prepaid orders</strong> are accepted.</li>
              <li><strong>No Cash on Delivery</strong> available at this time.</li>
              <li><strong>Shipping charges</strong> are applicable and added at checkout.</li>
              <li>We do <strong>not accept returns</strong> on items received in a damaged or used condition.</li>
              <li>All return requests must be raised <strong>within 24 hours of delivery</strong> with unboxing video proof.</li>
              <li>
                In the rare event that your order is <strong>lost by the delivery partner</strong>, you will be fully refunded or sent a replacement, if available.
              </li>
              <li>
                If the delivery attempt fails due to <strong>your unavailability</strong>, any additional re-delivery cost will have to be borne by the customer.
              </li>
              <li>
                <strong>No returns or exchanges</strong> will be accepted for minor color differences, as colors may appear slightly different due to lighting or screen settings.
              </li>
              <li>
                Orders once placed <strong>cannot be cancelled or modified</strong> after processing begins.
              </li>
              <li>
                Any misuse or copying of our designs, images, or text will result in legal action.
              </li>
            </ul>
            <p className="mt-4">
              We’re a small business and each saree is packed with love. We truly appreciate your understanding of these policies. 🤍
            </p>
          </section>

          {/* Shipping Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
            <p>
              We strive to deliver elegance at your doorstep—swiftly and safely.
            </p>
            <ul className="list-disc ml-5 mt-4 space-y-2">
              <li><strong>Processing Time:</strong> 3–4 business days</li>
              <li><strong>Delivery Time:</strong> Metro Cities: 4–6 working days, Other Areas: 6–10 working days</li>
              <li><strong>Shipping Charges:</strong> Applied at checkout based on your location</li>
              <li><strong>Tracking:</strong> Sent via whatsapp once your order is dispatched</li>
            </ul>
          </section>

          {/* Terms of Service */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>All product images are for representation. Color may vary slightly due to lighting and screen settings.</li>
              <li>Prices and availability are subject to change without notice.</li>
              <li>Misuse or duplication of RATNAWAD’s designs, photographs, or content is strictly prohibited.</li>
              <li>We reserve the right to cancel any order that appears fraudulent or violates our terms.</li>
            </ul>
          </section>

          {/* Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>What we collect:</strong> Your name, email, address, phone number, and secured payment details.</li>
              <li><strong>How we use it:</strong> To process orders, improve services, and send relevant updates.</li>
              <li>We <strong>do not sell or share</strong> your data except with trusted logistics and payment partners.</li>
              <li>You may contact us anytime to update or request deletion of your personal data.</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TermsPolicyPage;
