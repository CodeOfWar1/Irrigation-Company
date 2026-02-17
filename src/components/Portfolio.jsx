import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects } from '../data/portfolioProjects';

const Portfolio = () => {
    // Get featured projects with multiple images for transition
    const commercialProjects = portfolioProjects.filter((p) => p.sector !== 'Residential');
    const residentialProjects = portfolioProjects.filter((p) => p.sector === 'Residential');
    
    // Collect images from multiple projects for smooth transitions
    const featuredImages = [];
    commercialProjects.slice(0, 3).forEach(project => {
        if (project.images && project.images.length > 0) {
            featuredImages.push({
                image: project.images[0],
                project: project
            });
        }
    });
    residentialProjects.slice(0, 2).forEach(project => {
        if (project.images && project.images.length > 0) {
            featuredImages.push({
                image: project.images[0],
                project: project
            });
        }
    });
    
    // Fallback to first available project if no images found
    if (featuredImages.length === 0 && portfolioProjects.length > 0) {
        const firstProject = portfolioProjects[0];
        if (firstProject.images && firstProject.images.length > 0) {
            featuredImages.push({
                image: firstProject.images[0],
                project: firstProject
            });
        }
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previousImageIndex, setPreviousImageIndex] = useState(null);
    
    useEffect(() => {
        if (featuredImages.length <= 1) return;
        
        const interval = setInterval(() => {
            setPreviousImageIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % featuredImages.length);
        }, 6000); // Change image every 6 seconds

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuredImages.length, currentImageIndex]);
    
    const currentFeatured = featuredImages[currentImageIndex] || featuredImages[0];

    return (
        <section id="projects" className="scroll-mt-24 pt-20 sm:pt-24 pb-20 bg-gradient-to-b from-white via-gray-50 to-white" data-aos="fade-up">
            <div className="m-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-green-600 font-semibold uppercase tracking-widest text-sm mb-3">Our work</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 mb-5">
                        Our projects
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto mb-10">
                        Explore our portfolio of irrigation and landscaping projects across residential and commercial sectors.
                    </p>
                </div>

                {/* Featured Images with Smooth Transition */}
                {currentFeatured && (
                    <div className="relative mb-12 group" data-aos="zoom-in">
                        <Link
                            to="/get-demo"
                            className="block relative overflow-hidden rounded-3xl shadow-2xl"
                        >
                            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-gray-100">
                                {/* Multiple images for smooth crossfade transition */}
                                {featuredImages.map((item, index) => {
                                    const isCurrent = index === currentImageIndex;
                                    const isPrevious = index === previousImageIndex;
                                    
                                    return (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 portfolio-3d-img ${
                                                isCurrent ? 'opacity-100 z-10' : isPrevious ? 'opacity-0 z-[5]' : 'opacity-0 z-0'
                                            }`}
                                            style={{
                                                backgroundImage: `url(${item.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                transition: 'opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1), transform 2500ms cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                            aria-hidden={!isCurrent}
                                        />
                                    );
                                })}
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                                
                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-12 md:p-16 text-white z-20">
                                    <div className="max-w-2xl">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-sm font-semibold">{currentFeatured.project?.sector || 'Commercial'}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                                            {currentFeatured.project?.name || 'Featured Project'}
                                        </h3>
                                        <p className="text-sm sm:text-xl text-gray-200 mb-4 sm:mb-6 drop-shadow">
                                            Discover our complete portfolio of irrigation and landscaping excellence
                                        </p>
                                        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-green-600 hover:bg-green-700 text-xs sm:text-base font-semibold transition-colors shadow-lg">
                                            View full portfolio
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

            </div>
        </section>
    )
}

export default Portfolio;

