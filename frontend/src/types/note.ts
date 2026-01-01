export interface Note {
    id: string;
    content: string;
    type: "text" | "video";
    timestamp: Date;
    videoId?: string;
}
