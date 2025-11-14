import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarPatient from "../components/NavBarPatient";
import { criarRegistro, atualizarRegistro } from "../services/registros";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const PRIMARY = "#5ED3C6";

export default function PatientFormScreen({ navigation }: any) {
  const route = useRoute<any>();

  const registroEdicao = route.params?.registro;

  const [data, setData] = useState("");
  const [descricaoDia, setDescricaoDia] = useState("");
  const [moodDia, setMoodDia] = useState("");
  const [nivelEstresse, setNivelEstresse] = useState("");
  const [qualidadeSono, setQualidadeSono] = useState("");
  const [atividadeFisica, setAtividadeFisica] = useState(false);
  const [motivoGratidao, setMotivoGratidao] = useState("");

  const [showMoodOptions, setShowMoodOptions] = useState(false);
  const [showStressOptions, setShowStressOptions] = useState(false);
  const [showSleepOptions, setShowSleepOptions] = useState(false);

  const [loading, setLoading] = useState(false);

  const [paciente, setPaciente] = useState<any | null>(null);

  const isEditing = !!registroEdicao;
  const registroId = registroEdicao?.id;

  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        const salvo = await AsyncStorage.getItem("pacienteLogado");
        if (salvo) {
          const parsed = JSON.parse(salvo);
          console.log("[MINDLY][FORM] Paciente carregado:", parsed);
          setPaciente(parsed);
        } else {
          console.log(
            "[MINDLY][FORM] Nenhum paciente encontrado no AsyncStorage"
          );
        }
      } catch (e) {
        console.log("[MINDLY][FORM] ERRO AO LER ASYNC:", e);
      }
    };

    carregarPaciente();
  }, []);

  useEffect(() => {
    if (!registroEdicao) return;

    try {
      const d = new Date(registroEdicao.dataRegistro);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      const dataFormatada = `${dd}/${mm}/${yyyy}`;

      setData(dataFormatada);
      setDescricaoDia(registroEdicao.descricaoDia || "");
      setMoodDia(registroEdicao.moodDoDia || "");
      setNivelEstresse(
        registroEdicao.nivelEstresse != null
          ? String(registroEdicao.nivelEstresse)
          : ""
      );
      setQualidadeSono(
        registroEdicao.qualidadeSono != null
          ? String(registroEdicao.qualidadeSono)
          : ""
      );
      setAtividadeFisica(!!registroEdicao.atividadeFisica);
      setMotivoGratidao(registroEdicao.motivoGratidao || "");
    } catch (e) {
      console.log("[MINDLY][FORM] ERRO AO POPULAR CAMPOS DE EDIÇÃO:", e);
    }
  }, [registroEdicao]);

  const emailPaciente = paciente?.email;

  const handleSubmit = async () => {
    if (!emailPaciente) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar o paciente logado. Faça login novamente."
      );
      return;
    }

    if (!data || data.length !== 10) {
      Alert.alert("Data inválida", "Informe a data no formato dd/mm/aaaa.");
      return;
    }
    if (!descricaoDia.trim() || !moodDia.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha a descrição e o mood do dia."
      );
      return;
    }

    const [dd, mm, yyyy] = data.split("/");
    const dataISO = `${yyyy}-${mm}-${dd}`;

    try {
      setLoading(true);

      if (isEditing && registroId) {

        await atualizarRegistro(registroId, {
          emailPaciente,
          dataRegistro: dataISO,
          descricaoDia: descricaoDia.trim(),
          moodDoDia: moodDia,
          nivelEstresse: Number(nivelEstresse) || 0,
          qualidadeSono: Number(qualidadeSono) || 0,
          atividadeFisica,
          motivoGratidao: motivoGratidao.trim() || null,
        });

        Alert.alert("Registro atualizado 🩵", "Seu dia foi atualizado!");

      } else {
        await criarRegistro({
          emailPaciente,
          dataRegistro: dataISO,
          descricaoDia: descricaoDia.trim(),
          moodDoDia: moodDia,
          nivelEstresse: Number(nivelEstresse) || 0,
          qualidadeSono: Number(qualidadeSono) || 0,
          atividadeFisica,
          motivoGratidao: motivoGratidao.trim() || null,
        });

        Alert.alert("Registro salvo 🩵", "Seu dia foi registrado com sucesso!");
      }

      
      navigation.navigate("PatientHistory", { reloadKey: Date.now() });
    } catch (e: any) {
      console.log("[MINDLY][FORM] ERRO:", e);
      const msg =
        e?.message ||
        "Não foi possível salvar seu registro. Tente novamente mais tarde.";
      Alert.alert("Erro ao salvar", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Diário do paciente</Text>
          </View>
          <Text style={styles.logo}>Mindly</Text>
          <Text style={styles.title}>
            {isEditing ? "Editar registro do dia" : "Como foi seu dia?"}
          </Text>
          <Text style={styles.subtitle}>
            Compartilhe um pouco sobre como você se sentiu hoje — seu bem-estar
            importa pra gente 💭
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Resumo do dia</Text>
            <Text style={styles.sectionIcon}>🗓️</Text>
          </View>

          <Text style={styles.label}>Data do registro (dd/mm/aaaa):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 30/09/2025"
            placeholderTextColor="#9AA3A7"
            keyboardType="numeric"
            value={data}
            onChangeText={(text) => {
              let cleaned = text.replace(/\D/g, "");
              if (cleaned.length > 2 && cleaned.length <= 4) {
                cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
              } else if (cleaned.length > 4) {
                cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(
                  2,
                  4
                )}/${cleaned.slice(4, 8)}`;
              }
              if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
              setData(cleaned);
            }}
            maxLength={10}
          />

          <Text style={styles.label}>Descreva seu dia:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escreva aqui..."
            placeholderTextColor="#9AA3A7"
            value={descricaoDia}
            onChangeText={setDescricaoDia}
            multiline
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emoções</Text>
            <Text style={styles.sectionIcon}>🩵</Text>
          </View>

          <Text style={styles.label}>Mood do dia:</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => {
              setShowMoodOptions((p) => !p);
              setShowStressOptions(false);
              setShowSleepOptions(false);
            }}
            activeOpacity={0.85}
          >
            <Text
              style={moodDia ? styles.selectText : styles.selectPlaceholder}
            >
              {moodDia || "Selecione como você se sentiu"}
            </Text>
            <Text style={styles.selectArrow}>
              {showMoodOptions ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {showMoodOptions && (
            <View style={styles.optionsContainer}>
              {[
                { emoji: "😊", label: "Feliz / leve" },
                { emoji: "😐", label: "Neutro" },
                { emoji: "😔", label: "Triste" },
                { emoji: "😡", label: "Irritado(a)" },
                { emoji: "😰", label: "Ansioso(a)" },
                { emoji: "😴", label: "Cansado(a)" },
              ].map((opt, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.optionItem}
                  onPress={() => {
                    setMoodDia(`${opt.emoji} ${opt.label}`);
                    setShowMoodOptions(false);
                  }}
                >
                  <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Indicadores</Text>
            <Text style={styles.sectionIcon}>📊</Text>
          </View>

          <Text style={styles.label}>Nível de estresse (1 a 5):</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => {
              setShowStressOptions((p) => !p);
              setShowMoodOptions(false);
              setShowSleepOptions(false);
            }}
            activeOpacity={0.85}
          >
            <Text
              style={
                nivelEstresse ? styles.selectText : styles.selectPlaceholder
              }
            >
              {nivelEstresse || "Selecione um nível de estresse"}
            </Text>
            <Text style={styles.selectArrow}>
              {showStressOptions ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {showStressOptions && (
            <View style={styles.optionsContainer}>
              {[1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity
                  key={n}
                  style={styles.optionItem}
                  onPress={() => {
                    setNivelEstresse(String(n));
                    setShowStressOptions(false);
                  }}
                >
                  <Text style={styles.optionLabel}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Qualidade do sono (1 a 5):</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => {
              setShowSleepOptions((p) => !p);
              setShowMoodOptions(false);
              setShowStressOptions(false);
            }}
            activeOpacity={0.85}
          >
            <Text
              style={
                qualidadeSono ? styles.selectText : styles.selectPlaceholder
              }
            >
              {qualidadeSono || "Selecione a qualidade do sono"}
            </Text>
            <Text style={styles.selectArrow}>
              {showSleepOptions ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {showSleepOptions && (
            <View style={styles.optionsContainer}>
              {[1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity
                  key={n}
                  style={styles.optionItem}
                  onPress={() => {
                    setQualidadeSono(String(n));
                    setShowSleepOptions(false);
                  }}
                >
                  <Text style={styles.optionLabel}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.labelSwitch}>
                Fez alguma atividade física?
              </Text>
              <Text style={styles.helperText}>
                caminhada, academia, alongamento…
              </Text>
            </View>
            <Switch
              value={atividadeFisica}
              onValueChange={setAtividadeFisica}
              thumbColor={atividadeFisica ? PRIMARY : "#C9CFD2"}
              trackColor={{ true: "#CFEFE9", false: "#E7ECEE" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gratidão</Text>
            <Text style={styles.sectionIcon}>💫</Text>
          </View>

          <Text style={styles.label}>Motivo de gratidão (opcional):</Text>
          <TextInput
            style={styles.input}
            placeholder="Algo bom que aconteceu hoje…"
            placeholderTextColor="#9AA3A7"
            value={motivoGratidao}
            onChangeText={setMotivoGratidao}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={loading ? undefined : handleSubmit}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            {loading
              ? "Salvando..."
              : isEditing
              ? "Atualizar registro"
              : "Registrar meu dia"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 110 }} />
      </ScrollView>

      <NavBarPatient active="form" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FBFA",
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  hero: { paddingTop: 4, paddingBottom: 8, alignItems: "center" },
  heroBadge: {
    backgroundColor: "#E9FBF7",
    borderColor: "#CBEFE8",
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
    color: "#2E3235",
    textAlign: "center",
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#6A7378",
    textAlign: "center",
    marginTop: 6,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E6F6F3",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { flex: 1, color: "#1E2225", fontSize: 15, fontWeight: "700" },
  sectionIcon: { fontSize: 16, opacity: 0.9 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E3235",
    marginTop: 6,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F5F8F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: "#2E3235",
    borderWidth: 1,
    borderColor: "#E3EAED",
  },
  textArea: { height: 96, textAlignVertical: "top" },
  select: {
    backgroundColor: "#F5F8F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3EAED",
  },
  selectText: { fontSize: 14, color: "#2E3235" },
  selectPlaceholder: { fontSize: 14, color: "#9AA3A7" },
  selectArrow: { fontSize: 12, color: "#7C868B", marginLeft: 8 },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E6EEF1",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  optionEmoji: { fontSize: 16, marginRight: 8 },
  optionLabel: { fontSize: 14, color: "#2E3235" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  labelSwitch: { fontSize: 13, fontWeight: "700", color: "#2E3235" },
  helperText: { fontSize: 12, color: "#7C868B", marginTop: 2 },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 18,
    shadowColor: "#00C4AF",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
