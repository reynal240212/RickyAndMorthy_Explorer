// components/DNAAnimation.tsx
export function DNAAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
      {/* Cadena de ADN Animada */}
      <div className="flex gap-3 h-48 items-center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col justify-between items-center w-1.5 h-full relative">
            <div 
              className="w-4 h-4 bg-green-400 rounded-full shadow-[0_0_15px_#4ade80] animate-bounce"
              style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}
            />
            <div className="absolute inset-0 flex justify-center py-4">
               <div className="w-[1px] h-full bg-green-500/20" />
            </div>
            <div 
              className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] animate-bounce"
              style={{ animationDelay: `${(i * 0.1) + 0.5}s`, animationDuration: '1s' }}
            />
          </div>
        ))}
      </div>

      <div className="w-64 space-y-4 text-center">
        <div className="space-y-1">
          <p className="text-green-400 font-mono text-xl tracking-tighter animate-pulse">
            📡 ESCANEANDO ADN...
          </p>
          <p className="text-green-900 font-mono text-[10px] uppercase tracking-[0.3em]">
            Dimension-C137 Protocol
          </p>
        </div>
        
        {/* Barra ajustada a 3s */}
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden border border-green-500/20">
          <div className="h-full bg-green-500 animate-[load_3s_linear_forwards]" />
        </div>
      </div>

      <style>{`
        @keyframes load {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}