import { TimeLeft } from "@/components/time-left";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { getUpload } from "@/http/get-upload";
import type { Upload } from "@/types/upload";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ClipboardCheck, Download, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function ShareUpload() {
  const params = useParams<{ id: string }>();

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Upload | null>(null);

  useEffect(() => {
    async function fetchUpload() {
      if (!params.id) {
        return;
      }

      try {
        const result = await getUpload(params.id);
        setResult(result);
        checkAvailability(result.expiresAt);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching upload:", err);
      }
    }

    fetchUpload();
  }, [params.id]);

  function checkAvailability(expiresAt: string) {
    const expiresAtDate = new Date(expiresAt);
    const now = new Date();

    if (now > expiresAtDate) {
      setError("Expirou! A imagem não está mais disponível.");
      setResult(null);
    }
  }

  return (
    <>
      <Toaster />
      {error && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="italic text-xl sm:text-2xl text-center">{error}</h1>
        </div>
      )}
      {result && (
        <div className="flex-1 flex flex-col justify-center items-center gap-8">
          <TimeLeft expiresAt={result.expiresAt} />
          <div className="border-2 rounded-md p-2 w-full sm:w-[640px]">
            <AspectRatio ratio={16 / 9}>
              <img
                src={result.url}
                alt="Image uploaded"
                className="w-full h-full object-contain rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="flex justify-center gap-4 items-center">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                const baseUrl = `${window.location.protocol}//${window.location.host}`;
                navigator.clipboard.writeText(`${baseUrl}/share/${result.id}`);
                toast("Copiado para área de transferência.", {
                  duration: 2000,
                  icon: <ClipboardCheck width={20} />,
                });
              }}
            >
              <Link />
              Compartilhar
            </Button>
            <Button variant={"outline"} disabled className="cursor-pointer">
              <Download />
              Baixar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
