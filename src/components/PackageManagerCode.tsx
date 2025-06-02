import { useState } from "react";
import { Copy } from "lucide-react";

type PackageManagersProps = {
  commands: Record<string, string>;
};

const PackageManagers = ({ commands }: PackageManagersProps) => {
  const [active, setActive] = useState(Object.keys(commands)[0]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[active]);
  };

  return (
    <div className="bg-[#111] text-white rounded-lg overflow-hidden w-full max-w-xl shadow-lg font-mono text-sm">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {Object.keys(commands).map((pm) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`px-4 py-2 transition-all ${
              active === pm
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-gray-400"
            }`}
          >
            {pm}
          </button>
        ))}
        <button
          onClick={copyToClipboard}
          className="ml-auto px-4 py-2 text-gray-400 hover:text-white"
          title="Copy"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Code Block */}
      <div className="px-4 py-3 bg-zinc-800">
        <code className="block whitespace-pre">{commands[active]}</code>
      </div>
    </div>
  );
};

export default PackageManagers;
