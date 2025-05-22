import { Sidebar } from "@/components/Sidebar/Sidebar";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import ScrapeResultsViewer from "@/components/ScrapingResults";

export default function ScrapingPage() {
    return (
        <main className="min-h-screen bg-black">
            <Sidebar />
            <div className="ml-16 p-4">
                <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-2xl font-bold text-black">Scraping de Sitios Web</h1>
                        <ProfileHeader />
                    </div>
                    <ScrapeResultsViewer />
                </div>
            </div>
        </main>
    );
}
