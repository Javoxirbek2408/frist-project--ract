import React from 'react'
import { Card, CardDescription, CardTitle } from './ui/card'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <Card className='p-4'>
            <img className='rounded-[8px] h-[200px] w-full object-cover' src={product.images[0]} alt="rasm" />
            <Link to={`/product/${product.slug}`} >
                <CardTitle>{product.title}</CardTitle>
            </Link>
            <CardDescription className='line-clamp-3'>{product.description}</CardDescription>
            <button className='bg-black text-white rounded-md'>save</button>
        </Card>
    )
}

export default ProductCard
