import { GetOrderResponse } from "@/domain/entities/order_response_entities";
import { Orders } from "@/domain/entities/orders_entities";
import { ProductCartEntities, ProductEntities } from "@/domain/entities/product_entities";
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, startAfter, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export interface Product {
    id: string;
    product_name: string;
    product_description: string;
    product_price: number;
    product_stock: number;
}

export interface ProductCart {
    id: string;
    id_user: string;
    product: Product;
    quantity: number;
}

export const getData = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
    }));
};

export const addToCart = async (product: ProductEntities, userId: string) => {
    if (!userId) return;

    const q = query(
        collection(db, "carts"),
        where("id_user", "==", userId),
        where("product.id", "==", product.id)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const cartDoc = snapshot.docs[0];
        const quantity = cartDoc.data().quantity;

        await updateDoc(cartDoc.ref, {
            quantity: quantity + 1,
        });

        return;
    }

    await addDoc(collection(db, "carts"), {
        id_user: userId,
        product,
        quantity: 1,
    });
};

export const GetCart = async (userId: string): Promise<ProductCartEntities[]> => {
    const q = query(
        collection(db, "carts"),
        where("id_user", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ProductCartEntities, "id">),
    }));
};

export const GetSingleCart = async (userId: string, productId: string): Promise<ProductCartEntities | undefined> => {
    const q = query(
        collection(db, "carts"),
        where("id_user", "==", userId),
        where("product.id", "==", Number(productId))
    );

    const snapshot = await getDocs(q);

    const firstDoc = snapshot.docs[0]
    if (!firstDoc) return undefined;

    return {
        id: firstDoc.id,
        ...(firstDoc.data() as Omit<ProductCartEntities, "id">)
    };
}

export const increaseCart = async (id: string, quantityOld: number) => {
    const cartRef = doc(db, "carts", id);

    await updateDoc(cartRef, {
        quantity: quantityOld + 1,
    });
};

export const CheckoutCart = async (userId: string, carts: ProductCartEntities[]) => {
    if (!userId || carts.length === 0) return;

    const totalPrice = carts.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    );

    await addDoc(collection(db, "orders"), {
        id_user: userId,
        products: carts.map((item) => ({
            product: item.product,
            quantity: item.quantity,
        })),
        total_price: totalPrice,
        created_at: new Date(),
        status: "pending",
    });

    await Promise.all(
        carts.map((item) =>
            deleteDoc(doc(db, "carts", item.id))
        )
    );
};

export const deleteCart = async (id: string, quantityOld: number) => {
    const cartRef = doc(db, "carts", id);

    if (quantityOld <= 1) {
        await deleteDoc(cartRef);
        return;
    }

    await updateDoc(cartRef, {
        quantity: quantityOld - 1,
    });
};

export const batchUpdateCart = async (changes: { id: string; quantity: number }[]) => {
    if (changes.length === 0) return;

    const batch = writeBatch(db);

    for (const { id, quantity } of changes) {
        const ref = doc(db, "carts", id);

        if (quantity <= 0) {
            batch.delete(ref);
        } else {
            batch.update(ref, { quantity });
        }
    }

    await batch.commit();
};

export const GetOrder = async (userId: string, lastPage: QueryDocumentSnapshot<DocumentData> | undefined): Promise<GetOrderResponse> => {
    let q;

    if (lastPage == undefined) {
        q = query(
            collection(db, "orders"),
            where("id_user", "==", userId),
            limit(10),
        );
    } else {
        q = query(
            collection(db, "orders"),
            where("id_user", "==", userId),
            limit(10),
            startAfter(lastPage)
        );
    }

    const snapshot = await getDocs(q);

    return {
        orders: snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Orders, "id">),
        })),
        lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null
    };
}

export const GetSingleOrder = async (
    orderId: string
): Promise<Orders | null> => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data())
    if (!docSnap.exists()) return null;

    console.log(docSnap.data())

    return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Orders, "id">),
    };
};

export const deleteSingleCart = async (id: string) => {
    if (!id) return;

    const docRef = doc(db, "carts", id);
    await deleteDoc(docRef);
};

export const batchDeleteCart = async (ids: string[]) => {
    if (ids.length === 0) return;

    const batch = writeBatch(db);
    ids.forEach((id) => {
        batch.delete(doc(db, "carts", id));
    });

    await batch.commit();
};

export const batchDeleteOrder = async (ids: string[]) => {
    if (ids.length === 0) return;

    const batch = writeBatch(db);
    ids.forEach((id) => {
        batch.delete(doc(db, "orders", id));
    });

    await batch.commit();
};