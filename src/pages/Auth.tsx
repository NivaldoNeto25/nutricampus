import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, User as UserIcon, Stethoscope } from "lucide-react";
import { useAuth, AppRole } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, role, loading: authLoading } = useAuth();

  const initialRole = (params.get("role") as AppRole) || "user";
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupRole, setSignupRole] = useState<AppRole>(initialRole);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && user && role) {
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "nutritionist") navigate("/nutri", { replace: true });
      else navigate("/app", { replace: true });
    }
  }, [user, role, authLoading, navigate]);

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Bem-vindo de volta!");
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name, role: signupRole },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Conta criada! Verifique seu e-mail se necessário.");
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) toast.error("Falha ao entrar com Google");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary px-4 py-8">
      <div className="mx-auto flex max-w-md items-center justify-between mb-6">
        <Link to="/" className="text-lg font-extrabold text-primary">🥗 NutriSync</Link>
        <ThemeToggle />
      </div>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>Entre ou crie sua conta para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onSignIn} className="space-y-3 pt-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={onSignUp} className="space-y-3 pt-4">
                <div className="space-y-1.5">
                  <Label>Tipo de perfil</Label>
                  <RadioGroup value={signupRole} onValueChange={(v) => setSignupRole(v as AppRole)} className="grid grid-cols-2 gap-2">
                    <label className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${signupRole === "user" ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value="user" id="r-user" />
                      <UserIcon className="h-4 w-4" />
                      <span className="text-sm">Paciente</span>
                    </label>
                    <label className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${signupRole === "nutritionist" ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value="nutritionist" id="r-nutri" />
                      <Stethoscope className="h-4 w-4" />
                      <span className="text-sm">Nutricionista</span>
                    </label>
                  </RadioGroup>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email2">E-mail</Label>
                  <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password2">Senha</Label>
                  <Input id="password2" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={busy} className="w-full">
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Criar conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={onGoogle}>Continuar com Google</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;