import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileInfoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onEditClick: () => void;
    image: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoModal({ open, setOpen, onEditClick, image, onImageChange }: ProfileInfoModalProps) {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user") || '{}') : {};

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg">Información del perfil</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                    {image ? (
                        <img src={image} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center text-white text-2xl">
                            {user?.nombre?.[0]?.toUpperCase() || "U"}
                        </div>
                    )}
                    <label className="text-sm font-medium cursor-pointer text-blue-600 hover:underline">
                        Cambiar imagen
                        <input type="file" onChange={onImageChange} className="hidden" />
                    </label>
                    <div className="w-full space-y-1">
                        <p><strong>Nombre:</strong> {user?.nombre || "-"}</p>
                        <p><strong>Correo:</strong> {user?.email || "-"}</p>
                        <p><strong>País:</strong> {user?.pais || "-"}</p>
                        <p><strong>Idioma:</strong> {user?.idioma || "-"}</p>
                    </div>
                    <Button onClick={onEditClick} className="w-full">Actualizar perfil</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}


