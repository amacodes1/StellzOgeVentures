import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  return <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl">
              Have questions or need assistance? Our team is here to help you.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              {isSubmitted ? <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-600">
                    Thank you for reaching out. Our team will get back to you
                    shortly.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" name="phone" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input type="text" id="company" name="company" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.company} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select id="subject" name="subject" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.subject} onChange={handleChange}>
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">
                        Product Information
                      </option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Business Account">Business Account</option>
                      <option value="Returns & Refunds">
                        Returns & Refunds
                      </option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea id="message" name="message" rows={5} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" value={formData.message} onChange={handleChange}></textarea>
                  </div>
                  <div>
                    <Button variant="primary" type="submit" fullWidth>
                      Send Message
                    </Button>
                  </div>
                </form>}
            </div>
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-emerald-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Our Location
                      </h3>
                      <p className="text-gray-600">
                        123 Business Avenue
                        <br />
                        Industrial Park, Lagos
                        <br />
                        Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon className="h-6 w-6 text-emerald-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">
                        Sales: +234 123 4567 890
                        <br />
                        Support: +234 123 4567 891
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MailIcon className="h-6 w-6 text-emerald-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">
                        Sales: sales@wholesalepro.com
                        <br />
                        Support: support@wholesalepro.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-emerald-700 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Business Hours
                      </h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 5:00 PM
                        <br />
                        Saturday: 9:00 AM - 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Map */}
              <div className="bg-white rounded-lg shadow-md p-2 h-64">
                {/* Here you would normally embed a Google Map or similar */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                  What are your minimum order quantities?
                </h3>
                <p className="text-gray-600">
                  Minimum order quantities vary by product. Each product page
                  displays its specific MOQ. For most items, we offer flexible
                  quantities to accommodate businesses of all sizes.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Do you offer business credit accounts?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer credit accounts for qualified businesses. Please
                  contact our accounts team or fill out the business credit
                  application in your account dashboard.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">
                  What is your delivery timeframe?
                </h3>
                <p className="text-gray-600">
                  Standard delivery within Lagos is 1-2 business days. Other
                  locations in Nigeria typically take 2-5 business days.
                  International shipping times vary by destination.
                </p>
              </div>
              <div className="text-center mt-8">
                <Button variant="outline">
                  <Link to="/faq">View All FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default ContactPage;