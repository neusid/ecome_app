import { ProductEntities } from "@/domain/entities/product_entities";
import { getApiProductsUseCase } from "@/domain/usecases/product/get_products_usecase";
import { useEffect, useState } from "react";

function useAllProduct() {

    const [ProductListAxios, setProductListAxios] = useState<ProductEntities[]>([]);

    useEffect(() => {
        handleTestAxios();
    }, []);

    const handleTestAxios = async () => {
        const data = await getApiProductsUseCase();
        setProductListAxios(data);
    };

    return (
        {
            ProductListAxios
        }
    )
}

export default useAllProduct