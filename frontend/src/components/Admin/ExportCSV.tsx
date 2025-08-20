import { downloadOrderCSV } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { Download } from "lucide-react";

const ExportCSV = () => {
  const handleDownload = async () => {
    try {
      await downloadOrderCSV();
    } catch (error) {
      console.error("Failed to download CSV:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return <Button className="bg-white text-black border-1 font-semibold" onClick={handleDownload}><Download />Export CSV</Button>;
};

export default ExportCSV;
