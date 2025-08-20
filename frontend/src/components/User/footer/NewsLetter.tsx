import { Button } from "@/theme/components/ui/button"
import { Input } from "@/theme/components/ui/input"
import iconemail from "@/assets/images/iconemail.png"

export const Newsletter = () => {
  return (
    <div className="bg-[rgb(174,204,197)] px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-4">


      <div className="flex gap-3 items-center">
        <img src={iconemail} className="w-10 h-10 " alt="iconemail" />
        <span className="text-2xl font-semibold">Sign up to Newsletter</span>
      </div>
      <div className="text-center flex-1">
        <span className="text-md font-semibold ">...and receive $25 coupon for first shopping.</span>
      </div>

      <div className="flex items-center ">
        <Input type="email" placeholder="Enter your email" className="w-64 bg-white rounded-none " />
        <Button className="rounded-none hover:bg-[rgb(8,129,120,1)] cursor-pointer">Subscribe</Button>
      </div>
    </div>
  )
}
