import { UploadCloud } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <div className="flex justify-between items-center">
      <a href="/" className="flex justify-center items-center gap-2">
        <UploadCloud size={36} />
        <h1 className="font-semibold text-2xl">Drop&Share</h1>
      </a>
      <ModeToggle />
    </div>
  );
}
