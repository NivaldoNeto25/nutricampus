import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

const Marketplace = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl"><Store className="h-5 w-5 text-primary" /> Marketplace</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Em breve: vitrine de nutricionistas com filtros, perfis e solicitações.</p>
    </CardContent>
  </Card>
);

export default Marketplace;