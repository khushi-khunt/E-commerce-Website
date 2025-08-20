import { Button } from "@/theme/components/ui/button";
import React from "react";
import banner from "@/assets/images/banner.png";

const Banner: React.FC = () => {
  return (
   <section
  className="
    relative w-full 
    min-h-[360px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[560px] 
    flex items-center justify-start 
    overflow-hidden 
    bg-no-repeat bg-center 
    bg-cover sm:bg-contain
  "
  style={{
    backgroundImage: `url(${banner})`,
  }}
>
  {/* Optional overlay for contrast */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-transparent z-0" />

  {/* Content */}
  <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 max-w-[95%] sm:max-w-[90%] md:max-w-[720px] lg:max-w-[850px] text-left">
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#088178] mb-2">
      Repair Services
    </p>
    <h1
      className="
        font-bold text-gray-900 mb-4 
        text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
        leading-tight sm:leading-snug md:leading-snug 
        max-w-[38ch]
      "
    >
      We’re an Apple <br className="hidden sm:block" />
      Authorised Service Provider
    </h1>
    <Button
      className="mt-4 bg-[#088178] hover:bg-[#066d68] rounded-sm text-xs sm:text-sm md:text-base px-4 py-2 sm:px-5 sm:py-2.5"
    >
      Learn More →
    </Button>
  </div>
</section>

  );
};

export default Banner;
