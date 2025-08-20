import { Card, CardContent } from "@/theme/components/ui/card";
import cont1 from "@/assets/images/cont1.png";
import cont2 from "@/assets/images/cont2.png";
import cont3 from "@/assets/images/cont3.png";
import cont4 from "@/assets/images/cont4.png";
import cont5 from "@/assets/images/cont5.png";
import cont6 from "@/assets/images/cont6.png";

const features = [
    {
        title: "Free Shipping",
        image: cont1,
        color: "bg-pink-200",
    },
    {
        title: "Online Order",
        image: cont2,
        color: "bg-gray-300",
    },
    {
        title: "Save Money",
        image: cont3,
        color: "bg-green-200",
    },
    {
        title: "Promotions",
        image: cont4,
        color: "bg-blue-200",
    },
    {
        title: "Happy Sell",
        image: cont5,
        color: "bg-purple-200",
    },
    {
        title: "24/7 Support",
        image: cont6,
        color: "bg-orange-200",
    },
];

const FeaturesCards = () => {
    return (
        <section className="container py-12 space-y-8">
            {/* section heading */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#088178] tracking-tight">Our Services</h1>
                <p className=" mt-2 text-md font-semibold text-black">
                    We’re here to make your shopping experience better
                </p>
            </div>
            {/* Feature cards */}
            <div className="flex justify-center gap-6 flex-wrap">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className="flex flex-col items-center justify-center px-4 py-7 w-[200px]  hover:shadow-lg rounded-sm border hover:-translate-y-2 transition-transform duration-300">
                        <img src={feature.image} alt={feature.title} className="mb-2" />
                        <CardContent className="p-0 text-center">
                            <h3 className={`text-sm font-bold text-[#088178] p-2 rounded-sm ${feature.color}`}>
                                {feature.title}
                            </h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturesCards;
