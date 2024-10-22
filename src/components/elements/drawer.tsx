// Drawer.tsx
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white transition-transform transform h-[500px] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } rounded-t-2xl shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="text-lg font-semibold">Add Photo</div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            ✖️
          </button>
        </div>
        <div className="flex flex-col">
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
