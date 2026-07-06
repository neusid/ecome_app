import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";


export const getUserCartProducts = async (userId: string) => {

    const cartQuery = query(
        collection(db, "carts"),
        where("id_user", "==", userId)
    );

    const cartSnapshot = await getDocs(cartQuery);

    const result = await Promise.all(
        cartSnapshot.docs.map(async (cartDoc) => {
            const cartData = cartDoc.data();

            const productRef = doc(
                db,
                "products",
                cartData.id_product
            );

            const productSnap = await getDoc(productRef);

            return {
                cartId: cartDoc.id,
                quantity: cartData.quantity,
                product: {
                    id: productSnap.id,
                    ...productSnap.data(),
                },
            };
        })
    );

    return result;
};
