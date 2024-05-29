import { GET_POCKETBASE_BASE_PATH } from "@/lib/routing";
import { BlockNote, UploadTypes } from "./types";
import { deleteFileCall } from "@/calls/DocumentCalls";

export const handleDeletedNotes = async (deletedNotes: BlockNote[]) => {
  console.log("Deleted:", deletedNotes);
  for (const note of deletedNotes) {
    if(!(UploadTypes.includes(note.type)))
      continue;

    const identifier = getIdent(note.props.url)
    await deleteFileCall(identifier);
    

  }


}

const getIdent = (url: string) => {
  const ident = url.replace(`${GET_POCKETBASE_BASE_PATH()}/api/files/`, '');
  const splittedIdent = ident.split("/");
  return {
    bucket: splittedIdent[0],
    record: splittedIdent[1],
    identifier: splittedIdent[2],
  }
}

