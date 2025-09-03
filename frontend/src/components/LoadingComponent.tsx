import { Loader2 } from "lucide-react";

export default function LoadingComponent({ message = "Loading..." }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="text-gray-700 text-lg font-medium">{message}</p>
            </div>
        </div>
    );
}
