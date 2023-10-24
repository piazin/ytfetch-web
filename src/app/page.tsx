import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 ">
      <Header />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-3">
          <Input
            type="url"
            placeholder="Cole sua url do youtube"
            className="outline-none border-purple-700 "
          />
          <Button type="submit" className="bg-purple-700">
            <Download className="mr-2 h-4 w-4" /> Baixar
          </Button>
        </div>
      </div>
    </main>
  );
}
