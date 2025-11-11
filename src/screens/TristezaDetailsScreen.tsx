import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const PRIMARY = "#5ED3C6";
const EMOTION_COLOR = "#64B5F6";

export default function TristezaDetailsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>Mindly</Text>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.emotionLabel}>Tristeza</Text>
          <Text style={styles.title}>
            Entendendo a tristeza como um sinal, não uma fraqueza
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é a tristeza?</Text>
          <Text style={styles.sectionText}>
            A tristeza é uma resposta natural a perdas, frustrações, sobrecarga
            e mudanças. Ela sinaliza que algo importa para você — um valor, um
            vínculo, uma expectativa.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como ela age em nós</Text>
          <Text style={styles.sectionText}>Ela pode provocar:</Text>
          <Text style={styles.bullet}>• Queda de energia e motivação.</Text>
          <Text style={styles.bullet}>
            • Pensamentos mais negativos sobre si e o futuro.
          </Text>
          <Text style={styles.bullet}>
            • Vontade de se isolar ou falar menos.
          </Text>
          <Text style={styles.bullet}>• Dificuldade de concentração.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quando a tristeza é funcional</Text>
          <Text style={styles.sectionText}>
            Apesar de desconfortável, a tristeza pode ajudar a:
          </Text>
          <Text style={styles.bullet}>
            • Refletir sobre o que precisa mudar.
          </Text>
          <Text style={styles.bullet}>• Reconhecer limites ultrapassados.</Text>
          <Text style={styles.bullet}>
            • Aproximar pessoas — quando você compartilha o que sente.
          </Text>
          <Text style={styles.bullet}>
            • Dar pausas necessárias antes de decisões importantes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Riscos da tristeza não acolhida no trabalho
          </Text>
          <Text style={styles.bullet}>
            • Queda de desempenho e mais erros por cansaço emocional.
          </Text>
          <Text style={styles.bullet}>
            • Isolamento da equipe e sensação de não pertencimento.
          </Text>
          <Text style={styles.bullet}>
            • Uso de “automático”: fazer tudo só por obrigação.
          </Text>
          <Text style={styles.bullet}>
            • Dificuldade de pedir ajuda ou dar visibilidade das dificuldades.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Como lidar com a tristeza de forma saudável
          </Text>
          <Text style={styles.bullet}>
            • Reconheça: “Hoje não estou bem” — sem se julgar.
          </Text>
          <Text style={styles.bullet}>
            • Quebre o dia em pequenas tarefas possíveis.
          </Text>
          <Text style={styles.bullet}>
            • Procure alguém de confiança (colega, liderança, RH) quando o peso
            estiver maior.
          </Text>
          <Text style={styles.bullet}>
            • Evite mascarar com falas como “tá tudo ótimo” se não estiver.
          </Text>
          <Text style={styles.bullet}>
            • Se a tristeza for constante, intensa ou atrapalhar muito o
            trabalho, procure apoio profissional.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Pequenas práticas no ambiente de trabalho
          </Text>
          <Text style={styles.bullet}>
            • Levante, tome água, mude de ambiente por 2 minutos.
          </Text>
          <Text style={styles.bullet}>
            • Use uma lista reduzida: 1 a 3 prioridades reais no dia.
          </Text>
          <Text style={styles.bullet}>
            • Se possível, alinhe expectativas com a liderança.
          </Text>
          <Text style={styles.bullet}>
            • Após o expediente, faça algo que te conecta: música, leitura,
            conversa segura.
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Sentir tristeza não te torna menos profissional. Ignorá-la, sim,
            pode te afastar de você mesmo, do seu bem-estar e da qualidade do
            seu trabalho.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8FF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  backText: {
    color: "#555555",
    fontSize: 13,
  },
  logo: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY,
    marginRight: 24,
  },
  titleBox: {
    borderLeftWidth: 4,
    borderLeftColor: EMOTION_COLOR,
    paddingLeft: 10,
    marginBottom: 14,
  },
  emotionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: EMOTION_COLOR,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginTop: 2,
  },
  section: {
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    borderColor: "#E3F2FD",
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 13,
    color: "#555555",
    lineHeight: 18,
  },
  bullet: {
    fontSize: 13,
    color: "#555555",
    marginTop: 2,
    lineHeight: 18,
  },
  footerBox: {
    marginTop: 4,
    padding: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
});
