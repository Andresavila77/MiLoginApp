import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import { AuthContext } from "@/context/Authcontext";
import { AppStack } from "@/navigation/AppStack";
import { LoginScreen } from "@/screens/loginScreen";

export const RootNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0f172a",
        }}
      >
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <LoginScreen />}
    </NavigationContainer>
  );
};
