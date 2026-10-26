import { AuthContext } from "@/context/Authcontext";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HomeScreen = () => { 
  // Extraemos al 'user' (para mostrar su correo) y 'logout' (la función para salir)
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido al sistema!</Text>

      {/* Mostramos el email del usuario sacado directamente del contexto global */}
      <Text style={styles.subtitle}>Estás conectado como: {user?.email}</Text>

      {/* Botón que ejecuta la función de cerrar sesión */}
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#ef4444", // Color rojo para indicar "salir"
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});