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
const EMOTION_COLOR = "#FFB74D";

export default function AnsiedadeDetailsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
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

        {/* Título */}
        <View style={styles.titleBox}>
          <Text style={styles.emotionLabel}>Ansiedade</Text>
          <Text style={styles.title}>
            Quando a preocupação vira alerta — e como regulá-la
          </Text>
        </View>

        {/* O que é */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é a ansiedade?</Text>
          <Text style={styles.sectionText}>
            Ansiedade é uma resposta natural do corpo diante de riscos, prazos,
            mudanças e incertezas. Ela nos prepara para agir, planejar e nos
            proteger. Torna-se um problema quando é intensa, constante ou
            aparece mesmo sem motivo claro.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como ela age em nós</Text>
          <Text style={styles.sectionText}>Os efeitos mais comuns são:</Text>
          <Text style={styles.bullet}>
            • Pensamentos acelerados e dificuldade de desligar.
          </Text>
          <Text style={styles.bullet}>
            • Medo de errar, de ser julgado ou de não dar conta.
          </Text>
          <Text style={styles.bullet}>
            • Tensão muscular, aperto no peito, respiração curta.
          </Text>
          <Text style={styles.bullet}>
            • Procrastinação ou hiperprodutividade para compensar.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quando a ansiedade ajuda</Text>
          <Text style={styles.sectionText}>
            Em doses equilibradas, ela pode:
          </Text>
          <Text style={styles.bullet}>
            • Aumentar atenção a detalhes importantes.
          </Text>
          <Text style={styles.bullet}>
            • Motivar planejamento e preparo antes de entregas.
          </Text>
          <Text style={styles.bullet}>
            • Estimular responsabilidade com prazos e qualidade.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quando a ansiedade atrapalha no mundo corporativo
          </Text>
          <Text style={styles.bullet}>
            • Medo constante de feedbacks e reuniões.
          </Text>
          <Text style={styles.bullet}>
            • Dificuldade em dizer “não” e sobrecarga de tarefas.
          </Text>
          <Text style={styles.bullet}>
            • Erros por excesso de pressão interna.
          </Text>
          <Text style={styles.bullet}>
            • Sensação de estar sempre atrasado, mesmo entregando.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Estratégias para lidar com a ansiedade
          </Text>
          <Text style={styles.bullet}>
            • Nomeie o que sente: “Estou ansioso com…” — clareza reduz o peso.
          </Text>
          <Text style={styles.bullet}>
            • Quebre grandes tarefas em etapas pequenas e alcançáveis.
          </Text>
          <Text style={styles.bullet}>
            • Use pausas curtas para respirar profundamente e alongar.
          </Text>
          <Text style={styles.bullet}>
            • Alinhe expectativas com liderança sempre que possível.
          </Text>
          <Text style={styles.bullet}>
            • Evite se comparar o tempo todo com colegas.
          </Text>
          <Text style={styles.bullet}>
            • Busque apoio profissional se a ansiedade for frequente, intensa ou
            paralisar decisões.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ferramentas rápidas para o expediente
          </Text>
          <Text style={styles.bullet}>
            • Técnica 4-4-4: inspire 4s, segure 4s, solte 4s — algumas vezes.
          </Text>
          <Text style={styles.bullet}>
            • Check-in objetivo: “O que REALMENTE é urgente hoje?”
          </Text>
          <Text style={styles.bullet}>
            • Microvitórias: registre pequenas entregas concluídas.
          </Text>
          <Text style={styles.bullet}>
            • Desconectar ao fim do dia: evitar e-mails e mensagens de trabalho
            fora do horário sempre que possível.
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Ansiedade não te define. Com acolhimento, limites claros e apoio,
            ela deixa de comandar seu dia e passa a ser apenas um dos sinais que
            seu corpo usa para pedir cuidado.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8EC",
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
    borderColor: "#FFE0B2",
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
