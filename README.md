
### Server
# WhatsApp Web JS Server

This is a Node.js server that facilitates the creation of WhatsApp Web sessions using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library. It also serves as a communication bridge between clients and the WhatsApp Web interface.

## Prerequisites

Before running this server, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

Follow these steps to set up and run the server:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. The server will start and listen on port 3002.

## Features

- Create WhatsApp Web sessions programmatically.
- Generate and emit QR codes for session initialization.
- Authenticate and initialize WhatsApp Web sessions.
- Retrieve all chats from the WhatsApp Web interface.

## Usage

1. Connect to the server using a WebSocket client (e.g., a web application).
2. Emit a "createSession" event with a session ID to initiate a WhatsApp Web session.
3. The server will generate a QR code for session initialization.
4. Scan the QR code using a mobile device with WhatsApp installed.
5. Once authenticated, the server will emit a "ready" event to indicate that the session is ready.
6. Clients can then send a "getAllChats" event to retrieve all chats from the WhatsApp Web interface.

 
### Frontend 

# WhatsApp Web JS Client

This is a simple React web application that allows you to create a WhatsApp Web session by scanning a QR code. It uses the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library for interacting with WhatsApp Web. The server is implemented using Node.js, Express, and socket.io.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

Follow these steps to set up and run the application:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the required dependencies for the client:

   ```bash
   cd client
   npm install
   ```

4. Install the required dependencies for the server:

   ```bash
   cd ..
   npm install
   ```

5. Start the server:

   ```bash
   node server.js
   ```

6. Start the client application:

   ```bash
   cd client
   npm start
   ```

7. Open your web browser and go to `http://localhost:3000` to access the WhatsApp Web JS Client.

## Usage

1. Enter a session ID in the input field.
2. Click the "Create Session" button to initiate the WhatsApp Web session.
3. A QR code will be displayed.
4. Open WhatsApp on your mobile device.
5. Tap on the three dots in the upper-right corner and select "WhatsApp Web."
6. Scan the displayed QR code with your mobile device's camera.
7. Once the session is authenticated, you will see the "Get All Chats" button.
8. Click the "Get All Chats" button to retrieve all your chats.

## Features

- Create WhatsApp Web sessions by scanning QR codes.
- Display the QR code for session initialization.
- Retrieve and display all chats after session authentication.
