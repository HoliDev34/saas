import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard.</p>
        </div>
      </div>
    </div>
  );
}
