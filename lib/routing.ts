export const GET_BASE_PATH = () => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}`;
}

export const GET_POCKETBASE_BASE_PATH = () => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}:8090`;
}

export const GET_IMAGE_BASE_PATH = (bucket: string, record: string, name: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}:8090/api/files/${bucket}/${record}/${name}`;
}