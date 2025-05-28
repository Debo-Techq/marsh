
import ProductList from "@/components/Product-list";
import { stripe } from "@/lib/stripe";


const ProductPage = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 20,
  });

  return <ProductList products={products.data} />;
};

export default ProductPage;
