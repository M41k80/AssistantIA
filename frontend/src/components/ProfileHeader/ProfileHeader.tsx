'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { Search, Bell } from 'lucide-react';
import ProfileInfoModal from '@/components/modals/ProfileInfoModal';
import ProfileEditModal from '@/components/modals/ProfileEditModal';

const ProfileHeader = () => {
  const [userName, setUserName] = useState('Usuario');
  const [initials, setInitials] = useState('U');
  const [image, setImage] = useState<string | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const fullName = user?.nombre || 'Usuario';
      setUserName(fullName);
      const init = fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();
      setInitials(init);
      if (user?.image) {
        setImage(user.image);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center space-x-4">
      <button className="text-gray-600 hover:text-gray-900">
        <Search className="w-5 h-5" />
      </button>
      <button className="text-gray-600 hover:text-gray-900">
        <Bell className="w-5 h-5" />
      </button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center space-x-2 rounded-4xl px-2 py-1 bg-gray-100 hover:bg-gray-200 text-4xl">
            {image ? (
              <img
                src={image}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white">
                <span className="text-xs">{initials}</span>
              </div>
            )}
            <span className="text-sm font-medium text-black">{userName}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="bg-white rounded shadow-md p-2 w-48 z-50"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-gray-800"
            onSelect={() => setInfoModalOpen(true)}
          >
            Editar perfil
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
          <DropdownMenu.Item
            className="px-2 py-1 hover:bg-red-100 rounded cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            Cerrar sesión
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ProfileInfoModal
        image={image}
        onImageChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
        open={infoModalOpen} 
        setOpen={setInfoModalOpen} 
        onEditClick={() => {
          setInfoModalOpen(false);
          setEditModalOpen(true);
        }}
      />

      <ProfileEditModal 
        open={editModalOpen} 
        setOpen={setEditModalOpen} 
      />
    </div>
  );
};

export default ProfileHeader;