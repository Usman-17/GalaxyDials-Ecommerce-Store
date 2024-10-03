import SectionHeading from "../components/SectionHeading";
import img from "../assets/contact.png";
import { Helmet } from "react-helmet";

const ContactPage = () => {
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
    </>
  );
};

export default ContactPage;
