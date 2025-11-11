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
const EMOTION_COLOR = "#BA68C8";

export default function MedoDetailsScreen() {
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
          <Text style={styles.emotionLabel}>Medo</Text>
          <Text style={styles.title}>
            Do alerta à paralisia: como tornar o medo um aliado
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é o medo?</Text>
          <Text style={styles.sectionText}>
            O medo é uma emoção de proteção. Ele surge diante de riscos reais ou
            percebidos e tem a função de te manter em segurança. No trabalho,
            muitas vezes aparece como medo de errar, de ser julgado, de ser
            demitido ou de não ser bom o suficiente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como ele age em nós</Text>
          <Text style={styles.sectionText}>O medo pode:</Text>
          <Text style={styles.bullet}>
            • Aumentar a atenção a ameaças e detalhes.
          </Text>
          <Text style={styles.bullet}>
            • Gerar tensão física, nó na garganta, mãos suadas.
          </Text>
          <Text style={styles.bullet}>
            • Fazer você evitar conversas, decisões ou exposições.
          </Text>
          <Text style={styles.bullet}>
            • Levar à paralisia: “sei o que fazer, mas não consigo agir”.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quando o medo é saudável</Text>
          <Text style={styles.sectionText}>Em equilíbrio, o medo ajuda a:</Text>
          <Text style={styles.bullet}>
            • Calcular riscos antes de uma decisão importante.
          </Text>
          <Text style={styles.bullet}>
            • Preparar melhor apresentações, entregas e projetos.
          </Text>
          <Text style={styles.bullet}>
            • Evitar comportamentos impulsivos ou antiéticos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quando o medo prejudica no mundo corporativo
          </Text>
          <Text style={styles.bullet}>
            • Medo constante de errar → trava iniciativas.
          </Text>
          <Text style={styles.bullet}>
            • Não fazer perguntas por receio de parecer “incompetente”.
          </Text>
          <Text style={styles.bullet}>
            • Aceitar tudo por medo de dizer “não” e se sobrecarregar.
          </Text>
          <Text style={styles.bullet}>
            • Silenciar diante de injustiças ou situações antiéticas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Como lidar com o medo de forma saudável
          </Text>
          <Text style={styles.bullet}>
            • Identifique: “Do que exatamente eu tenho medo aqui?”
          </Text>
          <Text style={styles.bullet}>
            • Questione: esse medo é baseado em fatos ou em suposições?
          </Text>
          <Text style={styles.bullet}>
            • Planeje: prepare-se melhor para conversas, entregas e decisões.
          </Text>
          <Text style={styles.bullet}>
            • Dê pequenos passos em vez de esperar “não ter medo nenhum” para
            agir.
          </Text>
          <Text style={styles.bullet}>
            • Converse com alguém de confiança ou um profissional quando o medo
            for constante e limitante.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ferramentas rápidas no dia a dia
          </Text>
          <Text style={styles.bullet}>
            • Antes de uma reunião difícil: escreva 3 pontos que você quer
            dizer.
          </Text>
          <Text style={styles.bullet}>
            • Em momentos de insegurança: relembre 2 conquistas reais suas.
          </Text>
          <Text style={styles.bullet}>
            • Se o medo de errar travar você: pergunte “qual é o pior cenário
            realista?” e “o que posso fazer se acontecer?”.
          </Text>
          <Text style={styles.bullet}>
            • Separe sua identidade do resultado: errar uma tarefa não te define
            como pessoa.
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Ter medo não te torna fraco; te torna humano. Aprender a dialogar
            com ele, e não obedecê-lo cegamente, é um passo importante para um
            ambiente de trabalho mais seguro e saudável.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F3FF",
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
    borderColor: "#EDE7F6",
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
