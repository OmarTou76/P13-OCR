import React from 'react'
import './homepage.css'
import { featuresData } from '../../data/featuresData'
import { FeatureBadge } from '../../components/FeaturesBadge/Index'

export const Homepage = () => {
    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featuresData.map((feature, keyIndex) => (
                    <FeatureBadge icon={feature.icon} title={feature.title
                    } text={feature.text} key={`key-${keyIndex}`} />
                ))}
            </section>
        </main>
    )
}
