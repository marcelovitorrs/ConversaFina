import axios from "axios";
import { db } from "../config/firebase";
import { chatSchema, Chat, ChatMessage } from "../models/chatSchema";
import { translateTextToPortuguese } from "../services/translationService";
import { getUserById } from "./userService";
import firebase from "firebase-admin";

export const processLlamaModel = async (question: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "llama3",
      messages: [{ role: "user", content: question }],
      stream: false,
    });
    return response.data.message.content.trim();
  } catch (error) {
    console.error("Erro ao chamar o LLM:", error);
    throw new Error("Falha ao conectar ao serviço de LLM.");
  }
};

export const processFinanceModel = async (
  question: string
): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "tim2nearfield/finance",
      messages: [{ role: "user", content: question }],
      stream: false,
    });
    console.log(response);

    const aiResponse = response.data.message.content.trim();
    const translatedResponse = await translateTextToPortuguese(aiResponse);

    return translatedResponse;
  } catch (error) {
    console.error("Erro ao chamar o modelo tim2nearfield/finance:", error);
    throw new Error("Falha ao conectar ao serviço de LLM.");
  }
};

export const addMessageToChat = async (
  userId: string,
  question: string,
  answer: string
): Promise<void> => {
  const chatDoc = await db.collection("chats").doc(userId).get();

  let chat: Chat;

  if (!chatDoc.exists) {
    console.log("Chat não encontrado, criando um novo chat para o usuário...");

    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    chat = {
      chatId: userId,
      userId: userId,
      profileType: user.profileType || "basic",
      messages: [],
      createdAt: firebase.firestore.Timestamp.now().toDate(), // Corrigido para Timestamp
      updatedAt: firebase.firestore.Timestamp.now().toDate(), // Corrigido para Timestamp
    };

    await db.collection("chats").doc(userId).set(chat);
  } else {
    const chatData = chatDoc.data();

    if (
      !chatData?.chatId ||
      !chatData?.userId ||
      !chatData?.profileType ||
      !chatData?.createdAt
    ) {
      throw new Error(
        "Chat existente está incompleto. Verifique os campos obrigatórios."
      );
    }

    chat = chatSchema.parse(chatData);
  }

  const newMessage: ChatMessage = {
    question,
    answer,
    createdAt: firebase.firestore.Timestamp.now().toDate(),
  };

  chat.messages.push(newMessage);
  chat.updatedAt = firebase.firestore.Timestamp.now().toDate();
  await db.collection("chats").doc(userId).update(chat);
};

export const getChatByUserId = async (
  userId: string,
  limit: number,
  startAfter: string | null
): Promise<Chat> => {
  const chatDoc = await db.collection("chats").doc(userId).get();

  if (!chatDoc.exists) {
    return {
      chatId: userId,
      userId: userId,
      profileType: "basic",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  const chatData = chatDoc.data();

  if (
    !chatData?.chatId ||
    !chatData?.userId ||
    !chatData?.profileType ||
    !chatData?.createdAt
  ) {
    throw new Error(
      "Chat existente está incompleto. Verifique os campos obrigatórios."
    );
  }

  const messages = chatData.messages || [];

  const messagesWithIsoDates = messages.map((msg: ChatMessage) => {
    let createdAtDate: Date;

    if (msg.createdAt instanceof firebase.firestore.Timestamp) {
      createdAtDate = msg.createdAt.toDate();
    } else if (typeof msg.createdAt === "string") {
      createdAtDate = new Date(msg.createdAt);
    } else if (
      (msg.createdAt as { _seconds?: number; _nanoseconds?: number })
        ._seconds !== undefined
    ) {
      const { _seconds, _nanoseconds } = msg.createdAt as unknown as {
        _seconds: number;
        _nanoseconds: number;
      };
      createdAtDate = new Date(_seconds * 1000 + _nanoseconds / 1e6);
    } else {
      createdAtDate = new Date();
    }

    return {
      ...msg,
      createdAt: createdAtDate.toISOString(),
    };
  });

  const sortedMessages = messagesWithIsoDates.sort(
    (a: ChatMessage, b: ChatMessage) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Retorna o chat completo com todas as mensagens e campos obrigatórios
  return {
    chatId: chatData.chatId,
    userId: chatData.userId,
    profileType: chatData.profileType,
    messages: sortedMessages,
    createdAt: chatData.createdAt instanceof firebase.firestore.Timestamp
      ? chatData.createdAt.toDate()
      : new Date(chatData.createdAt),
    updatedAt: chatData.updatedAt instanceof firebase.firestore.Timestamp
      ? chatData.updatedAt.toDate()
      : new Date(chatData.updatedAt)
  };
};
