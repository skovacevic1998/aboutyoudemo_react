import { ProductDisplay } from "../utilities/ProductDisplay";

interface Product {
  name: string;
  image: string;
  description: string;
}

export const GenericShopping: React.FC = () => {
  const product: Product = {
    name: 'Product Name',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fHww',
    description: 'Product Description'
  };
  
  return (
    <>
      <div>
        <ProductDisplay product={product} />
      </div>
    </>
  );
};
