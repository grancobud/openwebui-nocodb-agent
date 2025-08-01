# 🚀 GUÍA DE CONFIGURACIÓN COMPLETA

## ✅ Estado de los Servicios

Verificar que estén ejecutándose:
- ✅ **N8n**: http://localhost:5680 
- ✅ **NocoDB**: http://localhost:3091
- ✅ **OpenWebUI**: http://localhost:3080

---

## 📋 PASO 1: Configurar N8n

### 1.1 Importar el Workflow

1. Abrir N8n: http://localhost:5680
2. Click en **"New Workflow"**
3. Click en **"Import from File"** (o Ctrl+O)
4. Seleccionar el archivo `workflow-agente-inteligente.json`
5. Click **"Import Workflow"**

### 1.2 Obtener Token de NocoDB

```bash
# Ir a NocoDB: http://localhost:3091
# Settings → App Store → API Tokens → Create Token
# Copiar el token generado
```

### 1.3 Configurar los Nodos HTTP

**En el workflow importado:**

1. Click en nodo **"💾 Escribir en NocoDB"**
2. En **"Authentication"** → **"Header Auth"**
3. **Name**: `xc-token`
4. **Value**: `TU_TOKEN_NOCODB_AQUI` (reemplazar)

5. Click en nodo **"📖 Leer de NocoDB"**
6. Repetir configuración del token

### 1.4 Activar el Workflow

1. Click en **"Active"** (toggle en la esquina superior derecha)
2. Verificar que aparezca en verde ✅

### 1.5 Obtener URL del Webhook

```
URL: http://localhost:5680/webhook/openwebui-chat
```

---

## 📱 PASO 2: Configurar OpenWebUI

### Opción A: Usar Webhooks (Recomendado)

1. Ir a OpenWebUI: http://localhost:3080
2. **Settings** → **Admin Settings** → **Webhook**
3. **URL**: `http://localhost:5680/webhook/openwebui-chat`
4. **Method**: `POST`
5. **Headers**: `Content-Type: application/json`
6. **Enable**: ✅

### Opción B: Usar Functions

1. **Settings** → **Admin Settings** → **Functions**
2. Click **"+ Add Function"**
3. Copiar código de `openwebui-functions.js`
4. **Name**: `Agente NocoDB`
5. **Save** y **Enable**

---

## 🗃️ PASO 3: Verificar NocoDB

### 3.1 Verificar Tabla

```bash
# Ir a: http://localhost:3091
# Base: "Getting Started"
# Tabla: Debería ver datos de inventario
```

### 3.2 Estructura de la Tabla

**Campos requeridos:**
- `Variedad` (Text)
- `Categoria_Producto` (Text)
- `Peso_Neto_g` (Number)
- `Responsable` (Text)
- `Estado` (Text)
- `Usuario_Registro` (Text)
- `Codigo_Trazabilidad_Almacenamiento` (Text)
- `Fecha_Almacenamiento` (Date)
- `Notas` (LongText)

---

## 🧪 PASO 4: Pruebas

### 4.1 Probar Escritura

En OpenWebUI, escribir:
```
Agregar variedad Blue Dream, 35g, responsable Juan
```

**Respuesta esperada:**
```
🎉 ¡Registro creado exitosamente!

📋 Detalles del nuevo registro:
🌿 Variedad: Blue Dream
⚖️ Peso: 35g
👤 Responsable: Juan
...
```

### 4.2 Probar Lectura

En OpenWebUI, escribir:
```
¿Qué hay en almacenamiento?
```

**Respuesta esperada:**
```
📋 Inventario Actual - Almacenamiento

🌿 1. Blue Dream
   📏 Categoría: A Mayor a 2.5 cm
   ⚖️ Peso: 35g
   👤 Responsable: Juan
...
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "No se recibió respuesta"
- ✅ Verificar que N8n esté activo
- ✅ Verificar que el workflow esté activado
- ✅ Revisar logs de N8n

### Error: "401 Unauthorized"
- ✅ Verificar token de NocoDB en los nodos HTTP
- ✅ Regenerar token si es necesario

### Error: "404 Not Found"
- ✅ Verificar URL de NocoDB en los nodos
- ✅ Verificar que la tabla exista

### El agente no entiende comandos
- ✅ Verificar que el mensaje llegue al webhook
- ✅ Revisar logs del nodo "Analizador de Intención"

---

## 📊 MONITOREO

### Verificar Ejecuciones en N8n

1. Ir a **"Executions"** en N8n
2. Ver historial de ejecuciones
3. Click en ejecuciones para ver detalles

### Logs en Docker

```bash
# N8n logs
docker logs gaston-n8n-final -f

# NocoDB logs  
docker logs nocodb-new -f

# OpenWebUI logs
docker logs gaston-openwebui-stable -f
```

---

## ✨ COMANDOS DE EJEMPLO

### Escritura:
- `"Agregar variedad Purple Haze, categoría A, 50g, responsable María"`
- `"Crear registro White Widow, 25 gramos, encargado Carlos"`
- `"Anotar nueva variedad OG Kush, 40g"`

### Lectura:
- `"¿Qué hay en almacenamiento?"`
- `"Mostrar inventario"`
- `"Listar productos"`
- `"¿Cuántos productos hay?"`

---

## 🎯 ¡SISTEMA LISTO!

Tu agente inteligente ya está configurado y funcionando. 

**URLs importantes:**
- 🤖 **OpenWebUI**: http://localhost:3080
- ⚡ **N8n**: http://localhost:5680  
- 🗃️ **NocoDB**: http://localhost:3091
- 📡 **Webhook**: http://localhost:5680/webhook/openwebui-chat

**¡Disfruta tu agente automatizado! 🚀**