"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

type AnalyticsItem = {
    id: number;
    shortId: string;
    redirectUrl: string;
    createdAt: string;
    totalClicks: number;
    lastVisitedAt: string | null;
};

type AnalyticsResponse = {
    totals: {
        urls: number;
        clicks: number;
    };
    items: AnalyticsItem[];
};

export default function Analytics(){
    const { data: session, status } = useSession();
    const displayName = 
           session?.user?.name || session?.user?.email?.split("@")[0] || "Friend" ;
    const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (status !== "authenticated") return;
            setIsLoading(true);
            try {
                const response = await fetch("/api/analytics");
                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.error || "Failed to load analytics");
                    return;
                }

                setAnalytics(data);
            } catch {
                toast.error("Something went wrong while loading analytics");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [status]);

    return (
       <div className="mt-12 max-w-5xl mx-auto items-center flex flex-col font-[family-name:var(--font-gloria)] px-4">
         <div>
            <div className=" flex flex-col  justify-center">
                <h1 className="text-3xl md:text-5xl p-2"> Analytics Dashbord </h1>
                {session?.user ? (
                    <h3 className="pl-2 text-sm md:text-xl text-gray-600 mt-4">Hey {displayName}! track your urls & their performance</h3>
                ) : (
                    <h3 className="text-sm md:text-xl text-gray-600 m-2">Sign in to track your URLs and view analytics</h3>
                )}
            </div>
         </div>
         <div className="w-full border-2 mt-10 rounded-2xl border-black overflow-hidden">
            <div className="p-4 md:p-6 border-b border-black/30 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl">Your Shortened URLs ({analytics?.totals.urls ?? 0})</h2>
                <span className="text-sm md:text-lg">Total Clicks: {analytics?.totals.clicks ?? 0}</span>
            </div>

            {status === "unauthenticated" && (
                <div className="p-8 text-center text-gray-600">Please login to view analytics.</div>
            )}

            {status === "authenticated" && isLoading && (
                <div className="p-8 text-center text-gray-600">Loading analytics...</div>
            )}

            {status === "authenticated" && !isLoading && (analytics?.items.length ?? 0) === 0 && (
                <div className="p-8 text-center text-gray-600">No URLs found yet. Create one from Home page.</div>
            )}

            {status === "authenticated" && !isLoading && (analytics?.items.length ?? 0) > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead>
                            <tr className="border-b border-black/30 bg-gray-100 text-left">
                                <th className="p-3 md:p-4">#</th>
                                <th className="p-3 md:p-4">Original URL</th>
                                <th className="p-3 md:p-4">Short URL</th>
                                <th className="p-3 md:p-4">Clicks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics?.items.map((item, index) => (
                                <tr key={item.id} className="border-b border-black/10">
                                    <td className="p-3 md:p-4">{index + 1}</td>
                                    <td className="p-3 md:p-4 max-w-[280px] truncate">{item.redirectUrl}</td>
                                    <td className="p-3 md:p-4 text-green-700">/{item.shortId}</td>
                                    <td className="p-3 md:p-4">
                                        <span className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-full bg-green-700 text-white">
                                            {item.totalClicks}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
         </div>

       </div>
    )
}