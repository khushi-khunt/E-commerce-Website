import { useState } from "react";
import { Button } from "@/theme/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/theme/components/ui/popover";

// Your navLinks
const navLinks = [
  { label: "Men", dropdown: true },
  { label: "Women", dropdown: true },
  { label: "Kids", dropdown: true },
  { label: "Fashion", dropdown: true },
  { label: "Kitchen", dropdown: true },
  { label: "Beauty ", dropdown: false },
  { label: "Jewellery", dropdown: true },
  { label: "Bags", dropdown: true },
  { label: "Sports", dropdown: true },
  { label: "Toys", dropdown: false },
  { label: "Electronics", dropdown: true },
];

// Define dropdown items for each label
const dropdownItems: Record<string, (string | { label: string; children: string[] })[]> = {
  Men: [
    {
      label: "Men's Clothing", children: ["Clothing", "T-shirts", "Shirt", "Jeans", "Inner Wear"]
    },
    { label: "Men's Accessories", children: ["Watches", "Belts", "Wallets", "Jewellery", "Bags & Luggage", "Sunglasses"] },
    { label: "Men's Shoes", children: ["Shoes", "Sports Shoes", "Formal Shoes", "Casual Shoes"] },
    { label: "Stores", children: ["SportsWear", "The Designer Boutique", "Men's Fashion", "Amazon Fashion", "Men's Handlooms", "Fashion Sales & Deals"] },
  ],

  Women: [
    {
      label: "Women's Clothing", children: ["Clothing", "Western-Wear", "Ethnic Wear", "Night Wears", "Top Brands"]
    },
    { label: "Women's Accessories", children: ["Watches", "HandBags", "Clutches", "Gold & Dimond ", "Jewellery", "Fashion & Silver jewellery", "Sunglasses"] },
    { label: "Women's Shoes", children: ["Shoes", "Fashion Sandles", "Ballerinas", "Flat Slipper"] },
    { label: "Stores", children: ["The Designer Boutique", "Handloom & Handicraft Store", "SportsWear", "Women's Fashion", "Fashion Sales & Deals"] },
  ],

  Kids: [
    {
      label: "Baby Care",
      children: [
        "Baby Bedding & Accessories",
        "All Baby Care",
        "NewBorn Care",
        "Night Wears",
        "Top Brands",
      ],
    },
    {
      label: "Infant 0-2 Years",
      children: ["Rompers", "Baby Sets", "Ethnic Wears"],
    },
    {
      label: "Boys and Girls 2+ years",
      children: [
        "Dresses",
        "Boy's Sets",
        "Girl's Sets",
        "Ethnic Wears",
        "Night Wear's",
        "Top-Wears",
        "Bottom-Wears",
      ],
    },
  ],

  Fashion: [
    {
      label: "New Arrivals",
      children: ["Latest Trends", "Just In", "Editor's Picks"],
    },
    {
      label: "Trending",
      children: ["Top Sellers", "Celebrity Styles", "Street Fashion"],
    },
    {
      label: "Sale",
      children: ["Under ₹499", "50% Off", "Clearance"],
    },
  ],

  Kitchen: [
    {
      label: "Furniture",
      children: ["Floor Furniture", "Recliner", "Kitchen Racks", "Dining Sets"],
    },
    {
      label: "Decor",
      children: ["Wall Art", "Clocks", "Vases", "Plants"],
    },
    "Appliances",
  ],

  Jewellery: [
    {
      label: "Necklaces",
      children: ["Gold", "Silver", "Imitation", "Stone Work"],
    },
    {
      label: "Earrings",
      children: ["Studs", "Hoops", "Jhumkas", "Danglers"],
    },
    {
      label: "Bags",
      children: ["Potli Bags", "Clutches", "Pouches"],
    },
  ],

  Bags: [
    {
      label: "Backpacks",
      children: ["College Bags", "Travel Backpacks", "Laptop Bags"],
    },
    {
      label: "Handbags",
      children: ["Tote Bags", "Shoulder Bags", "Sling Bags"],
    },
    "Wallets",
  ],

  Sports: [
    {
      label: "Equipment",
      children: ["Cricket", "Football", "Badminton", "Yoga Mats"],
    },
    {
      label: "Clothing",
      children: ["T-Shirts", "Tracksuits", "Jerseys"],
    },
    "Shoes",
  ],

  Electronics: [
    {
      label: "Mobiles",
      children: ["Smartphones", "Feature Phones", "Refurbished Phones"],
    },
    {
      label: "Laptops",
      children: ["Gaming", "Ultrabooks", "Student Laptops"],
    },
    {
      label: "Accessories",
      children: ["Chargers", "Cables", "Covers", "Power Banks"],
    },
    {
      label: "Smart Home Automation",
      children: ["Smart Bulbs", "CCTV", "Voice Assistants"],
    },
    "Tablets",
  ],
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [openMainPopover, setOpenMainPopover] = useState<number | null>(null);
  const [openSubPopover, setOpenSubPopover] = useState<string | null>(null);


  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 p-3 bg-[rgb(185,213,206)]">
      <div className="flex items-center justify-between px-4 py-2 md:px-8">
        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 relative">
          <ul className="flex items-center gap-6 overflow-x-auto scrollbar-hide justify-between w-full px-4 font-medium relative">
            {navLinks.map(({ label, dropdown }, idx) =>
              dropdown ? (
                <Popover
                  key={label}
                  open={openMainPopover === idx}
                  onOpenChange={(open) => setOpenMainPopover(open ? idx : null)}
                >
                  <div
                    onMouseEnter={() => setOpenMainPopover(idx)}
                    onMouseLeave={() => setOpenMainPopover(null)}
                  >
                    <PopoverTrigger asChild>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        <span>{label}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-56"
                    >
                      <div className="flex flex-col gap-1">
                        {dropdownItems[label]?.map((item) =>
                          typeof item === "string" ? (
                            <span
                              key={item}
                              className="text-sm text-muted-foreground hover:text-primary cursor-pointer px-2 py-1 rounded hover:bg-muted"
                            >
                              {item}
                            </span>
                          ) : (
                            // 👇 Wrap the whole nested Popover in hover-sensitive div
                            <div
                              key={item.label}
                              onMouseEnter={() => setOpenSubPopover(item.label)}
                              onMouseLeave={() => setOpenSubPopover(null)}
                            >
                              <Popover open={openSubPopover === item.label}>
                                <PopoverTrigger asChild>
                                  <div className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-muted rounded group">
                                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                                      {item.label}
                                    </span>
                                    <ChevronDown className="w-3 h-3 text-muted-foreground ml-2 group-hover:text-primary" />
                                  </div>
                                </PopoverTrigger>

                                <PopoverContent side="right" align="start" className="w-48">
                                  <div className="flex flex-col gap-1">
                                    {item.children.map((subItem) => (
                                      <span
                                        key={subItem}
                                        className="text-sm text-muted-foreground hover:text-primary cursor-pointer px-2 py-1 rounded hover:bg-muted"
                                      >
                                        {subItem}
                                      </span>
                                    ))}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          )
                        )}
                      </div>
                    </PopoverContent>
                  </div>
                </Popover>

              ) : (
                <span
                  key={label}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  {label}
                </span>
              )
            )}
          </ul>
        </div>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col gap-2 px-4 py-3 font-medium bg-white border-t border-gray-200 shadow-md animate-in fade-in slide-in-from-top-2">
          {navLinks.map(({ label, dropdown }, idx) => (
            <li key={label} className="flex flex-col gap-1">
              <div
                className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                onClick={() =>
                  dropdown
                    ? setOpenDropdownIndex(
                      openDropdownIndex === idx ? null : idx
                    )
                    : null
                }
              >
                <span>{label}</span>
                {dropdown && (
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${openDropdownIndex === idx ? "rotate-180" : ""
                      }`}
                  />
                )}
              </div>
              {/* Mobile dropdown content */}
              {dropdown && openDropdownIndex === idx && (
                <div className="pl-4 flex flex-col gap-1">
                  {dropdownItems[label]?.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

