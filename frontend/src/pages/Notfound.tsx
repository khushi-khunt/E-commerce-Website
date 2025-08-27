import { Button } from "@/theme/components/ui/button"
import { Link } from "react-router-dom"

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default Notfound
