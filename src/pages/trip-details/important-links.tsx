import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { InfoSkeleton } from "./guests-skeleton";
import { toast } from "sonner";

export interface ImportantLink {
  id?: string;
  title: string;
  url: string;
}

export interface LinksResponseBody {
  links: ImportantLink[];
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);
  const [isLoadingImportantLinks, setIsLoadingImportantLinks] = useState(false);

  useEffect(() => {
    getImportantLinks();
  }, [tripId]);

  const getImportantLinks = async () => {
    if (!tripId) return;

    setIsLoadingImportantLinks(true);

    api.get<LinksResponseBody>(`trips/${tripId}/links`).then((response) => {
      setTimeout(() => {
        setImportantLinks(response.data.links);
        setIsLoadingImportantLinks(false);
      }, 1000);
    });
  };

  const copyLinkToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copiado!");
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {isLoadingImportantLinks && (
          <div className="flex flex-col gap-6">
            <InfoSkeleton />
            <InfoSkeleton />
          </div>
        )}

        {!isLoadingImportantLinks &&
          importantLinks &&
          importantLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>

              <Link2
                className="text-zinc-400 size-5 shrink-0 cursor-pointer hover:text-zinc-200 transition-colors duration-300"
                onClick={() => copyLinkToClipboard(link.url)}
              />
            </div>
          ))}
      </div>

      <Button
        variant="secondary"
        size="full"
        disabled={isLoadingImportantLinks}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
