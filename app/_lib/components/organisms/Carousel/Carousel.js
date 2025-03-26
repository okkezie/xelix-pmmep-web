
"use client";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import Image from "next/image"
import 'swiper/css/bundle'
 
export default function Carousel({data}) {
  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: true,
    pagination: { clickable: true }
  }

  return (
    <div className="carouselOne rounded-lg border border-gray-200 dark:border-gray-800">
      <Swiper {...swiperOptions}>
        { data?.map?.((item, i) => (
          <SwiperSlide key={i + 1}>
            <div className="overflow-hidden rounded-lg">
              <Image
                width={487}
                height={297}
                src={item.thumbnail}
                className="w-full rounded-lg"
                alt="carousel"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}