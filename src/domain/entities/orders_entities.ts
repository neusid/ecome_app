import { Timestamp } from "firebase/firestore";

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Orders {
    id: string;
    created_at: Timestamp;
    id_user: string;
    products: OrderItem[];
    status: string;
    total_price: number;
}

