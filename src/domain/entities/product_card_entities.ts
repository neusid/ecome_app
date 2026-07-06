export type ProductCardComponentProps = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity: number,
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
};

type Rating = {
    rate: number;
    count: number;
}