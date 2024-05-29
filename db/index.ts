import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import PocketBase from "pocketbase"
import { getCookieServerSide } from "@/lib/auth"
import {
  FilterOptions,
  FrontendDocuments,
  updatedDocument,
  documents,
  FileObject,
  FileBucket
} from "./types"
import { GET_POCKETBASE_BASE_PATH } from "@/lib/routing";

export const POCKET_BASE_URL = GET_POCKETBASE_BASE_PATH();

export class DatabaseClient {
  client: PocketBase

  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL)
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client
        .collection("users")
        .authWithPassword(email, password)
      console.log("authenticate result:", result)
      if (!result?.token) {
        throw new Error("Invalid email or password")
      }
      return result
    } catch (err) {
      console.error(err)
      throw new Error("Invalid email or password")
    }
  }

  async register(username: string, email: string, password: string, avatar: any) {
    console.log("register", email, password)
    try {
      const result = await this.client.collection("users").create({
        email,
        password,
        avatar,
        username,
        name: username, // TODO: get name from user
        passwordConfirm: password,
      })

      return result
    } catch (err) {}
  }

  async authenticateAdmin(email: string, password: string) {
    try {
      const result = await this.client.admins.authWithPassword(email, password)
      console.log("authenticate result:", result)
      if (!result?.token) {
        throw new Error("Invalid email or password")
      }
      return result
    } catch (err) {
      console.error(err)
      throw new Error("Invalid email or password")
    }
  }

  async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth")
    if (!cookie) {
      return false
    }

    this.client.authStore.loadFromCookie(cookie?.value || "")
    return this.client.authStore.isValid || false
  }

  async getUser() {
    const cookie = getCookieServerSide();
    this.client.authStore.loadFromCookie(cookie || "")

    if (!this.client.authStore.model)
      throw Error("The User is not logged in | There was an unexpected Error");
    return this.client.authStore.model
  }

  // Here The Main Logic Starts

  async createDocument(document: documents) {
    const user = await this.getUser();
    document.userId.push(user.id)
    const record = await this.client.collection('documents').create(document);
    return record;
  }

  async listDocuments(filters: FilterOptions) {
    const records = await this.client.collection('documents').getList(1, 10, {
      ...filters
    });
    return records;
  }

  async getDocument(recordId: string) {
    const record = await this.client.collection('documents').getOne(recordId, {
    });
    return record;
  }

  async updateDocument(document: updatedDocument, recordId: string) {
    await this.getUser();
    const record = await this.client.collection('documents').update(recordId, document);
    return record;
  }

  async deleteDocument(recordId: string) {
    await this.getUser();
    if (await this.client.collection('documents').delete(recordId))
      return;
    throw Error("Delete was not successful");
  }

  async uploadFile(fileObject: FileObject){
    await this.getUser();
    const record = await this.client.collection('documentContentFiles').create(fileObject);
    return record;
  }

  async searchFile(filter: string) {
    await this.getUser();
    const records = await this.client.collection('documentContentFiles').getFirstListItem(filter);
    return records;
  }

  async deleteFile(identifier: FileBucket) {
    if (await this.client.collection('documentContentFiles').delete(identifier.record))
      return;
    throw Error("Delete was not successful");
  }
}

export const db = new DatabaseClient()

export default db