import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import NavBarPsychologistHome from "../components/NavBarPsychologistHome";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

import { listarPacientes, type Paciente } from "../services/pacientes";

type Props = NativeStackScreenProps<RootStackParamList, "PsychologistHome">;

const PRIMARY = "#32D1B0";
const TEXT_DARK = "#1A1A1A";

export default function PsychologistHomeScreen({ navigation }: Props) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await listarPacientes();
        setPacientes(data);
      } catch (e) {
        console.error("[MINDLY][PSI HOME] erro ao listar pacientes:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function abrirDetalhes(paciente: Paciente) {
    navigation.navigate("PsychologistPatientDetails", {
      emailPaciente: paciente.email,
      nome: paciente.nome,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Mindly</Text>
        <Text style={styles.headerSubtitle}>Painel do Psicólogo</Text>
        <Text style={styles.headerDescription}>
          Acesse seus pacientes, acompanhe seus relatos e conduza a evolução
          emocional de cada um.
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Pacientes</Text>

        {loading ? (
          <ActivityIndicator color={PRIMARY} size="large" />
        ) : (
          <FlatList
            data={pacientes}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>
                Nenhum paciente encontrado.
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => abrirDetalhes(item)}
              >
                {/* Avatar */}
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>
                    {item.nome.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.patientName}>{item.nome}</Text>

                  {/* NOVO - Telefone */}
                  <Text style={styles.patientPhone}>📞 {item.telefone}</Text>

                  <Text style={styles.patientEmail}>{item.email}</Text>

                  <Text style={styles.cardHint}>Ver diário emocional →</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <NavBarPsychologistHome active="pacientes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F7",
  },

  headerBox: {
    paddingTop: 55,
    paddingBottom: 35,
    paddingHorizontal: 22,
    backgroundColor: "white",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: PRIMARY,
    textAlign: "left",
  },
  headerSubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: TEXT_DARK,
    marginTop: 4,
  },
  headerDescription: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 16,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },

  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: PRIMARY + "22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY,
  },

  patientName: {
    fontSize: 17,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  patientEmail: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  cardHint: {
    fontSize: 12,
    color: PRIMARY,
    marginTop: 10,
    fontWeight: "600",
  },
  patientPhone: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
    marginBottom: 2,
  },
});
