# Proyecto LiveChat + GPT
> La aplicación puede presentar errores.

## Descripción del Proyecto

Este proyecto es una aplicación de chat en tiempo real muy sencilla desarrollada con **Node.js**, **Express**, **Socket.IO**, y **MongoDB**. Permite la interacción entre usuarios y opcionalmente con un modelo de inteligencia artificial (ChatGPT).

### Características:
- **Chat en tiempo real**: Soporte de múltiples salas de chat con mensajes enviados en tiempo real usando WebSockets.
- **Respuesta automática de ChatGPT**: Al recibir mensajes, el sistema puede enviar respuestas automáticas generadas por un modelo GPT integrado.
- **Manejo de sesiones**: Se gestionan las sesiones de los usuarios.
- **Interfaz sencilla**: La aplicación utiliza `EJS` como motor de plantillas para mostrar las vistas.

### Funciones del usuario logeado
- Acceder a las 4 salas de chat.
- Enviar y recibir mensajes.
- Acceder a su perfil y modificar su nombre de usuario y avatar.
- Acceder al historial de mensajes de la sala.
- Activar la función 'AI' para que mediante la API de ChatGPT obtenga respuesta en el chat.

### API

#### Crear API KEY
- Utilizando POSTMAN o similar

- **ENDPOINT** `POST http://localhost:3000/api/add`
- **BODY raw JSON:**
    ```json
    {
      "apikey": "tu-api-key-aqui"
    }
    ```

#### Enviar un nuevo mensaje
- **ENDPOINT** `POST http://localhost:3000/api/msg/newMessage`
- **Descripción:** Este endpoint permite a los usuarios enviar un nuevo mensaje a una sala específica, no se comprueba si el user existe o no.

- **Estructura de la Solicitud:**

    ##### Body
    La solicitud debe incluir un body en formato JSON con los siguientes parámetros:

    ```json
    {
      "user": "nombre_del_usuario",
      "msg": "contenido_del_mensaje",
      "room": "número_de_sala"
    }
    ```

#### Obtener historial de una sala
- **ENDPOINT** `GET http://localhost:3000/api/msg/:room`

- **Estructura de la Solicitud:**
    ##### Autorization
    - **Key**: Key
    - **Value**: la_key_creada (POST /api/add)

- **Formato de respuesta:** `JSON`

#### Obtener los mensajes de un usuario en una sala concreta
- **ENDPOINT** `GET http://localhost:3000/api/:room/:user`

- **Estructura de la Solicitud:**
    ##### Autorization
    - **Key**: Key
    - **Value**: la_key_creada (POST /api/add)

- **Formato de respuesta:** `JSON`

#### Obtener los mensajes de un usuario
- **ENDPOINT** `GET http://localhost:3000/api/usermsg/:user`

- **Estructura de la Solicitud:**
    ##### Autorization
    - **Key**: Key
    - **Value**: la_key_creada (POST /api/add)

- **Formato de respuesta:** `JSON`
    
## Tecnologías Utilizadas
- **Node.js**
- **Express.js**
- **Socket.IO**
- **MongoDB** 
- **Mongoose**
- **OpenAI GPT**
- **EJS**
- **Sessions**

## Requisitos

- **Node.js** 
- **MongoDB** 
- **Docker** 

## Configuración e Instalación

### 1. Clonar el repositorio

```bash
git clone https://gitlab.com/devluxe/proyecto-chat-gpt
cd proyecto-chat-gpt
docker-compose up -d
npm install
npm run dev
```



