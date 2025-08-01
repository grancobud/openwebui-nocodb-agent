// 🤖 FUNCIONES PARA OPENWEBUI
// Este archivo contiene las funciones necesarias para integrar el agente con OpenWebUI

/**
 * Función para enviar mensajes al webhook de N8n
 * Configura esto en OpenWebUI → Settings → Admin Settings → Functions
 */

const WEBHOOK_URL = "http://localhost:5680/webhook/openwebui-chat";

async function sendToAgent(userMessage, sessionId = null, userId = null) {
  try {
    const payload = {
      user_message: userMessage,
      session_id: sessionId || `session_${Date.now()}`,
      user_id: userId || "user_default",
      timestamp: new Date().toISOString(),
      source: "openwebui"
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.response || "No se recibió respuesta del agente";

  } catch (error) {
    console.error("Error conectando con el agente:", error);
    return `⚠️ Error conectando con el agente: ${error.message}`;
  }
}

/**
 * Función principal del agente
 * Esta función se ejecuta automáticamente cuando el usuario envía un mensaje
 */
async function main(params) {
  const { user_message, session_id, user_id } = params;
  
  // Enviar al agente y obtener respuesta
  const agentResponse = await sendToAgent(user_message, session_id, user_id);
  
  return {
    response: agentResponse,
    success: true
  };
}

/**
 * Configuración alternativa usando webhooks de OpenWebUI
 * Si OpenWebUI tiene soporte nativo para webhooks, usa esta configuración:
 */
const OPENWEBUI_WEBHOOK_CONFIG = {
  enabled: true,
  url: WEBHOOK_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  payload_template: {
    user_message: "{{message}}",
    session_id: "{{session_id}}",
    user_id: "{{user_id}}",
    timestamp: "{{timestamp}}"
  }
};

/**
 * Función de prueba para verificar la conexión
 */
async function testConnection() {
  const testResponse = await sendToAgent("¿Qué hay en almacenamiento?", "test_session", "test_user");
  console.log("Respuesta del agente:", testResponse);
  return testResponse;
}

// Exportar funciones para uso en OpenWebUI
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    main,
    sendToAgent,
    testConnection,
    WEBHOOK_URL,
    OPENWEBUI_WEBHOOK_CONFIG
  };
}