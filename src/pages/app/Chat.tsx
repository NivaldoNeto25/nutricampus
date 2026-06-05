import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const Chat = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl"><MessageCircle className="h-5 w-5 text-primary" /> Chat</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Em breve: conversa direta com o seu nutricionista.</p>
    </CardContent>
  </Card>
);

export default Chat;