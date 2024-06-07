export interface BlockNote {
    id: string
    props: any
    type: string
    content: any[]
    children: BlockNote[]
}

export const UploadTypes = ["image", "database", "video", "audio", "file"];
