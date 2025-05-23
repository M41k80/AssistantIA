import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEditClick: () => void;
  image: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoModal({
  open,
  setOpen,
  onEditClick,
  image,
  onImageChange,
}: ProfileInfoModalProps) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="bg-gray-100 flex items-center justify-center z-50">
        <div className="bg-gray-100 rounded-lg w-full max-w-md relative p-6 text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-6">
              Información del perfil
            </DialogTitle>
          </DialogHeader>
          <div className="flex">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre
                </label>{" "}
                {user?.nombre || "-"}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Correo electrónico
                </label>{" "}
                {user?.email || "-"}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Pais</label>{" "}
                {user?.pais || "-"}
              </div>
            </div>
            <div>
              {image ? (
                <img
                  src={image}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="ml-6 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center text-white text-2xl">
                    {user?.nombre?.[0]?.toUpperCase() || "U"}
                  </div>
                  <label className="text-sm text-gray-600 hover:text-gray-900">
                    Cambiar Foto
                    <input
                      type="file"
                      onChange={onImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={onEditClick}
              className="w-full py-2 border border-black rounded text-gray-700 hover:bg-gray-50"
            >
              Actualizar perfil
            </button>
            <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
              Cambiar de plan
            </button>
          </div>
          <button className="mt-4 text-red-500 text-sm hover:text-red-700">
            Eliminar cuenta
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
