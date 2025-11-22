// src/screens/PatientIaChatScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { gerarSugestaoIA } from "../services/ia";

const PRIMARY = "#5ED3C6";

type Props = NativeStackScreenProps<RootStackParamList, "PatientIaChat">;

type ChatMessage = {
  id: string;
  from: "USER" | "IA";
  text: string;
};

export default function PatientIaChatScreen({ navigation }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        from: "IA",
        text: "Oi! 😊 Como foi seu dia no trabalho? Teve algo que te deixou mais tranquilo(a) ou algo que te estressou mais hoje? Você pode me contar; estou aqui para ajudar no seu bem-estar."
      },
    ]);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      from: "USER",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const iaResponse = await gerarSugestaoIA({
        descricaoDia: trimmed,
        moodDoDia: null,
        nivelEstresse: null,
      });

      const iaMsg: ChatMessage = {
        id: `ia-${Date.now()}`,
        from: "IA",
        text: iaResponse.sugestao,
      };

      setMessages((prev) => [...prev, iaMsg]);
    } catch (e) {
      console.log("[MINDLY][CHAT IA] ERRO:", e);
      const iaMsgErro: ChatMessage = {
        id: `ia-erro-${Date.now()}`,
        from: "IA",
        text: "Não consegui responder agora 😔. Tente novamente em alguns instantes.",
      };
      setMessages((prev) => [...prev, iaMsgErro]);
    } finally {
      setSending(false);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.from === "USER";
    return (
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleIa,
        ]}
      >
        <Text style={isUser ? styles.textUser : styles.textIa}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {/* Cabeçalho simples */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>◀</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Conversa com a Mindly</Text>
            <Text style={styles.headerSubtitle}>Assistente de autocuidado</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {/* Lista de mensagens */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
        />

        {/* Input + botão enviar */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Escreva aqui o que está sentindo..."
            placeholderTextColor="#9AA3A7"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!input.trim() || sending) && { opacity: 0.6 },
            ]}
            onPress={handleSend}
            disabled={!input.trim() || sending}
          >
            <Text style={styles.sendText}>{sending ? "..." : "➤"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FBFA",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EFF1",
    backgroundColor: "#FFFFFF",
  },
  backText: {
    fontSize: 18,
    color: "#4A555A",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E2225",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#7A858B",
  },
  messagesContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexGrow: 1,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  bubbleUser: {
    alignSelf: "flex-end",
    backgroundColor: PRIMARY,
  },
  bubbleIa: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EFF1",
  },
  textUser: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  textIa: {
    color: "#2E3235",
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E4EFF1",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: "#F5F8F9",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#2E3235",
    borderWidth: 1,
    borderColor: "#E3EAED",
  },
  sendButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
