import { useUsers } from "@/hooks/Mutation";
import { Avatar, AvatarFallback } from "@/theme/components/ui/avatar";
import { Card, CardContent } from "@/theme/components/ui/card";
import { Skeleton } from "@/theme/components/ui/skeleton";

const AllUsers = () => {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center font-semibold py-6">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users?.map((user) => (
        <Card
          key={user.id}
          className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-muted bg-background overflow-hidden"
        >
          <CardContent className="flex flex-col items-center text-center px-0">
            {/* Avatar */}
            <Avatar className="h-16 w-16 border-4 border-primary/20 shadow-sm">
              <AvatarFallback className="text-xl uppercase bg-primary/10 text-primary font-bold">
                {user?.name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <h3 className="mt-3 font-semibold text-lg text-primary truncate w-full">
              {user?.name || "Unknown User"}
            </h3>

            {/* Email */}
            <p
              className="text-sm text-muted-foreground truncate w-full"
              title={user?.email}
            >
              {user?.email || "No Email"}
            </p>

            {/* Role Badge */}
            <p
              className={`text-xs uppercase mt-3 px-3 py-1 rounded-full font-semibold shadow-sm
                ${user?.role === "ADMIN"
                  ? "text-red-700 bg-red-100 border border-red-200"
                  : "text-blue-700 bg-blue-100 border border-blue-200"
                }`}
            >
              {user?.role || "User"}
            </p>

            {/* Orders Count */}
            {typeof user?.orders === "number" && (
              <p className="mt-2 text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full shadow-sm">
                Total Orders: {user.orders}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllUsers;
