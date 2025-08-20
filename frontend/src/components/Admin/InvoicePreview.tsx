import { previewInvoice } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";

const InvoicePreview = ({ orderId }: { orderId: string }) => {
  const handlePreview = async () => {
    try {
      await previewInvoice(orderId);
    } catch (err) {
      console.error("Failed to preview invoice:", err);
      alert("Failed to preview invoice. Try again later.");
    }
  };

  return (
    <Button onClick={handlePreview}>
      Preview Invoice Download
    </Button>
  );
};

export default InvoicePreview;
