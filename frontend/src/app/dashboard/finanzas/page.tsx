import FinancialPlanForm from "@/components/FinancialPlanForm";
import { Sidebar } from "@/components/Sidebar";
import ProfileHeader from "@/components/ProfileHeader";

export default function FinanzasPage() {
  return (
    <main className="min-h-screen bg-black">
      <Sidebar />
        <div className="ml-16 p-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold text-black">Calculadora Financiera</h1>
                <ProfileHeader />
            </div>
            {/* Content */}
            <FinancialPlanForm />
            </div>
   
        </div>
      
    </main>
  );
}
