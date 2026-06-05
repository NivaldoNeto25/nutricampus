import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PublicProfile = () => (
  <div className="grid gap-4 lg:grid-cols-3">
    <Card className="lg:col-span-2">
      <CardHeader><CardTitle>Perfil Público (Vitrine)</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div><Label>Nome de exibição</Label><Input defaultValue="Dra. Marina Alves" /></div>
          <div><Label>Preço por consulta (R$)</Label><Input type="number" defaultValue={180} /></div>
        </div>
        <div><Label>Bio</Label><Textarea rows={4} defaultValue="Nutricionista esportiva com 8 anos de experiência atendendo atletas amadores e profissionais." /></div>
        <div>
          <Label>Especialidades</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Esportiva", "Hipertrofia", "Emagrecimento", "Performance"].map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>
        </div>
        <Button>Salvar alterações</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="text-sm">Pré-visualização</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-extrabold text-primary-foreground">MA</div>
        <div>
          <p className="font-bold">Dra. Marina Alves</p>
          <p className="text-xs text-muted-foreground">Esportiva · Hipertrofia</p>
        </div>
        <div className="text-sm font-extrabold text-primary">R$ 180/consulta</div>
        <Button size="sm" className="w-full">Ver perfil público</Button>
      </CardContent>
    </Card>
  </div>
);

export default PublicProfile;