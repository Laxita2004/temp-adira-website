"use client";

import Header from "../../components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="bg-light min-h-screen flex flex-col">
        <div className="min-h-screen bg-light text-primary flex items-center justify-center px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full px-6">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6 text-sm md:text-base">
                Whether you're curious about a saree, need help with your order,
                or simply want to share your story draped in Adira — we’re
                always here for you. Drop us a message, and our team will get
                back to you with the same care and grace that goes into every
                thread we weave. 
                
                📩 Let’s stay connected. Because every
                conversation at Adira begins with warmth..
              </p>
              <div className="space-y-4 text-sm">
                <p className="flex items-center gap-2">
                  📧 <span>adirachiffons@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  📞 <span>+91 70007 85499</span>
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white text-black p-6 md:p-8 rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-1">
                We’d love to hear from you!
              </h3>
              <p className="text-sm mb-6">Let’s get in touch</p>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input-style"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Laxita Thakur"
                    className="input-style"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-style"
                  />
                  <div className="flex w-full">
                    
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="input-style border-l-0 rounded-l-none"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="input-style"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="input-style"
                />
                <button
                  type="submit"
                  className="bg-primary text-light px-6 py-2 rounded-md hover:bg-[#2f2146] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
