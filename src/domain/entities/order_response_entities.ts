import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Orders } from "./orders_entities";

export interface GetOrderResponse {
    orders: Orders[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}