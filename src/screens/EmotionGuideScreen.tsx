import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#5ED3C6";

type EmotionCardProps = {
  emotion: string;
  description: string;
  color: string;
  screenName?: keyof RootStackParamList;
};

const EmotionCard = ({
  emotion,
  description,
  color,
  screenName,
}: EmotionCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
      return;
    }

    Alert.alert(
      emotion,
      "Em breve você verá uma cartilha com orientações práticas sobre como lidar com essa emoção 💚"
    );
  };

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={styles.cardTitle}>{emotion}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Como lidar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function EmotionGuideScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.logo}>Mindly</Text>
        <Text style={styles.title}>Guia de Emoções no Mundo Corporativo</Text>
        <Text style={styles.subtitle}>
          Entenda suas emoções e descubra caminhos mais gentis para lidar com
          cada uma delas, no lado profissional e pessoal.
        </Text>

        <EmotionCard
          emotion="Felicidade"
          description="Momentos de bem-estar, conexão e satisfação. Como manter e reconhecer sem culpa."
          color="#FFD54F"
          screenName="FelicidadeDetails"
        />
        <EmotionCard
          emotion="Tristeza"
          description="Sensação de perda, cansaço emocional ou desânimo. Ela também comunica necessidades importantes."
          color="#64B5F6"
          screenName="TristezaDetails"
        />
        <EmotionCard
          emotion="Raiva"
          description="Emoção ligada a injustiças, limites invadidos ou frustrações. Pode ser força quando bem canalizada."
          color="#E57373"
          screenName="RaivaDetails"
        />
        <EmotionCard
          emotion="Ansiedade"
          description="Preocupação com o futuro, tensão constante, mente acelerada. Dá pra aprender a desacelerar."
          color="#FFB74D"
          screenName="AnsiedadeDetails"
        />
        <EmotionCard
          emotion="Medo"
          description="Emoção de proteção diante de ameaças reais ou percebidas. Importante, mas não precisa te paralisar."
          color="#BA68C8"
          screenName="MedoDetails"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: PRIMARY,
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#777777",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333333",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 10,
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
});
