import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import client from "@/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { Button } from "@/theme/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/theme/components/ui/table";
import { Skeleton } from "@/theme/components/ui/skeleton";
import { Badge } from "@/theme/components/ui/badge";
import { Tooltip } from "@/theme/components/ui/tooltip";
import { Download, Search, X } from "lucide-react";

type Location = {
  _id: string;
  address: string;
  zipCode: string;
  confirmLocation: string;
  createdAt: string;
  userId?: { _id?: string; name?: string; email?: string } | string | null;
};

const fetchAllLocations = async (): Promise<{ locations: Location[] } | Location[]> => {
  const res = await client.get("/api/location/admin/locations");
  return res.data;
};

export default function AllLocations() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-locations"],
    queryFn: fetchAllLocations,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const locationsArray: Location[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as Location[];
    if ((data as any).locations) return (data as any).locations as Location[];
    return [];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locationsArray;
    return locationsArray.filter((loc) => {
      const userName = typeof loc.userId === "object" ? (loc.userId?.name || "") : "";
      return (
        userName.toLowerCase().includes(q) ||
        (loc.address || "").toLowerCase().includes(q) ||
        (loc.zipCode || "").toLowerCase().includes(q) ||
        (loc.confirmLocation || "").toLowerCase().includes(q)
      );
    });
  }, [query, locationsArray]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

  const exportCSV = () => {
    const rows = paginated.map((loc) => ({
      id: loc._id,
      user: typeof loc.userId === "object" ? loc.userId?.name : "",
      email: typeof loc.userId === "object" ? loc.userId?.email : "",
      address: loc.address,
      zipCode: loc.zipCode,
      confirmLocation: loc.confirmLocation,
      date: new Date(loc.createdAt).toLocaleDateString(),
      time: new Date(loc.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }));

    const csv = [
      Object.keys(rows[0] || {}).join(","),
      ...rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `locations_page_${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <Card className="w-full">
        {/* Header with search + actions */}
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title + subtitle */}
          <div className="flex flex-col">
            <CardTitle>All Saved Locations</CardTitle>
            <p className="text-sm text-muted-foreground">
              Recent user delivery locations — sorted newest first
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Input
                placeholder="Search by user, address or zip"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-10 w-full"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={16} />
              </div>
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Export */}
            <Tooltip>
              <span slot="content">Export visible page to CSV</span>
              <Button variant="outline" className="w-full sm:w-auto" onClick={exportCSV}>
                <Download className="mr-2" size={16} /> Export
              </Button>
            </Tooltip>

            {/* Refresh */}
            <Button variant="ghost" className="w-full sm:w-auto" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
        </CardHeader>


        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-8 w-36 rounded-md" />
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="py-8 text-center">
              <p className="text-red-600 mb-2">Failed to load locations.</p>
              <Button onClick={() => refetch()}>Try again</Button>
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-2">No locations found.</p>
              <p className="text-sm">Try changing search or refresh the list.</p>
            </div>
          ) : (
            <>
              {/* TABLE (xl and up) */}
              <div className="hidden xl:block overflow-x-auto">
                <Table>
                  <TableCaption>
                    Showing {paginated.length} of {total} locations
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-56">User</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Zip Code</TableHead>
                      <TableHead>Confirm Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((loc) => {
                      const dateObj = new Date(loc.createdAt);
                      const date = dateObj.toLocaleDateString();
                      const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                      const userName = typeof loc.userId === "object" ? loc.userId?.name : "Unknown";
                      return (
                        <TableRow key={loc._id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{userName}</span>
                              <span className="text-xs text-muted-foreground">
                                {typeof loc.userId === "object" ? loc.userId?.email : ""}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs break-words">{loc.address}</TableCell>
                          <TableCell>{loc.zipCode}</TableCell>
                          <TableCell className="max-w-xs break-words">{loc.confirmLocation}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{date}</Badge>
                          </TableCell>
                          <TableCell>{time}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* CARDS (below xl) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
                {paginated.map((loc) => {
                  const dateObj = new Date(loc.createdAt);
                  const date = dateObj.toLocaleDateString();
                  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  const userName = typeof loc.userId === "object" ? loc.userId?.name : "Unknown";
                  return (
                    <Card key={loc._id} className="p-4">
                      <div className="mb-2">
                        <p className="font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {typeof loc.userId === "object" ? loc.userId?.email : ""}
                        </p>
                      </div>
                      <p className="text-sm"><span className="font-semibold">Address:</span> {loc.address}</p>
                      <p className="text-sm"><span className="font-semibold">Zip:</span> {loc.zipCode}</p>
                      <p className="text-sm"><span className="font-semibold">Confirm:</span> {loc.confirmLocation}</p>
                      <p className="text-sm"><span className="font-semibold">Date:</span> {date}</p>
                      <p className="text-sm"><span className="font-semibold">Time:</span> {time}</p>
                    </Card>
                  );
                })}
              </div>

              {/* CARDS (sm & md) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                {paginated.map((loc) => {
                  const dateObj = new Date(loc.createdAt);
                  const date = dateObj.toLocaleDateString();
                  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  const userName = typeof loc.userId === "object" ? loc.userId?.name : "Unknown";
                  return (
                    <Card key={loc._id} className="p-4">
                      <div className="mb-2">
                        <p className="font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {typeof loc.userId === "object" ? loc.userId?.email : ""}
                        </p>
                      </div>
                      <p className="text-sm"><span className="font-semibold">Address:</span> {loc.address}</p>
                      <p className="text-sm"><span className="font-semibold">Zip:</span> {loc.zipCode}</p>
                      <p className="text-sm"><span className="font-semibold">Confirm:</span> {loc.confirmLocation}</p>
                      <p className="text-sm"><span className="font-semibold">Date:</span> {date}</p>
                      <p className="text-sm"><span className="font-semibold">Time:</span> {time}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Page {page} of {pageCount}</p>
                <div className="flex items-center gap-2">
                  <Button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
                  <Button disabled={page === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>Next</Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
