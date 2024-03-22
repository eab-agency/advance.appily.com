'use client'
import React, { Fragment } from 'react'
import { Page, } from '../../../../payload-types'
import { Media } from '../../Media'
import RichText from '../../RichText'
import { Button } from "@/components";

export const LandingPageHero: React.FC<Page['hero']> = ({ richText, media, links, title }) => {

    const renderButton = (link, i) => {
        const href =
            typeof link.reference?.value === 'object' && link.reference.value.slug
                ? `/${link.reference.value.slug}`
                : link.url;
        return (
            <Button
                appearance={link.appearance}
                className="button btn-primary"
                href={href}
                label={link.label}
                newTab={link.newTab}
                key={i} />
        )
    }
    return (
        <section className="pageHero">
            <div className="group center-aligned center-justified">
                <div className="intro-title">
                    <span>{title}</span>
                </div>
                <div>

                    <RichText content={richText} />
                    {(links || []).map(({ link }, i) =>
                        renderButton(link, i)
                    )}
                </div>
                {media !== null && (
                    <figure className="heroImage">
                        {typeof media === 'object' && (
                            <Fragment>
                                <Media
                                    resource={media}
                                    priority
                                />
                                {media?.caption && <RichText content={media?.caption} />}
                            </Fragment>
                        )}
                    </figure>
                )}
            </div>
        </section>
    )
}