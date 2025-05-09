import { toast } from "sonner";
import { ModeToggle } from "./components/ModeToggle";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <ModeToggle />
      <Button onClick={() => toast("OKK")}>Toast!</Button>
    </div>
  );
};

export default App;
