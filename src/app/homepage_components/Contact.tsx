"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function Contact() {
  const [myFormData, setMyFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setMyFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
      await fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      }).then((res) => {
        console.log("Submitted", res)
      setMyFormData({ name: "",
    email: "",
    subject: "",
    message: "",})
      })
    .catch(error => alert(error));

  return (
    <section
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-4 max-w-4xl mx-auto text-(--brand-font-color)"
      id="contact"
    >
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight opacity-75 mb-3 text-(--brand-font-color)">
          Contact Us
        </h2>
        <p className="text-sm sm:text-base opacity-70 max-w-lg mx-auto">
          Have questions, feedback, or need help with Flowcus?<br></br>Send us a
          message and we will get back to you soon.
        </p>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl border border-(--brand-font-color)/20 p-4 sm:p-5 bg-(--brand-font-color)/2">
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6"
          data-netlify="true"
          method="POST"
        >
          {/* Name & Email Row */}
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
                onChange={(e) => handleChange(e)}
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

          {/* Subject Field */}
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

          {/* Message Textarea */}
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
              className="w-full px-8 py-2.5 rounded-xl border border-(--brand-font-color) bg-(--brand-font-color) text-(--brand-color) hover:opacity-90 transition-all font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm"
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
