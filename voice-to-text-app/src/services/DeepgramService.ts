
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

export class DeepgramService {
    private client: any;
    private connection: any;
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.client = createClient(this.apiKey);
    }

    public async connect(onTranscript: (text: string, isFinal: boolean) => void, onError: (err: any) => void) {
        try {
            this.connection = this.client.listen.live({
                model: "nova-2",
                language: "en-US",
                smart_format: true,
            });

            this.connection.on(LiveTranscriptionEvents.Open, () => {
                console.log("Deepgram connection opened");
            });

            this.connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
                const transcript = data.channel.alternatives[0].transcript;
                if (transcript) {
                    onTranscript(transcript, data.is_final);
                }
            });

            this.connection.on(LiveTranscriptionEvents.Error, (err: any) => {
                console.error("Deepgram error:", err);
                onError(err);
            });

            this.connection.on(LiveTranscriptionEvents.Close, () => {
                console.log("Deepgram connection closed");
            });
        } catch (err) {
            onError(err);
        }
    }

    public sendAudio(chunk: Blob) {
        if (this.connection && this.connection.getReadyState() === 1) {
            this.connection.send(chunk);
        }
    }

    public disconnect() {
        if (this.connection) {
            this.connection.finish();
        }
    }
}
