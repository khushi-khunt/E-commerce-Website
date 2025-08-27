import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/theme/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/theme/components/ui/avatar"
import { LogIn, Settings, Server, KeyRound, User, ShieldCheck, Search } from "lucide-react"
import avatar1 from "@/assets/images/avatar-1.jpg"
import avatar2 from "@/assets/images/avatar-2.jpg"
import avatar3 from "@/assets/images/avatar-3.jpg"
import avatar4 from "@/assets/images/avatar-4.jpg"
import avatar5 from "@/assets/images/avatar-5.jpg"
import avatar6 from "@/assets/images/avatar-6.jpg"
import avatar7 from "@/assets/images/avatar-7.jpg"
import avatar8 from "@/assets/images/avatar-8.jpg"
import avatar9 from "@/assets/images/avatar-9.jpg"
import { Input } from "@/theme/components/ui/input"
import adminsetting from "@/assets/images/adminsetting.jpg"

const helpData = [
    {
        icon: LogIn,
        title: "Getting Started with Larkon",
        description: "Welcome to Larkon Dive into basics for a swift onboarding experience",
        author: "by Aston Martin",
        avatar: avatar1,
        videos: "19 Video"
    },
    {
        icon: Settings,
        title: "Admin Settings",
        description: "Learn how to manage your current workspace or your enterprise space",
        author: "by Michael A. Miner",
        avatar: avatar2,
        videos: "10 Video"
    },
    {
        icon: Server,
        title: "Server Setup",
        description: "Connect, simplify, and automate. Discover the power of apps and tools.",
        author: "by Theresa T. Brose",
        avatar: avatar3,
        videos: "07 Video"
    },
    {
        icon: KeyRound,
        title: "Login And Verification",
        description: "Learn how to sign in with your email address, or Apple / Google.",
        author: "by James L. Erickson",
        avatar: avatar4,
        videos: "03 Video"
    },
    {
        icon: User,
        title: "Account Setup",
        description: "Adjust your profile and preferences to make ChatCloud work just for you.",
        author: "by Lily Wilson",
        avatar: avatar5,
        videos: "11 Video"
    },
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        description: "Trust on our current database and learn how we distribute your data.",
        author: "by Sarah Brooks",
        avatar: avatar6,
        videos: "09 Video"
    },
    {
        icon: ShieldCheck,
        title: "Channel Setup",
        description: "From channels to search, learn how ChatCloud works from top to bottom.",
        author: "by Joe K. Hall",
        avatar: avatar7,
        videos: "14 Video"
    },
    {
        icon: ShieldCheck,
        title: "Permissions",
        description: "Permission for you and others to join and work within a workspace",
        author: "by Robert Leavitt",
        avatar: avatar8,
        videos: "17 Video"
    },
    {
        icon: ShieldCheck,
        title: "Billing Help",
        description: "That feel when you look at your bank account and billing works.",
        author: "by Lydia Anderson",
        avatar: avatar9,
        videos: "12 Video"
    }
]

export default function HelpCenter() {
    return (
        <div className="p-4 sm:p-6">
            {/* Hero Section */}
            <div
                className="relative w-full rounded-2xl overflow-hidden bg-cover bg-center py-12 sm:py-20"
                style={{ backgroundImage: `url(${adminsetting})` }}
            >
                <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

                <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-4">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white">Help Center</h2>
                    <p className="text-gray-200 max-w-2xl text-sm sm:text-base">
                        How can we help you?
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

            {/* Cards Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:mt-10">
                {helpData.map((item, i) => {
                    const Icon = item.icon
                    return (
                        <Card
                            key={i}
                            className="hover:shadow-xl transition rounded-2xl flex flex-col justify-between"
                        >
                            <CardHeader className="flex flex-row items-start gap-3">
                                <div className="bg-blue-100 text-blue-500 w-10 h-10 flex items-center justify-center rounded-lg">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base sm:text-lg font-semibold">
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-500">
                                        {item.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={item.avatar} alt={item.author} />
                                        <AvatarFallback>{item.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs sm:text-sm">{item.author}</span>
                                </div>
                                <span className="text-xs sm:text-sm text-blue-500 font-medium">
                                    {item.videos}
                                </span>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
