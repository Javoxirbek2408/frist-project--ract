import ProductCard from '@/components/product-card'
import React, { useEffect, useState } from 'react'

export const SeveProduct = () => {
    const [favorites, setFavorites] = useState(localStorage.getItem('seveProduct') ? JSON.parse(localStorage.getItem('seveProduct')) : [])
    useEffect(() => {
        localStorage.setItem('seveProduct', JSON.stringify(favorites))
        setFavorites(favorites)
    }, [favorites])
    console.log(favorites);
    return (
        <div>
            <div className='max-w-7xl mx-auto w-full'>
                <div className='grid grid-cols-4 gap-5'>
                    {
                        favorites.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
