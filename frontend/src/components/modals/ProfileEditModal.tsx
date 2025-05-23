import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface ProfileEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProfileEditModal({
  open,
  setOpen,
}: ProfileEditModalProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    repeatPassword: "",
    pais: "",
    idioma: "",
    sobreTi: "",
  });

  useEffect(() => {
    if (open) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setForm({
        nombre: user?.nombre || "",
        apellidos: user?.apellidos || "",
        email: user?.email || "",
        password: "",
        repeatPassword: "",
        pais: user?.pais || "",
        idioma: user?.idioma || "",
        sobreTi: user?.sobreTi || "",
      });
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      ...form,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-100 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-black">
            Actualizar perfil
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nombre</label>
              <div className="relative">
                <Input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Apellidos
              </label>
              <div className="relative">
                <Input
                  name="apellidos"
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder="Apellidos"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Sobre ti
              </label>
              <div className="relative">
                <textarea
                  name="sobreTi"
                  value={form.sobreTi}
                  onChange={handleChange}
                  placeholder="Sobre ti"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600 resize-none text-black"
                />
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contraseña
              </label>
              <div>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Repetir contraseña
              </label>
              <div className="relative">
                <Input
                  name="repeatPassword"
                  type="password"
                  value={form.repeatPassword}
                  onChange={handleChange}
                  placeholder="Repetir contraseña"
                  className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Pais</label>
                <div className="relative">
                  <Input
                    name="pais"
                    value={form.pais}
                    onChange={handleChange}
                    placeholder="País de residencia"
                    className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Idioma
                </label>
                <div className="relative">
                  <Input
                    name="idioma"
                    value={form.idioma}
                    onChange={handleChange}
                    placeholder="Idioma"
                    className="w-full p-2 border-b border-gray-400 bg-transparent focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">
              Guardar cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
