'use client'
import React from 'react'
import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/utilities/ui'

export const CarouselHero: React.FC<Page['hero']> = ({ carouselContent }) => {
  const plugin = React.useRef(Autoplay({ delay: 5000 }))

  return (
    <div className="hidden sm:block w-full">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className={cn('CarouselComponent w-full')}
      >
        <CarouselContent>
          {carouselContent?.map(({ image }, index) => (
            <CarouselItem
              key={index}
              className="relative w-full 2xl:h-[400px] xl:h-[300px] md:h-[300px] sm:h-[100px]"
            >
              <Media
                resource={image}
                fill
                className="object-cover"
                priority={index === 0}
                imgClassName="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}
