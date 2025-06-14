import img from "../assets/contact.png";

import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import CustomLabel from "../components/CustomLabel";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SectionHeading from "../components/SectionHeading";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    comment: "",
  });

  const {
    mutate: addEnquiry,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/enquiry/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to send message");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        comment: "",
      });
    },

    onError: () => {
      toast.error("Failed to send message!");
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry(formData);
  };
  return (
    <>
      <Helmet>
        <title>Contact Us - Galaxy Dials</title>
        <meta
          name="description"
          content="Get in touch with Galaxy Dials. Reach out via email, phone, or visit us at our physical store. We're here to help with all your inquiries."
        />
        <meta
          name="keywords"
          content="Galaxy Dials, Contact, Customer Support, Email, Phone, Address"
        />
        <link rel="canonical" href="https://www.galaxydials.com/contact" />
      </Helmet>

      {/* Section Heading */}
      <div className="text-xl text-center pt-6 sm:pt-8 border-t">
        <SectionHeading text1="CONTACT" text2="US" />
      </div>

      {/* Contact Section */}
      <div className="my-2 flex flex-col md:flex-row sm:gap-16">
        {/* Contact Image */}
        <img
          src={img}
          alt="Contact Us"
          className="w-full md:max-w-[450px] object-cover rounded-md"
          loading="lazy"
          decoding="async"
        />

        {/* Contact Content */}
        <div className="flex flex-col justify-center gap-4 sm:gap-6 md:w-2/4 text-gray-600">
          <p>
            Have a question, concern, or simply want to connect with us? Feel
            free to reach out using any of the methods below. Our team is here
            to assist you and provide any information you may need.
          </p>

          <h3 className="text-gray-800 text-lg font-semibold">Get in Touch</h3>
          <p>
            We&apos;re committed to providing exceptional customer service.
            Whether you need help with an order, have inquiries about our
            products, or just want to say hello, don&apos;t hesitate to contact
            us.
          </p>

          {/* Contact Details */}
          <ul className="space-y-2 text-gray-700">
            <li>
              <b>Email:</b>{" "}
              <a
                href="mailto:support@galaxydials.com"
                className="hover:text-blue-600 ease-in-out duration-200"
              >
                support@galaxydials.com
              </a>
            </li>
            <li>
              <b>Phone:</b>{" "}
              <a
                href="tel:+923001234567"
                className="hover:text-blue-600 ease-in-out duration-200"
              >
                0300 1234567
              </a>
            </li>
            <li>
              <b>Address:</b> Galaxy Dials, 123 Time Avenue, Lahore, Pakistan
            </li>
          </ul>

          <h3 className="text-gray-800 text-lg font-semibold">Follow Us</h3>
          <p>
            Stay connected and follow us on social media for the latest updates,
            promotions, and new arrivals:
          </p>

          <ul className="flex gap-4">
            <li>
              <a
                href=""
                target="_blank"
                className="hover:text-blue-600 ease-in-out duration-200"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                className="hover:text-blue-600 ease-in-out duration-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-3 sm:px-6 py-8 sm:py-16 max-w-10xl mx-auto"
      >
        <h2 className="text-gray-800 text-xl font-semibold">
          Get in Touch with Us
        </h2>
        {/* Name */}
        <div>
          <CustomLabel label="Your Name" />
          <CustomInput
            type="text"
            name="name"
            id="name"
            required
            placeholder="Muhammad Usman"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email and Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <CustomLabel label="Your Email" />
            <CustomInput
              type="email"
              name="email"
              id="email"
              placeholder="name@gmail.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <CustomLabel label="Mobile" />
            <CustomInput
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="0000 000000"
              required
              aria-required="true"
              minLength={11}
              maxLength={11}
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="mb-5">
          <CustomLabel label="Subject" />
          <CustomInput
            type="text"
            name="subject"
            id="subject"
            required
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>

        {/* Comment */}
        <div>
          <CustomLabel label="Your Message" />
          <textarea
            name="comment"
            rows="4"
            id="comment"
            required
            placeholder="Leave a comment..."
            value={formData.comment}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {isError && <div className="text-red-500 text-sm">{error.message}</div>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <CustomButton
            disabled={isPending}
            content={isPending ? "Submitting..." : "Submit"}
            className="w-52"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default ContactPage;
