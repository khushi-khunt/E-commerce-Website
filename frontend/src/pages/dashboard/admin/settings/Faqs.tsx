import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/theme/components/ui/accordion"
import { Card } from "@/theme/components/ui/card"
import { Input } from "@/theme/components/ui/input"
import { MailCheck, Search } from "lucide-react"
import { FaTwitter } from "react-icons/fa"
import adminsetting from "@/assets/images/adminsetting.jpg"
const Faq = () => {
    return (
        <div className="p-6 space-y-8">
            {/* image */}
            <div
                className="relative w-full rounded-2xl overflow-hidden bg-cover bg-center py-12 sm:py-20"
                style={{ backgroundImage: `url(${adminsetting})` }}
            >
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
                <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-4">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="text-gray-200 max-w-2xl text-sm sm:text-base">
                        We're here to help with any questions you have about plans, pricing, and supported features.
                    </p>

                    {/* Search bar */}
                    <Card className="w-full max-w-lg p-1 rounded-full">
                        <div className="flex items-center px-3">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search ..."
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm sm:text-base"
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Grid with 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 rounded-md ">

                {/* General Section */}
                <div >
                    <h2 className="text-lg font-semibold mb-3">General</h2>
                    <Accordion type="single" collapsible className="space-y-2 bg-white border rounded-md px-1 text-gray-500">
                        <AccordionItem value="general-1">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors  data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Can I use Dummy FAQs for my website or project?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Yes, you can use Dummy FAQs to populate your website or project during
                                development or testing phases. They help simulate the appearance and
                                functionality of a real FAQ section without requiring actual content.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Are Dummy FAQs suitable for customer support purposes?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                They can be, but it’s better to replace them with real content for actual support.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-3">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Do Dummy FAQs require Attribution?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                No, Dummy FAQs do not require attribution since they are not based on real questions or contributed by individuals. You can use them freely for internal testing or demonstration purposes.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>

                {/* Payments Section */}
                <div >
                    <h2 className="text-lg font-semibold mb-3">Payments</h2>
                    <Accordion type="single" collapsible className="space-y-2 bg-white border rounded-md px-1 text-gray-500">
                        <AccordionItem value="general-1">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Can I test my website/app with Dummy Payments?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Yes, Dummy Payments are commonly used by developers and businesses to test the functionality of e-commerce platforms, mobile apps, and payment gateways. They help identify and resolve issues without risking real transactions.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Are Dummy Payments secure?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Dummy Payments used in controlled environments for training or demonstration purposes are generally secure. However, it's crucial not to confuse them with real transactions and avoid entering genuine financial information.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-3">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                How can i differentiate between Dummy Payment and a real one?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Real payments involve the transfer of actual funds, resulting in a change in financial balances. Dummy Payments, on the other hand, do not involve any monetary exchange and are typically labeled or indicated as test transactions. Always verify the authenticity of transactions before proceeding with any action.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Refunds Section */}
                <div >
                    <h2 className="text-lg font-semibold mb-3">Refunds</h2>
                    <Accordion type="single" collapsible className="space-y-2 bg-white border rounded-md px-1 text-gray-500">
                        <AccordionItem value="general-1">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                How do i request a refund?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                To request a refund, simply contact our customer support team through email or phone and provide details about your purchase and reason for the refund. Our representatives will guide you through the process.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                What is the refund policy?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Our refund policy allows customers to request a refund within 30 days of purchase for eligible products or services. Certain restrictions may apply, so it's essential to review the terms and conditions specific to your purchase.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                How long does it take to process a refund?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Refunds are typically processed within 3-5 business days after the request is approved. However, it may take longer depending on the payment method and financial institution involved.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Support Section */}
                <div >
                    <h2 className="text-lg font-semibold mb-3">Support</h2>
                    <Accordion type="single" collapsible className="space-y-2 bg-white border rounded-md px-1 text-gray-500">
                        <AccordionItem value="general-1">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                How do i contact customer support?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                You can contact our customer support team via email, phone, or live chat. Our representatives are available to assist you during business hours, Monday through Friday.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                Is customer support available 24/7?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                Our customer support is available during regular business hours, Monday through Friday. However, you can leave us a message outside of these hours, and we'll respond to you as soon as possible.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="general-2">
                            <AccordionTrigger className="px-3 py-2 rounded-md transition-colors data-[state=open]:text-amber-500 data-[state=open]:bg-gray-100 hover:no-underline">
                                How long does it take to receive a response from customer support?
                            </AccordionTrigger>
                            <AccordionContent className="px-3 py-2 text-gray-600">
                                We strive to respond to all customer inquiries within 24 hours during regular business hours. Response times may vary depending on the volume of inquiries received.                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            <div className="text-center">
                <p className="text-xl">Can't find a Questions?</p>

                <div className="flex flex-col sm:flex-row justify-center mt-3 text-white gap-2 sm:gap-4">
                    <button className="bg-[#22c55e] flex items-center justify-center rounded-md p-2 w-full sm:w-auto">
                        <MailCheck className="size-6 mr-2" /> Email us your question
                    </button>

                    <button className="bg-[#4ecac2] flex items-center justify-center rounded-md p-2 w-full sm:w-auto">
                        <FaTwitter className="size-5 mr-2" /> Send us a Tweet
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Faq
