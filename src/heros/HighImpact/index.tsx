'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex flex-col" data-theme="light">
      {/* <div className="select-none">
        {media && typeof media === 'object' && (
          <Media imgClassName="object-cover max-h-[50vh] w-full" fill priority resource={media} />
        )}
      </div> */}
      <div className="bg-card w-full ">
        <div className="container">
          {richText && (
            <RichText className="flex align-middle py-6" data={richText} enableGutter={false} />
          )}
        </div>
      </div>

      <div className="container mb-8 flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
