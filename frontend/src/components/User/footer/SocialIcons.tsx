import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

export const SocialIcons = () => {
    return (
        <div className="flex flex-col  gap-3 mt-4">
            <div>
                <span className="text-gray-500 font-bold">Follow Us</span>
            </div>
            <div className="flex gap-3">
                <FaFacebook className="w-5 h-5 hover:text-primary cursor-pointer  text-gray-500" />
                <FaInstagram className="w-5 h-5 hover:text-primary cursor-pointer text-gray-500" />
                <FaTwitter className="w-5 h-5 hover:text-primary cursor-pointer   text-gray-500" />
                <FaYoutube className="w-5 h-5 hover:text-primary cursor-pointer   text-gray-500" />
            </div>

        </div>
    )
}
