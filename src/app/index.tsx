import { AuthProvider } from "@/context/Authcontext";
import { RootNavigator } from "@/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}