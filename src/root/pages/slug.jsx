import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageViewer from 'react-simple-image-viewer';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '@/servis/products';


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

    console.log("Single Product Data:", data);




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
                        className="flex !flex-col w-full vertical-slider"
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
                        <Button className={'w-[250px] h-[50px] bg-[#b9b7b7] hover:bg-gray-300'}>Button</Button>
                        <Button className={'w-[70px] h-[50px] bg-[#b9b7b7] hover:bg-gray-300'}>
                            <svg className='text-5xl' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
                            </svg>
                        </Button>
                    </div>
                    <Button className={'w-[250px] h-[50px] bg-[#b9b7b7] hover:bg-gray-300'}>Savatga qoʻshish</Button>

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
