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

export interface Order {
    name: string;
    id_user: string;
    created_at: string;
    products: OrderItem[];
    total_price: number;
    status: "pending" | "paid" | "cancelled" | "completed";
    createTime: string;
    updateTime: string;
}

export interface Orders {
    id: string;
    created_at: CreatedAt;
    id_user: string;
    products: OrderItem[];
    status: string;
    total_price: number;
}

export interface CreatedAt {
    nanoseconds: number;
    seconds: number;
    type: string;
}
