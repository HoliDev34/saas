import { Boxes } from "lucide-react";

export default function RawMaterials() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Boxes className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raw Materials</h1>
          <p className="text-muted-foreground">
            Welcome to your Raw Materials page.
          </p>
        </div>
      </div>
    </div>
  );
}
