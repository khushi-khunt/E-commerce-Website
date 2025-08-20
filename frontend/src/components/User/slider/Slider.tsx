import { useEffect, useRef, useState } from "react";
import { Button } from "@/theme/components/ui/button";
import { cn } from "@/lib/utils";
import slider4 from '@/assets/images/slider4.png';
import slider1 from "@/assets/images/slider1.png";
import slider2 from "@/assets/images/slider2.png";
import btnbg from "@/assets/images/btnbg.png";

interface Slide {
    id: number;
    imageUrl: string;
    subtitle: string;
    title: string;
    description: string;
}

const slides: Slide[] = [
    {
        id: 1,
        imageUrl: slider1,
        subtitle: "Trade-in Offer",
        title: "New Collection",
        description: "Explore the latest trends with our new arrivals.",
    },
    {
        id: 2,
        imageUrl: slider4,
        subtitle: "Up-coming Offer",
        title: "Summer Sale",
        description: "Get ready with our amazing discounts soon.",
    },
    {
        id: 3,
        imageUrl: slider2,
        subtitle: "Hot promotions",
        title: "Exclusive Offers",
        description: "Sign up today to get special access to exclusive deals.",
    },
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className="relative w-full h-72 md:h-96 shadow-md overflow-hidden bg-[rgb(222,237,236)]">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="flex flex-col md:flex-row w-full h-72 md:h-96 flex-shrink-0"
                    >
                        {/* Left Side Content */}
                        <div className="flex flex-col justify-center items-center text-center md:text-left p-4 w-full md:w-1/3 bg-white/60">
                            <h5 className="text-xl sm:text-2xl font-semibold mb-1">{slide.subtitle}</h5>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-[rgb(75,146,159)]">
                                {slide.title}
                            </h3>
                            <p className="text-sm sm:text-base md:text-lg mb-4 max-w-sm">
                                {slide.description}
                            </p>

                            <Button
                                variant="ghost"
                                className="relative bg-no-repeat bg-center bg-cover !bg-transparent font-bold px-6 w-full max-w-[200px]"
                                style={{
                                    backgroundImage: `url(${btnbg})`,
                                }}
                            >
                                Shop Now
                            </Button>
                        </div>

                        {/* Right Side Image */}
                        <div className="w-full md:w-2/3 h-full">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                ))}

            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        variant="ghost"
                        className={cn(
                            "w-3 h-3 rounded-full p-0",
                            index === currentIndex ? "bg-[rgb(99,162,193)]" : "bg-gray-300"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
