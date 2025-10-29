export default function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-br from-neon-green to-neon-cyan p-2 rounded-full overflow-hidden">
          <img 
            src="https://i.postimg.cc/BbQLQZdk/IMG-20251029-153417-839.jpg" 
            alt="Logo" 
            className="w-7 h-7 object-cover"
          />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple bg-clip-text text-transparent animate-float">
        CHARING TOOL
      </h1>
    </div>
  );
}