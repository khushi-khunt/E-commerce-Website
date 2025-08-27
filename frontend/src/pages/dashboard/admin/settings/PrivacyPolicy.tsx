import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { ScrollText, Search } from "lucide-react";
import adminsetting from "@/assets/images/adminsetting.jpg"

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      description:
        `TechFusion Solutions Inc. ("we", "our", "us") respects your privacy and is committed 
        to protecting it through our compliance with this policy. This Privacy Policy explains 
        how we collect, use, disclose, and safeguard your information when you use our SaaS 
        product, TechFusion Suite, available at www.techfusion.com (the "Site") or through our 
        applications and services (collectively, "Services").`,
    },
    {
      title: "Information We Collect",
      description:
        `This Privacy Policy explains how we collect, use, disclose, and safeguard your 
        information when you use our SaaS product. Please read this privacy policy carefully 
        to understand our practices.`,
    },
    {
      title: "Our Role in Your Privacy",
      description:
        `We respect your privacy and are committed to protecting your data. This policy explains 
        how we treat it and the measures we take.`,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* image section */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-cover bg-center py-12 sm:py-20"
        style={{ backgroundImage: `url(${adminsetting})` }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Privacy Policy</h2>
          <p className="text-gray-200 max-w-2xl text-sm sm:text-base">
            Our code of conduct and your pledge to be an upstanding member of the product
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

      <div className="space-y-6 mt-5">
        {sections.map((section, i) => (
          <Card
            key={i}
            className="rounded-xl shadow-sm border bg-card hover:shadow-md transition"
          >
            <CardHeader className="flex flex-row items-start gap-3">
              <ScrollText className="text-orange-500 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold">
                  {section.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
