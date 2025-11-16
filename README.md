# 📱 Mindly – Aplicativo Mobile de Acompanhamento Emocional
### Front-end Mobile (React Native + Expo)

O **Mindly** é um aplicativo mobile desenvolvido para auxiliar pacientes no acompanhamento de suas emoções e permitir que psicólogos acompanhem, revisem e analisem relatos emocionais de forma organizada e prática, pensado para o meio corporativo e vida pessoal, mantendo assim os pacientes e seus psicológos
mais próximos, mesmo que a distância.

Este repositório contém exclusivamente o **front-end mobile**, desenvolvido com **React Native + Expo**, e conectado a uma API em Java Spring Boot.

---

## 🚀 Funcionalidades

### 👤 Fluxo do Paciente
- Login e cadastro
- Registro diário emocional (humor, estresse, sono, atividade física e gratidão)
- Campo livre para relatar o dia
- Visualização do histórico de registros
- Visualização dos **feedbacks enviados pelo psicólogo**
- Cartilhas de como lidar com as emoções no mundo corporativo e na vida pessoal (Felicidade, tristeza, raiva, ansiedade e medo).
- Armazenamento seguro local com AsyncStorage
- Interface simples, limpa e acolhedora

---

### 🧠 Fluxo do Psicólogo
- Login especial por credencial administrativa
- Tela profissional com lista de pacientes
- Exibição de **nome, e-mail e telefone**
- Acesso ao diário emocional do paciente selecionado
- Envio de **feedback clínico** que retorna ao paciente
- Navegação específica do psicólogo (Home → Detalhes → Logout)

---

### ⚠️ Observação sobre conteúdos sensíveis
O sistema inclui uma simples verificação textual para identificar possíveis termos delicados nos relatos dos pacientes.  
Caso algo seja detectado, apenas um pequeno **indicador visual** aparece no card do paciente, auxiliando o psicólogo a priorizar a leitura.  
(Notificação simples, sem lógica complexa.)

---

## 🛠 Tecnologias Utilizadas

### Mobile
- React Native (Expo)
- TypeScript
- Axios (requisições HTTP)
- AsyncStorage
- React Navigation
- Vector Icons

### Integração
- Consumo da API em Java (Spring Boot)  
- Estrutura preparada para expansão futura
- Repositório de Java: https://github.com/ThamiresRC/Mindly-api

---

## 📁 Estrutura de Pastas (Resumo)

```
/Mindly
assets/
src/
  ├── components/
  ├── screens/
  ├── services/
  ├── App.tsx
  ├── app.json
  └── package.json
```

---

## ▶️ Como Executar o Projeto

### 1️⃣ Instale as dependências
```bash
npm i
```

### 2️⃣ Execute o app
```bash
npm start
```

### 3️⃣ Execute no dispositivo
- Mobile físico (QR Code via Expo Go)
- Emulador Android / iOS

---

## 👥 Integrantes do Projeto

| Nome | RM |
|------|---------|
| **Pedro Henrique Martins dos Reis** | RM555306 |
| **Adonay Rodrigues da Rocha** | RM558782 |
| **Thamires Ribeiro Cruz** | RM558128 |

---

## 📄 Licença
Projeto acadêmico destinado à disciplina de desenvolvimento mobile.  
Uso livre para fins educacionais.

---

## 💙 Agradecimentos
A todos os professores e colegas que contribuíram direta ou indiretamente para o desenvolvimento deste projeto.
