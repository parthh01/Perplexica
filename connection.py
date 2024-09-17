import asyncio
import websockets
import json
import uuid

import urllib.parse



class ChatWebSocket:
    def __init__(self):
        self.ws = None
        self.chat_id = str(uuid.uuid4())
        self.chat_history = []
        self.focus_mode = "webSearch"

    async def connect(self):
        ws_url = "wss://perplexica-864851643051.us-central1.run.app/"
        if not ws_url:
            raise ValueError("WS_URL environment variable is not set")

        chat_model = "GPT-4"
        chat_model_provider = "openai"
        embedding_model = "BGE Small"
        embedding_model_provider = "local"

        params = {
            "chatModel": chat_model,
            "chatModelProvider": chat_model_provider,
            "embeddingModel": embedding_model,
            "embeddingModelProvider": embedding_model_provider
        }

        url = f"{ws_url}?{urllib.parse.urlencode(params)}"

        try:
            print('the url: ',url)
            self.ws = await websockets.connect(url)
            print("WebSocket connection established")
        except Exception as e:
            print(f"Failed to connect: {e}")
            raise

    async def send_message(self, message):
        if not self.ws:
            raise ValueError("WebSocket is not connected")

        message_data = {
            "type": "message",
            "message": {
                "chatId": self.chat_id,
                "content": message
            },
            "focusMode": self.focus_mode,
            "history": self.chat_history + [["human", message]]
        }

        await self.ws.send(json.dumps(message_data))
        print(f"Message sent: {message}")

        # Handle the response
        async for response in self.ws:
            data = json.loads(response)
            if data["type"] == "messageEnd":
                break
            if data["type"] == "error":
                print(f"Error: {data['data']}")
                break
            elif data["type"] in ["sources", "message"]:
                print(f"Received: {data['data']}")
            elif data["type"] == "messageEnd":
                self.chat_history.append(["human", message])
                self.chat_history.append(["assistant", data['data']])
                break

    async def close(self):
        if self.ws:
            await self.ws.close()
            print("WebSocket connection closed")

async def main():
    chat = ChatWebSocket()
    await chat.connect()
    
    try:
        while True:
            message = input("Enter your message (or 'quit' to exit): ")
            if message.lower() == 'quit':
                break
            await chat.send_message(message)
    finally:
        await chat.close()

if __name__ == "__main__":
    asyncio.run(main())
