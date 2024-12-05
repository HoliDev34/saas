import { Archive } from "lucide-react";

export default function Products() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <Archive className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Welcome to your Products page.
          </p>
        </div>
      </div>
    </div>
  );
}
