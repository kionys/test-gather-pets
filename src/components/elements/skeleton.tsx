const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`relative w-full bg-gray-300 overflow-hidden rounded-lg ${className || "h-24"}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
    </div>
  );
};

export default Skeleton;
