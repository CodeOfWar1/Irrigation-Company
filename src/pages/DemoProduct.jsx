import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { portfolioProjects } from '../data/portfolioProjects';

/**
 * Portfolio page (route: /get-demo). Shows all projects in Commercial and Residential sections.
 */
const DemoProduct = () => {
  useDocTitle('Portfolio | Lawn Irrigation Technologies');

  const commercial = portfolioProjects.filter((p) => p.sector !== 'Residential');
  const residential = portfolioProjects.filter((p) => p.sector === 'Residential');

  const ProjectCard = ({ project }) => {
    const isResidential = project.sector === 'Residential';
    
    return (
      <Link
        key={project.id}
        to={`/projects/${project.id}`}
        className="card-zoom bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:border-green-200"
      >
        <div className="h-48 sm:h-52 w-full overflow-hidden bg-gray-100 relative">
          <img
            src={project.images[0]}
            alt={project.name}
            className="card-img-zoom w-full h-full object-cover"
          />
          {/* Sector Icon Overlay */}
          <div className="absolute top-3 left-3">
            <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
              {isResidential ? (
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-100">
              {isResidential ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              {project.sector}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {project.images.length} photo{project.images.length !== 1 ? 's' : ''}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2 line-clamp-2">
            {project.name}
          </h3>
          <span className="mt-auto inline-flex items-center text-sm font-semibold text-green-900 group-hover:text-green-700">
            View project
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 3.293a1 1 0 011.414 0L18 7.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 10H5a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <NavBar />
      <main id="portfolio" className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-800 text-white py-10 sm:py-14">
          <div className="m-auto max-w-4xl px-4 text-center">
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">
              What we deliver
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
              Portfolio
            </h1>
            <p className="mt-2 text-green-100 text-base sm:text-lg max-w-xl mx-auto">
              Irrigation and landscaping projects we have delivered for clients.
            </p>
          </div>
        </div>

        <div className="m-auto max-w-6xl px-3 sm:px-4 md:px-8 -mt-6 relative z-10 pb-16">
          {commercial.length > 0 && (
            <section className="mb-12 mt-8 sm:mt-12" data-aos="fade-up">
              <h2 id="commercial-projects" className="text-xl sm:text-2xl font-bold text-green-900 mb-6">
                Commercial &amp; institutional
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {commercial.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {residential.length > 0 && (
            <section data-aos="fade-up">
              <h2 id="residential-projects" className="text-xl sm:text-2xl font-bold text-green-900 mb-6">
                Residential projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {residential.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DemoProduct;

