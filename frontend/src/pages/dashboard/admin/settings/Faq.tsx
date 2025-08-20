import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/theme/components/ui/accordion";


const faqData = [
  {
    question: "What types of products do you sell?",
    answer:
      "We offer a wide range of products including electronics, fashion, home essentials, beauty products, and more — all from trusted brands and sellers.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is placed, you’ll receive a confirmation email with a tracking link. You can also track your order from the 'My Orders' section in your account.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can return most items within 7–10 days of delivery. The item must be unused and in its original packaging. Visit our Return & Refund page for more details.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team through the Contact Us page, live chat, or email. We're available 24/7 to help you with any queries.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on all orders above ₹499. Shipping charges may apply for orders below that amount depending on your location.",
  },
  {
    question: "Can I cancel or modify my order after placing it?",
    answer:
      "Yes, orders can be canceled or modified before they are shipped. Go to 'My Orders' and choose the order you want to update or cancel.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure payment gateways to protect your data. Your payment information is never stored on our servers.",
  },
  {
    question: "Do you offer discounts or coupons?",
    answer:
      "Yes! We regularly run promotional campaigns, flash sales, and coupon offers. Subscribe to our newsletter and check the Coupons section for active deals.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button at the top right corner of the homepage. Fill in your details, and you’ll be ready to start shopping in minutes!",
  },
  {
    question: "Can I save items for later?",
    answer:
      "Yes, you can add items to your wishlist to view or purchase them later. Just click the heart icon on any product page.",
  },
];


export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text animate-fade-in-down">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
      >
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border border-muted shadow-sm transition hover:shadow-md bg-background"
          >
            <AccordionTrigger className="px-4 py-4 text-lg font-medium hover:text-primary transition-all">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
