"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [myFormData, setMyFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMyFormData((prev) => ({ ...prev, [name]: value }));
  };

  // React 19+ standard form submission event type
  const handleFormSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        ...myFormData,
      }).toString();

      // POST to "/" instead of "/forms.html"
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      if (res.ok) {
        console.log("Submitted successfully");
        toast.success("Submitted successfully");
        setMyFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Form submission failed", res.status);
        toast.error("Error, try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <section
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-4 max-w-4xl mx-auto text-(--brand-font-color)"
      id="contact"
    >
      <div className="text-center mb-4">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight opacity-75 mb-3 text-(--brand-font-color)">
          Contact Us
        </h2>
        <p className="text-sm sm:text-base opacity-70 max-w-lg mx-auto">
          Have questions, feedback, or need help with Flowcus?
          <br />
          Send us a message and we will get back to you soon.
        </p>
      </div>

      <div className="rounded-2xl border border-(--brand-font-color)/20 p-4 sm:p-5 bg-(--brand-font-color)/2">
        <form
          name="contact"
          onSubmit={handleFormSubmit}
          className="space-y-6"
          data-netlify="true"
        >
          {/* Hidden input required for Netlify detection */}
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={myFormData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-4 py-2 rounded-xl border border-(--brand-font-color)/20 bg-transparent focus:outline-none focus:border-(--brand-font-color) transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={myFormData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full px-4 py-2 rounded-xl border border-(--brand-font-color)/20 bg-transparent focus:outline-none focus:border-(--brand-font-color) transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={myFormData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full px-4 py-2 rounded-xl border border-(--brand-font-color)/20 bg-transparent focus:outline-none focus:border-(--brand-font-color) transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              required
              value={myFormData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 rounded-xl border border-(--brand-font-color)/20 bg-transparent focus:outline-none focus:border-(--brand-font-color) transition-all text-sm resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-8 py-2.5 rounded-xl border border-(--brand-font-color) bg-(--brand-font-color) text-(--brand-color) hover:opacity-90 transition-all font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-black cursor-pointer"
            >
              <FiSend className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
