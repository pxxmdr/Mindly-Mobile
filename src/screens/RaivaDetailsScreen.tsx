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
const EMOTION_COLOR = "#E57373";

export default function RaivaDetailsScreen() {
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
          <Text style={styles.emotionLabel}>Raiva</Text>
          <Text style={styles.title}>
            Transformando a raiva em assertividade e ação consciente
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é a raiva?</Text>
          <Text style={styles.sectionText}>
            A raiva é uma emoção de defesa — ela aparece quando sentimos que
            algo injusto aconteceu, que nossos limites foram invadidos ou que
            algo que valorizamos foi ameaçado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como ela age em nós</Text>
          <Text style={styles.sectionText}>
            No corpo, a raiva acelera o batimento cardíaco e prepara o corpo pra
            agir. Na mente, ela busca justiça, correção e respeito.
          </Text>
          <Text style={styles.bullet}>• Pode gerar energia e foco.</Text>
          <Text style={styles.bullet}>
            • Ajuda a defender ideias e valores.
          </Text>
          <Text style={styles.bullet}>
            • Quando mal gerida, se torna explosiva e destrutiva.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Potencial da raiva no ambiente corporativo
          </Text>
          <Text style={styles.bullet}>
            • Impulsiona mudanças e resolução de problemas.
          </Text>
          <Text style={styles.bullet}>
            • Estimula senso de justiça e ética no time.
          </Text>
          <Text style={styles.bullet}>
            • Pode fortalecer posicionamento e liderança.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quando a raiva se torna um risco
          </Text>
          <Text style={styles.bullet}>
            • Comunicação agressiva e perda de credibilidade.
          </Text>
          <Text style={styles.bullet}>• Clima tenso e inseguro na equipe.</Text>
          <Text style={styles.bullet}>
            • Impulsividade em decisões importantes.
          </Text>
          <Text style={styles.bullet}>
            • Dificuldade de escutar e negociar.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Como lidar com a raiva de forma saudável
          </Text>
          <Text style={styles.bullet}>
            • Reconheça o gatilho: o que despertou sua raiva?
          </Text>
          <Text style={styles.bullet}>
            • Pause antes de reagir — respiração e movimento ajudam a dissipar o
            excesso de energia.
          </Text>
          <Text style={styles.bullet}>
            • Converta a emoção em diálogo assertivo: “Me incomoda quando...”
          </Text>
          <Text style={styles.bullet}>
            • Transforme em ação produtiva: proponha soluções, não apenas
            críticas.
          </Text>
          <Text style={styles.bullet}>
            • Se a raiva é frequente, busque entender padrões e conversar com um
            terapeuta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Práticas rápidas no trabalho</Text>
          <Text style={styles.bullet}>
            • Dê um tempo antes de responder e-mails ou mensagens tensas.
          </Text>
          <Text style={styles.bullet}>
            • Caminhe por 2 minutos ou mude o ambiente físico.
          </Text>
          <Text style={styles.bullet}>
            • Escreva o que sente antes de falar — clareza vem da pausa.
          </Text>
          <Text style={styles.bullet}>
            • Use a energia da raiva pra defender ideias construtivas.
          </Text>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Raiva não é inimiga — é um lembrete de que algo importa pra você.
            Quando acolhida e canalizada, vira coragem, clareza e ação ética.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF5F5",
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
    borderColor: "#FAD4D4",
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
