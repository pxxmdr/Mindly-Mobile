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

import { listarRegistros, type RegistroDiario } from "../services/registros";

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
  const [registroSelecionado, setRegistroSelecionado] =
    useState<RegistroDiario | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await listarRegistros(emailPaciente);
        setRegistros(data);
      } catch (e) {
        console.log("[MINDLY][PSI DETAILS] erro ao carregar registros:", e);
      }
    }
    load();
  }, [emailPaciente]);

  function handleSalvar() {
    if (!registroSelecionado) {
      Alert.alert("Selecione um registro", "Escolha um dia para avaliar.");
      return;
    }

    Alert.alert(
      "Em desenvolvimento",
      "A lógica de salvar avaliação será conectada à API na próxima etapa."
    );
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
        <Text style={styles.subtitle}>Mindly • Acompanhamento</Text>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.description}>
          Visualize o diário emocional do paciente e registre suas observações
          clínicas.
        </Text>

        <FlatList
          data={registros}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 16 }}
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
          renderItem={({ item }) => {
            const isSelected = registroSelecionado?.id === item.id;
            return (
              <TouchableOpacity
                style={[
                  styles.card,
                  isSelected && { borderColor: PRIMARY, borderWidth: 1 },
                ]}
                onPress={() => {
                  setRegistroSelecionado(item);
                  setAvaliacao(item.avaliacaoPsicologo ?? "");
                }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardDate}>
                    {fmtData(item.dataRegistro)}
                  </Text>
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
              </TouchableOpacity>
            );
          }}
        />

        {/* Área de avaliação */}
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackTitle}>Avaliação / feedback</Text>
          <Text style={styles.feedbackHint}>
            Selecione um dia na lista acima e escreva sua análise clínica,
            orientações ou observações.
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
