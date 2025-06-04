import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// import ImageViewer from 'react-simple-image-viewer';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '@/servis/products';
import { Heart } from 'lucide-react';


const ProductSlug = () => {

    const { slug } = useParams()

    const [data, setData] = useState(null);

    const getSingleProductData = async () => {
        try {
            const response = await getSingleProduct(slug);
            setData(response);
        } catch (error) {
            console.error("Error fetching single product:", error);
        }
    }



    useEffect(() => {
        getSingleProductData();
    }, [slug]);





    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    const [product, setProduct] = useState({});

    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('seveProduct');
        return stored ? JSON.parse(stored) : [];
    });

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        getSingleProduct(slug).then((data) => {
            setProduct(data);
        });
    }, [slug]);

    useEffect(() => {
        setFavorite(favorites.some(item => item.id === product.id));
    }, [product, favorites]);



    useEffect(() => {
        localStorage.setItem('seveProduct', JSON.stringify(favorites));
    }, [favorites]);

    const SeveToCard = () => {
        if (favorite) {
            setFavorites(prev => prev.filter(item => item.id !== product.id));
        } else {
            setFavorites(prev => [...prev, product]);
        }
    };


    return (
        <div className='container mx-auto m-0 grid grid-cols-12'>
            <div className='col-span-9 p-5'>
                <h2>{data?.title}</h2>
                <div className='flex items-start gap-5 mt-5 w-full'>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="flex flex-col w-full vertical-slider"
                    >
                        {data?.images.map((image, index) => (
                            <SwiperSlide className='w-full salom' key={index} onClick={() => openImageViewer(index)}>
                                <img className='w-full h-[100px] object-cover rounded-md' src={image} alt={`Thumbnail ${index + 1}`} />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    <Swiper style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper, }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="flex ">
                        {
                            data?.images.map((image, index) => (
                                <SwiperSlide key={index} onClick={() => openImageViewer(index)}>
                                    <img className='w-full h-[400px] object-cover rounded-md' src={image} alt={`Image ${index + 1}`} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                </div>

            </div>
            <div className='col-span-3 '>
                <Card className='p-5 mt-[70px]  h-auto'>
                    <h3 className='text-2xl text-pink-600  font-light'>{data?.price}$</h3>
                    <p className='text-gray-500 mt-2'>Arzon narx kafolati </p>
                    <div className='flex gap-2 '>
                        <span className='bg-[yellow] text-whit px-4 py-2 rounded-md mt-4' >-40% </span> <span className='bg-[yellow]  px-4 py-2 rounded-md mt-4'>Super narx </span>
                    </div>
                    <Tabs>
                        <Card className='mt-5 bg-[#dbd9d9] p-6'>
                            <TabsList className={'grid w-full grid-cols-4'}>
                                <TabsTrigger value="3">3 OY</TabsTrigger>
                                <TabsTrigger value="6">6 OY</TabsTrigger>
                                <TabsTrigger value="12">12 OY </TabsTrigger>
                                <TabsTrigger value="24">24 OY</TabsTrigger>
                            </TabsList>
                            <div className='pl-4'>
                                <TabsContent value='3'><span className='items-center bg-[yellow] inline-flex gap-[3px] mr-[3px] px-1.5 py-0.5 rounded-md'>{(data?.price / 3).toFixed(2)}$</span> * 3</TabsContent>
                                <TabsContent value='6'><span className='items-center bg-[yellow] inline-flex gap-[3px] mr-[3px] px-1.5 py-0.5 rounded-md'>{(data?.price / 6).toFixed(2)}$</span>*6</TabsContent>
                                <TabsContent value='12'><span className='items-center bg-[yellow] inline-flex gap-[3px] mr-[3px] px-1.5 py-0.5 rounded-md'>{(data?.price / 12).toFixed(2)}$</span>*12</TabsContent>
                                <TabsContent value='24'><span className='items-center bg-[yellow] inline-flex gap-[3px] mr-[3px] px-1.5 py-0.5 rounded-md'>{(data?.price / 24).toFixed(2)}$</span>*24</TabsContent>
                            </div>
                        </Card>
                    </Tabs>
                    <div className="flex flex-wrap items-center gap-2 md:flex-row">
                        <Button className={'w-[250px] h-[50px]   hover:bg-gray-700'}>Button</Button>

                        <Button onClick={SeveToCard} className={'w-[70px] h-[50px]  hover:bg-gray-700'}>
                            <Heart className={`w-6 h-6 ${favorite ? 'text-red-500 fill-red-500' : ''}`} />

                        </Button>
                    </div>
                    <Button className={'w-[250px] h-[50px]  hover:bg-gray-700'}>
                        Savatga qoʻshish
                    </Button>

                </Card>
            </div>
            <Card className={'col-span-12 m-5'}>
                <div className='p-5'>
                    <h3 className='text-2xl font-light'>Tavsif</h3>
                    <p className='text-gray-500 mt-2'>{data?.description}</p>
                </div>
            </Card>
        </div>
    )
}

export default ProductSlug
