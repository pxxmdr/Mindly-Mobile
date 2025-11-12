import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, Registro } from "../../App";
import NavBarPatient from "../components/NavBarPatient";

const PRIMARY = "#5ED3C6";

type HistoryRouteProp = RouteProp<RootStackParamList, "PatientHistory">;

const registrosMock: Registro[] = [
  {
    id: 1,
    data: "2025-11-10",
    mood: "😊 Feliz / leve",
    descricao: "Dia leve, consegui concluir tudo no trabalho e descansar.",
    nivelEstresse: 2,
    qualidadeSono: 4,
    atividadeFisica: true,
    motivoGratidao: "Consegui entregar meus objetivos.",
  },
  {
    id: 2,
    data: "2025-11-09",
    mood: "😴 Cansado(a)",
    descricao: "Muito cansado, dormi mal e estava sem foco hoje.",
    nivelEstresse: 4,
    qualidadeSono: 2,
    atividadeFisica: false,
    motivoGratidao: "",
  },
];

function accentMint() {
  return "#EAF9F6";
}

export default function PatientHistoryScreen({ navigation }: any) {
  const route = useRoute<HistoryRouteProp>();
  const [records, setRecords] = useState<Registro[]>(registrosMock);

  useEffect(() => {
    const novo = route.params?.newRecord as Registro | undefined;
    if (novo) {
      setRecords((prev) =>
        prev.some((r) => r.id === novo.id) ? prev : [novo, ...prev]
      );
    }
  }, [route.params]);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir registro", "Deseja realmente excluir este dia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setRecords((prev) => prev.filter((r) => r.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Acompanhamento</Text>
          </View>
          <Text style={styles.logo}>Mindly</Text>
          <Text style={styles.title}>Seu histórico emocional</Text>
          <Text style={styles.subtitle}>
            Acompanhe seus registros e perceba sua evolução 🩵
          </Text>
        </View>

        {records.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Sem registros por aqui</Text>
            <Text style={styles.emptyText}>
              Que tal começar adicionando como foi seu dia hoje?
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { marginTop: 10 }]}
              onPress={() => navigation.navigate("PatientForm")}
              activeOpacity={0.9}
            >
              <Text style={styles.addButtonText}>Adicionar novo dia</Text>
            </TouchableOpacity>
          </View>
        )}

        {records.map((item) => {
          const [emoji, ...rest] = item.mood.split(" ");
          const moodLabel = rest.join(" ");
          return (
            <View
              key={item.id}
              style={[styles.cardWrapper, { backgroundColor: accentMint() }]}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.date}>
                    {new Date(item.data).toLocaleDateString("pt-BR")}
                  </Text>

                  <View style={styles.moodChip}>
                    <Text style={styles.moodEmoji}>{emoji || item.mood}</Text>
                    {!!moodLabel && (
                      <Text style={styles.moodText}>{moodLabel}</Text>
                    )}
                  </View>
                </View>

                <Text style={styles.description}>{item.descricao}</Text>

                <View style={styles.statsRow}>
                  <View style={styles.statPill}>
                    <Text style={styles.statLabel}>Estresse</Text>
                    <Text style={styles.statValue}>{item.nivelEstresse}/5</Text>
                  </View>
                  <View style={styles.statPill}>
                    <Text style={styles.statLabel}>Sono</Text>
                    <Text style={styles.statValue}>{item.qualidadeSono}/5</Text>
                  </View>
                  <View style={styles.statPill}>
                    <Text style={styles.statLabel}>Atividade</Text>
                    <Text style={styles.statValue}>
                      {item.atividadeFisica ? "Sim" : "Não"}
                    </Text>
                  </View>
                </View>

                {item.motivoGratidao ? (
                  <View style={styles.gratidaoBox}>
                    <Text style={styles.gratidaoIcon}>✨</Text>
                    <Text style={styles.gratidaoText}>
                      {item.motivoGratidao}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("PatientForm")}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        {records.length > 0 && (
          <TouchableOpacity
            style={[styles.addButton, { marginTop: 14 }]}
            onPress={() => navigation.navigate("PatientForm")}
            activeOpacity={0.9}
          >
            <Text style={styles.addButtonText}>Adicionar novo dia</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      <NavBarPatient active="history" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  hero: { alignItems: "center", paddingTop: 4, paddingBottom: 8 },
  heroBadge: {
    backgroundColor: "#EAF9F6",
    borderColor: "#D6F3EC",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 6,
  },
  heroBadgeText: {
    color: "#2E7E76",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: PRIMARY,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginTop: 2,
  },
  subtitle: { fontSize: 13, color: "#777", textAlign: "center", marginTop: 6 },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E6EEF1",
    alignItems: "center",
    padding: 16,
    marginTop: 14,
  },
  emptyEmoji: { fontSize: 28, marginBottom: 6 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#333" },
  emptyText: { fontSize: 13, color: "#777", textAlign: "center", marginTop: 4 },

  cardWrapper: {
    borderRadius: 14,
    padding: 4,
    marginTop: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E6EEF1",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    fontWeight: "700",
  },

  moodChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8F9",
    borderColor: "#E3EAED",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  moodEmoji: { fontSize: 16, marginRight: 6 },
  moodText: { fontSize: 12, color: "#333", fontWeight: "700" },

  description: {
    color: "#333",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },

  statsRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  statPill: {
    flex: 1,
    backgroundColor: "#F6FAFA",
    borderWidth: 1,
    borderColor: "#E6F2F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  statLabel: { fontSize: 11, color: "#777" },
  statValue: { fontSize: 14, fontWeight: "700", color: "#333" },

  gratidaoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F7F9FA",
    borderWidth: 1,
    borderColor: "#E6EEF1",
    borderRadius: 10,
    padding: 10,
    marginTop: 2,
  },
  gratidaoIcon: { fontSize: 14, marginRight: 6 },
  gratidaoText: { flex: 1, fontSize: 13, color: "#333" },

  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  editButton: { marginRight: 14 },
  editText: { color: PRIMARY, fontWeight: "700" },
  deleteText: { color: "#E53935", fontWeight: "700" },

  addButton: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
