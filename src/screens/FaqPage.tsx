import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { SearchIcon, PlusIcon, MinusIcon } from 'lucide-react';
interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);
  // FAQ Data
  const faqItems: FaqItem[] = [{
    question: 'What are your minimum order quantities?',
    answer: 'Minimum order quantities vary by product. Each product page displays its specific MOQ. For most items, we offer flexible quantities to accommodate businesses of all sizes. Bulk discounts are typically available for larger orders.',
    category: 'orders'
  }, {
    question: 'How do I create a business account?',
    answer: 'To create a business account, click on the "Account" icon in the top navigation, then select "Register". Fill out the registration form with your business details including your business name, tax ID, and business address. Once submitted, our team will review your application and activate your account within 1-2 business days.',
    category: 'accounts'
  }, {
    question: 'Do you offer business credit accounts?',
    answer: 'Yes, we offer credit accounts for qualified businesses. To apply, you must have an active business account with at least 3 completed orders. Navigate to the "Payment Methods" section in your account dashboard and select "Apply for Credit Account". You\'ll need to provide business financial information and references.',
    category: 'payments'
  }, {
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple payment methods including credit/debit cards, bank transfers, Paystack, Flutterwave, and OPay. Business account holders may also be eligible for credit terms after approval.',
    category: 'payments'
  }, {
    question: 'What is your delivery timeframe?',
    answer: 'Standard delivery within Lagos is 1-2 business days. Other locations in Nigeria typically take 2-5 business days. International shipping times vary by destination. You can see estimated delivery dates during checkout before completing your purchase.',
    category: 'shipping'
  }, {
    question: 'Do you offer expedited shipping?',
    answer: 'Yes, we offer expedited shipping options at checkout for an additional fee. Same-day delivery is available for orders placed before 10 AM in Lagos. Next-day delivery is available for most major cities in Nigeria.',
    category: 'shipping'
  }, {
    question: 'What is your return policy?',
    answer: 'We accept returns within 14 days of delivery for most products, provided they are in original condition and packaging. Custom orders and certain perishable items are not eligible for return. Please contact our customer service team to initiate a return.',
    category: 'returns'
  }, {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also view order status and tracking information in your account dashboard under "Order History".',
    category: 'orders'
  }, {
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or canceled within 1 hour of placement. After this window, orders enter our fulfillment process and cannot be changed. Please contact customer service immediately if you need to make changes to a recent order.',
    category: 'orders'
  }, {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to select countries in West Africa including Ghana, Cameroon, Benin Republic, and Togo. International shipping costs and delivery times are calculated at checkout based on destination and order weight.',
    category: 'shipping'
  }, {
    question: 'How do I apply for bulk pricing?',
    answer: 'Bulk pricing tiers are automatically applied based on the quantity ordered. You can see the different pricing tiers on each product page. For very large orders beyond the listed tiers, please contact our sales team for custom quotations.',
    category: 'pricing'
  }, {
    question: 'Do you have physical showrooms?',
    answer: 'Yes, we have showrooms in Lagos, Abuja, and Port Harcourt where you can view our products in person. Appointments are recommended for personalized assistance. Visit our Contact page for location details and operating hours.',
    category: 'general'
  }];
  const categories = [{
    id: 'all',
    name: 'All Categories'
  }, {
    id: 'orders',
    name: 'Orders'
  }, {
    id: 'accounts',
    name: 'Accounts'
  }, {
    id: 'payments',
    name: 'Payments'
  }, {
    id: 'shipping',
    name: 'Shipping'
  }, {
    id: 'returns',
    name: 'Returns'
  }, {
    id: 'pricing',
    name: 'Pricing'
  }, {
    id: 'general',
    name: 'General'
  }];
  // Filter FAQs based on search query and category
  const filteredFaqs = faqItems.filter(faq => {
    const matchesSearch = searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };
  return <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl">
              Find answers to common questions about our products, ordering,
              shipping, and more.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <input type="text" placeholder="Search for answers..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            {/* Categories */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map(category => <button key={category.id} className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category.id ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} onClick={() => setActiveCategory(category.id)}>
                    {category.name}
                  </button>)}
              </div>
            </div>
            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button className="w-full text-left p-6 flex justify-between items-center focus:outline-none" onClick={() => toggleItem(index)}>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                      {openItems.includes(index) ? <MinusIcon className="h-5 w-5 text-emerald-700" /> : <PlusIcon className="h-5 w-5 text-emerald-700" />}
                    </button>
                    {openItems.includes(index) && <div className="px-6 pb-6 text-gray-600">
                        <div className="pt-2 border-t border-gray-200">
                          <p>{faq.answer}</p>
                        </div>
                      </div>}
                  </div>) : <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    No results found for "{searchQuery}" in this category.
                  </p>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search terms or selecting a different
                    category.
                  </p>
                  <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                    Reset Search
                  </Button>
                </div>}
            </div>
          </div>
        </div>
      </section>
      {/* Still Have Questions */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-8">
              If you couldn't find the answer you were looking for, our customer
              support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary">
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline">
                <Link to="/account">Check Order Status</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default FaqPage;