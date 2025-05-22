import React from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

const TasksManagerPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />

      <div className="ml-16 p-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-black">Mis tareas</h1>

            <ProfileHeader />
          </div>

          {/* Content */}
          <h2 className="text-xl text-black">
            Organizá tus prioridades del día con ayuda de la IA.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TasksManagerPage;
