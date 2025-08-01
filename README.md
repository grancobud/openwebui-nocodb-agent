# 🤖 Agente OpenWebUI ↔ NocoDB

Un agente inteligente que conecta **OpenWebUI** con **NocoDB** para automatizar la escritura y lectura de datos mediante **N8n**.

## 🚀 Características

- ✅ **Escritura automática**: Extrae datos de mensajes naturales y los guarda en NocoDB
- ✅ **Lectura inteligente**: Consulta y formatea datos de forma ordenada
- ✅ **Procesamiento en español**: Entiende comandos en lenguaje natural
- ✅ **Códigos de trazabilidad**: Genera automáticamente códigos únicos
- ✅ **Manejo de errores**: Respuestas informativas ante fallos

## 🏗️ Arquitectura

```
OpenWebUI → Webhook → N8n → NocoDB
    ↑                        ↓
    ←── Respuesta Formateada ←──
```

## 📋 Requisitos

- **N8n** ejecutándose en puerto 5680
- **NocoDB** ejecutándose en puerto 3091  
- **OpenWebUI** ejecutándose en puerto 3080

## ⚡ Instalación Rápida

### 1. Importar workflow en N8n

1. Abrir N8n: http://localhost:5680
2. Click en "Import from File"
3. Seleccionar `workflow-agente-inteligente.json`
4. **Configurar token NocoDB** en los nodos HTTP Request
5. Activar el workflow

### 2. Configurar OpenWebUI

1. Ir a Settings → Admin Settings → Webhook
2. Agregar URL: `http://localhost:5680/webhook/openwebui-chat`
3. Método: POST

## 🎯 Uso

### Escribir datos:
- *"Agregar variedad Blue Dream, 35g, responsable Juan"*
- *"Crear registro Purple Haze, categoría A, 50 gramos"*
- *"Anotar White Widow, 25g, encargado María"*

### Leer datos:
- *"¿Qué hay en almacenamiento?"*
- *"Mostrar inventario"*
- *"Listar productos"*

## 🔧 Configuración Avanzada

Ver archivos de configuración en este repositorio:
- `workflow-agente-inteligente.json` - Workflow completo
- `openwebui-functions.js` - Funciones para OpenWebUI
- `nocodb-setup.sql` - Script de configuración de base de datos

## 📊 Estadísticas

El agente automáticamente calcula:
- Peso total por variedad
- Conteo de productos por estado
- Códigos de trazabilidad únicos
- Fechas de almacenamiento

---

**🎉  ¡Tu agente inteligente está listo para trabajar!**