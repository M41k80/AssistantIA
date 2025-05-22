import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface ProfileEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProfileEditModal({ open, setOpen }: ProfileEditModalProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    repeatPassword: "",
    pais: "",
    idioma: "",
    sobreTi: ""
  });

  useEffect(() => {
    if (open) {
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      setForm({
        nombre: user?.nombre || "",
        apellidos: user?.apellidos || "",
        email: user?.email || "",
        password: "",
        repeatPassword: "",
        pais: user?.pais || "",
        idioma: user?.idioma || "",
        sobreTi: user?.sobreTi || ""
      });
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedUser = { ...JSON.parse(localStorage.getItem("user") || '{}'), ...form };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">Actualizar perfil</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
            <Input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellidos" />
          </div>
          <Input name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" />
          <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
          <Input name="repeatPassword" type="password" value={form.repeatPassword} onChange={handleChange} placeholder="Repetir contraseña" />
          <Input name="pais" value={form.pais} onChange={handleChange} placeholder="País de residencia" />
          <Input name="idioma" value={form.idioma} onChange={handleChange} placeholder="Idioma" />
          <textarea name="sobreTi" value={form.sobreTi} onChange={handleChange} placeholder="Sobre ti / Empleo" className="w-full border border-gray-300 rounded-md p-2 text-sm" />
          <Button onClick={handleSubmit} className="w-full">Guardar cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}