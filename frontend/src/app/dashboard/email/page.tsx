import EmailGenerator from "@/components/EmailGenerator";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

export default function EmailPage() {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
        <div className="ml-16 p-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold text-black">¡Vamos a crear tu próximo email con IA!</h1>
                <ProfileHeader />
            </div>
    
            {/* Content */}
            <EmailGenerator />;
            </div>
        </div>
      
    </div>
  );
}
