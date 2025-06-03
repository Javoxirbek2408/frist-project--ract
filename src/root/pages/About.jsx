import React, { useEffect } from 'react'
import '../../index.css'
import { productServer } from '@/servis/products';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

const About = () => {

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { get } = productServer;

  useEffect(() => {
    setLoading(true);
    get().then((data) => {

      console.log("Products data:", data);

      setProducts(data?.data);
      setLoading(false);
    })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className='container mx-auto px-6'>

      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full p-5'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <>
            {loading &&
              <div>
                <Skeleton className='h-[200px] w-full ' />
                <Skeleton className='h-[30px] w-full mt-3' />
                <Skeleton className='h-[20px] w-full mt-3' />
                <Skeleton className='h-[20px] w-full mt-3' />
              </div>
            }
          </>
        ))}
        {products.map((product) => (
          <ProductCard product={product} />
        ))}

      </div>
    </div >
  )
}

export default About;
