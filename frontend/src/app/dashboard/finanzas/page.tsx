import FinancialPlanForm from "@/components/FinancialPlanForm";
import { Sidebar } from "@/components/Sidebar/Sidebar";
// import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

export default function FinanzasPage() {
  return (
    <main className="min-h-screen bg-black">
      <Sidebar />
      <div className="ml-16 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
          
          <FinancialPlanForm />
        </div>
      </div>
    </main>
  );
}
