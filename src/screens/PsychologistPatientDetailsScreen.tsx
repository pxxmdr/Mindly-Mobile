import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import NavBarPsychologist from "../components/NavBarPsychologist";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

import {
  listarRegistros,
  type RegistroDiario,
  type PageRegistros,
} from "../services/registros";
import {
  salvarFeedbackPaciente,
  buscarPacientePorEmail,
} from "../services/pacientes";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PsychologistPatientDetails"
>;

const PRIMARY = "#32D1B0";
const TEXT_DARK = "#333";

export default function PsychologistPatientDetailsScreen({ route }: Props) {
  const { emailPaciente, nome } = route.params;

  const [registros, setRegistros] = useState<RegistroDiario[]>([]);
  const [avaliacao, setAvaliacao] = useState("");
  const [ultimoFeedback, setUltimoFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [page, pacienteInfo] = await Promise.all([
          listarRegistros(emailPaciente), 
          buscarPacientePorEmail(emailPaciente),
        ]);

        const lista =
          page && Array.isArray((page as PageRegistros).content)
            ? (page as PageRegistros).content
            : [];

        console.log(
          "[MINDLY][PSI DETAILS] registros carregados:",
          lista.length
        );

        setRegistros(lista);
        setUltimoFeedback(pacienteInfo.observacao ?? null);
        setAvaliacao("");
      } catch (e) {
        console.log(
          "[MINDLY][PSI DETAILS] erro ao carregar registros/feedback:",
          e
        );
        setRegistros([]);
      }
    }
    load();
  }, [emailPaciente]);

  async function handleSalvar() {
    if (!avaliacao.trim()) {
      Alert.alert("Feedback vazio", "Escreva uma avaliação antes de salvar.");
      return;
    }

    try {
      const texto = avaliacao.trim();
      await salvarFeedbackPaciente(emailPaciente, texto);

      setUltimoFeedback(texto);
      setAvaliacao("");

      Alert.alert(
        "Feedback enviado",
        "O feedback geral foi registrado para este paciente."
      );
    } catch (e: any) {
      console.log("[MINDLY][PSI DETAILS] ERRO AO SALVAR FEEDBACK:", e);
      const msg =
        e?.message ||
        "Não foi possível salvar o feedback agora. Tente novamente mais tarde.";
      Alert.alert("Erro ao salvar feedback", msg);
    }
  }

  function fmtData(data: string) {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return data;
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={registros}
          keyExtractor={(item) => String(item.id)}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListHeaderComponent={
            <>
              <Text style={styles.subtitle}>Mindly • Acompanhamento</Text>
              <Text style={styles.title}>{nome}</Text>
              <Text style={styles.description}>
                Visualize o diário emocional do paciente e registre suas
                observações clínicas gerais.
              </Text>
            </>
          }
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                color: "#777",
                marginTop: 20,
              }}
            >
              Nenhum registro encontrado para este paciente.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>{fmtData(item.dataRegistro)}</Text>
                <Text style={styles.cardMood}>{item.moodDoDia}</Text>
              </View>

              <Text style={styles.cardResumo}>{item.descricaoDia}</Text>

              <Text style={styles.indicatorText}>
                Estresse: {item.nivelEstresse}/5
              </Text>
              <Text style={styles.indicatorText}>
                Sono: {item.qualidadeSono}/5
              </Text>
              <Text style={styles.indicatorText}>
                Atividade Física: {item.atividadeFisica ? "Sim" : "Não"}
              </Text>

              {item.motivoGratidao && (
                <Text style={styles.gratitude}>✨ {item.motivoGratidao}</Text>
              )}
            </View>
          )}
          ListFooterComponent={
            <View style={styles.feedbackBox}>
              {ultimoFeedback && (
                <View style={styles.lastFeedbackBox}>
                  <Text style={styles.lastFeedbackTitle}>
                    Último feedback enviado
                  </Text>
                  <Text style={styles.lastFeedbackText}>
                    {ultimoFeedback}
                  </Text>
                </View>
              )}

              <Text style={styles.feedbackTitle}>
                Nova avaliação / feedback geral
              </Text>
              <Text style={styles.feedbackHint}>
                Escreva aqui uma análise global do paciente, com base em todos
                os registros visualizados acima.
              </Text>

              <TextInput
                style={styles.feedbackInput}
                placeholder="Escreva sua avaliação aqui..."
                multiline
                value={avaliacao}
                onChangeText={setAvaliacao}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                <Text style={styles.saveButtonText}>Salvar avaliação</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <NavBarPsychologist
        active="details"
        detailsParams={{ emailPaciente, nome }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    color: PRIMARY,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 6,
  },
  description: {
    textAlign: "center",
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 13,
    color: "#888",
  },
  cardMood: {
    fontSize: 13,
    fontWeight: "600",
    color: PRIMARY,
  },
  cardResumo: {
    fontSize: 14,
    color: TEXT_DARK,
    marginBottom: 8,
  },
  indicatorText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  gratitude: {
    fontSize: 12,
    color: "#444",
    marginTop: 6,
  },
  feedbackBox: {
    marginTop: 8,
    marginBottom: 16,
  },
  lastFeedbackBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F8F7",
    borderWidth: 1,
    borderColor: "#D7E7E3",
    marginBottom: 10,
  },
  lastFeedbackTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B3A38",
    marginBottom: 4,
  },
  lastFeedbackText: {
    fontSize: 13,
    color: "#4A5A57",
    lineHeight: 19,
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_DARK,
    marginBottom: 4,
  },
  feedbackHint: {
    fontSize: 12,
    color: "#777",
    marginBottom: 8,
  },
  feedbackInput: {
    minHeight: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: PRIMARY,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
