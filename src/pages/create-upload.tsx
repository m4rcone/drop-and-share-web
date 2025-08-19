import {
  CircleX,
  Clock,
  FileDown,
  FileWarning,
  LoaderCircle,
  Upload,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { toast } from "sonner";
import { uploadToStorage } from "@/http/upload-to-storage";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router";

export default function CreateUpload() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (fileRejections[0]) {
        toast.warning("Tipo de arquivo não permitido.", {
          duration: 2000,
          icon: <FileWarning width={20} />,
        });

        return;
      }

      try {
        setIsLoading(true);
        const result = await uploadToStorage(acceptedFiles[0]);
        navigate(`/share/${result.id}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error.message, {
          duration: 2000,
          icon: <CircleX width={20} />,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <div className="flex flex-row justify-center items-center gap-2">
          <Clock size={16} />
          <p className="italic">Sua imagem ficará disponível por 24 horas</p>
        </div>
        <div className="border-2 rounded-md p-2 w-full sm:w-[640px]">
          {isLoading && (
            <div className="flex flex-col justify-center items-center gap-4 px-6 py-16 sm:px-12 animate-pulse">
              <LoaderCircle size={48} className="animate-spin" />
              <p className="font-semibold">Enviando, por favor aguarde..</p>
            </div>
          )}
          {!isLoading && (
            <div
              {...getRootProps()}
              data-active={isDragActive}
              className="cursor-pointer border-2 border-dashed rounded-md px-6 py-16 sm:p-16  data-[active=true]:border-indigo-500 data-[active=true]:bg-indigo-500/10"
            >
              <input {...getInputProps()} type="file" />
              {isDragActive ? (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <FileDown size={48} />
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="font-semibold">Solte o arquivo aqui</p>
                    <p className="text-sm">JPEG, JPG, PNG, GIF ou WEBP</p>
                    <p className="text-sm">Tamanho máximo do arquivo: 2 MB</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <Upload size={48} />
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="font-semibold text-center hidden sm:block">
                      Arraste e solte ou selecione um arquivo
                    </p>
                    <p className="font-semibold text-center sm:hidden">
                      Selecione um arquivo
                    </p>
                    <p className="text-sm">JPEG, JPG, PNG, GIF ou WEBP</p>
                    <p className="text-sm">Tamanho máximo do arquivo: 2 MB</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
