import { Text, View, Button } from "react-native";
import { useUser } from "@/context/UserContext";
import { revokeToken, removeTokenFromStorage } from "@/lib/utils";

export default function CalandarScreen() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    if (user?.jwtToken)
      await revokeToken(user.jwtToken);

    removeTokenFromStorage();
    setUser(undefined);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl">Calandar Screen</Text>
      <Button
        onPress={async () => {await handleLogout()}}
        title="Logout"
      />
    </View>
  );
}
