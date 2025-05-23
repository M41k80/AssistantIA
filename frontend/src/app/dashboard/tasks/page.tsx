import React from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import { tasks } from "@/lib/tasks";





const getPriorityColor = (priority: "Alta" | "Media" | "Baja"): string => {
  switch (priority) {
    case "Alta":
      return "bg-red-500";
    case "Media":
      return "bg-yellow-400";
    case "Baja":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

const TasksManagerPage = () => {
  return (
    <div className="min-h-screen bg-black flex ">

      <Sidebar />
      <div className="flex-1 p-4 ml-16">

        <div className="bg-white rounded-3xl p-6 shadow-sm min-h-[calc(100vh-1rem)]">
          <div className="flex justify-between items-center mb-2">

            <h1 className="text-2xl font-bold text-black">Mis tareas</h1>
            <ProfileHeader />
          </div>

          <p className="text-black mb-6">
            Organizá tus prioridades del día con ayuda de la IA.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-black">
              <thead className="font-semibold border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2">Evento</th>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Inicio</th>
                  <th className="px-4 py-2">Fin</th>
                  <th className="px-4 py-2">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-2">{task.id}</td>
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.description}</td>
                    <td className="px-4 py-2">{task.start}</td>
                    <td className="px-4 py-2">{task.end}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {task.priority}
                      <span
                        className={`w-3 h-3 rounded-full ${getPriorityColor(
                          task.priority as "Alta" | "Media" | "Baja"
                        )}`}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksManagerPage;
