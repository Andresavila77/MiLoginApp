import { AuthContext } from "@/context/Authcontext";
import { useContext, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atención", "Complete todos los campos.");
      return;
    }

    setIsSubmitting(true);

    const success = await login(email, password);

    setIsSubmitting(false);

    if (!success) {
      Alert.alert(
        "Error",
        "Credenciales inválidas. Revise correo y contraseña."
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezados */}
      <Text style={styles.title}>CampusService</Text>
      <Text style={styles.subtitle}>Acceso Institucional ISER</Text>

      {/* Campo de Email */}
      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail} // Actualiza el estado 'email' con cada tecla
        keyboardType="email-address"
        autoCapitalize="none" // Evita que la primera letra sea mayúscula
      />

      {/* Campo de Contraseña */}
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword} // Actualiza el estado 'password' con cada tecla
        secureTextEntry // Oculta el texto con asteriscos/puntos
      />

      {/* Botón de Ingreso */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isSubmitting} // Si está cargando, el botón no se puede volver a presionar
      >
        {/* Renderizado Condicional: Si carga, muestra el circulito. Si no, dice "Ingresar" */}
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// -- ESTILOS (El "CSS" de React Native) --
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: "#cbd5e1",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#0284c7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});