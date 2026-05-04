import { View, Text } from 'react-native';

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-4">
      <Text className="text-text-primary text-[28px] font-poppins-bold">
        Cochabamba Sin Baches
      </Text>
      <Text className="text-text-secondary text-[14px] mt-2 font-poppins">
        Poppins + NativeWind ✓
      </Text>
      <View className="mt-6 bg-accent rounded-xl px-6 py-3">
        <Text className="text-text-inverse text-[16px] font-poppins-bold">
          Botón de prueba
        </Text>
      </View>
    </View>
  );
}