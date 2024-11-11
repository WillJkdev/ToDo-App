import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskList from "@/components/TaskList";
import Filtros from "@/components/Filtros";
import Inputs from "@/components/Inputs";
import { ThemeProvider } from "@/context/Themes/ThemeProvider";
import { ModeToggle } from "@/components/DarkModeToggle";
import BackGround from "@/components/Background";
import { Toaster } from "@/components/ui/toaster";
import { useTaskToast } from "@/hooks/useTaskToast";
function App() {
  useTaskToast();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BackGround />
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto relative">
          <ModeToggle className="absolute top-4 right-4 z-10" />
          <CardHeader className="flex items-center md:items-start  p-4 pb-0 ">
            <h1 className="md:ml-2 text-2xl font-extrabold">Lista de Tareas</h1>
          </CardHeader>
          <CardContent className="p-4">
            <Inputs />
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <TaskList />
            </ScrollArea>
          </CardContent>
          <CardFooter className="px-4">
            <Filtros />
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
export default App;
