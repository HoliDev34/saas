export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  commands: Command[];
  lastCommandDate: Date | null;
}

export interface Command {
  id: string;
  supplier: Supplier;
  rawMaterials: RawMaterial[];
  date: Date;
  amount: number;
  status: boolean;
}

export interface RawMaterial {
  id: string;
  name: string;
}
