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
const EMOTION_COLOR = "#FFD54F";

export default function FelicidadeDetailsScreen() {
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
          <Text style={styles.emotionLabel}>Felicidade</Text>
          <Text style={styles.title}>
            Como aproveitar a felicidade de forma saudável no trabalho
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            O que é a felicidade emocional?
          </Text>
          <Text style={styles.sectionText}>
            A felicidade não é estar animado o tempo todo. É a sensação de
            bem-estar, significado e conexão — momentos em que você sente que
            está onde deveria estar, com pessoas e atividades que fazem sentido
            pra você.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como ela age em nós</Text>
          <Text style={styles.sectionText}>
            Quando estamos felizes, nosso cérebro tende a:
          </Text>
          <Text style={styles.bullet}>• Aumentar foco e criatividade.</Text>
          <Text style={styles.bullet}>
            • Facilitar colaboração com colegas.
          </Text>
          <Text style={styles.bullet}>
            • Tornar desafios mais leves e suportáveis.
          </Text>
          <Text style={styles.bullet}>
            • Melhorar nossa comunicação e empatia.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Vantagens no ambiente profissional
          </Text>
          <Text style={styles.bullet}>
            • Times mais engajados e colaborativos.
          </Text>
          <Text style={styles.bullet}>
            • Maior produtividade com menos esforço exaustivo.
          </Text>
          <Text style={styles.bullet}>
            • Ambiente mais seguro para ideias e feedbacks.
          </Text>
          <Text style={styles.bullet}>
            • Redução de conflitos e clima mais leve.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quando a felicidade vira armadilha
          </Text>
          <Text style={styles.sectionText}>
            A pressão por “estar feliz o tempo todo” pode ser tóxica. No
            trabalho, isso aparece como:
          </Text>
          <Text style={styles.bullet}>
            • Ignorar sinais de cansaço ou adoecimento emocional.
          </Text>
          <Text style={styles.bullet}>
            • Minimizar problemas sérios com frases do tipo “é só pensar
            positivo”.
          </Text>
          <Text style={styles.bullet}>
            • Sentir culpa por não estar bem enquanto todos parecem “ok”.
          </Text>
          <Text style={styles.sectionText}>
            Felicidade saudável não cancela outras emoções. Ela convive com dias
            difíceis.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Como cultivar a felicidade de forma saudável
          </Text>
          <Text style={styles.bullet}>
            • Reconheça pequenas conquistas do dia, não só grandes resultados.
          </Text>
          <Text style={styles.bullet}>
            • Construa relações de confiança com colegas — apoio gera bem-estar
            real.
          </Text>
          <Text style={styles.bullet}>
            • Respeite seus limites físicos e emocionais, mesmo em dias bons.
          </Text>
          <Text style={styles.bullet}>
            • Use momentos de felicidade para organizar, planejar e conversar
            com calma.
          </Text>
          <Text style={styles.bullet}>
            • Busque atividades que façam sentido: aprender algo novo,
            contribuir com o time, ensinar alguém.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Práticas rápidas no trabalho</Text>
          <Text style={styles.bullet}>
            • Antes de começar o dia: liste 1 coisa pela qual você é grato
            naquele emprego.
          </Text>
          <Text style={styles.bullet}>
            • Durante o expediente: reconheça o esforço de alguém do time.
          </Text>
          <Text style={styles.bullet}>
            • Ao encerrar o dia: relembre um momento positivo, por menor que
            seja.
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Felicidade não é obrigação. Ela é um recurso emocional valioso —
            quando acolhida de forma real, fortalece você e o ambiente de
            trabalho.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDF6",
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
    borderColor: "#FFF3C4",
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
