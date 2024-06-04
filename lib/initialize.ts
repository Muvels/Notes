import PocketBase from "pocketbase"
import { GET_POCKETBASE_BASE_PATH } from "./routing";

export const pbInstance = () : PocketBase => {
    return new PocketBase(GET_POCKETBASE_BASE_PATH());
}

export const ServiceTitle = () : string => {
    return "Archive";
}