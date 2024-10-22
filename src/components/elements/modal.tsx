"use client";

import { createPortal } from "react-dom";

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000] h-full">
      <dialog className="max-w-5xl max-h-5xl h-auto border-none border-r-[12px] bg-white p-5 relative flex justify-center items-center">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-12 h-12 bg-transparent border-none rounded-2xl cursor-pointer items-center justify-center hover:bg-[#eee]"
        >
          x
        </button>
      </dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
