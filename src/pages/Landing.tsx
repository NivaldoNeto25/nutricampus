import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Stethoscope, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h1 className="text-xl font-extrabold text-primary">🥗 NutriSync</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth"><Button>Entrar</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <section className="text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
            Conecte-se ao seu <span className="text-primary">nutricionista</span> e organize sua rotina alimentar.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Plataforma freemium que aproxima nutricionistas e pacientes com cardápios personalizados, marketplace e chat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/auth?role=user"><Button size="lg">Sou paciente</Button></Link>
            <Link to="/auth?role=nutritionist"><Button size="lg" variant="secondary">Sou nutricionista</Button></Link>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Para Pacientes", desc: "Rotina personalizada por dia da semana, marketplace de nutricionistas e chat direto." },
            { icon: Stethoscope, title: "Para Nutricionistas", desc: "Gestão de pacientes, montador de cardápios e vitrine pública." },
            { icon: ShieldCheck, title: "Admin", desc: "Métricas da plataforma, usuários e assinaturas em um só lugar." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Landing;