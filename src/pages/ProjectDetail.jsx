import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { usePortfolioProjects } from '../data/usePortfolio';

const ProjectDetail = () => {
  const { id } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { projects: portfolioProjects, loading } = usePortfolioProjects();
  const project = portfolioProjects.find((p) => p.id === id);

  useDocTitle(
    project
      ? `Project | ${project.name} - Lawn Irrigation Technologies`
      : 'Project not found - Lawn Irrigation Technologies'
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(-1);
      if (!project || lightboxIndex < 0) return;
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % project.images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, lightboxIndex]);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-14 sm:mt-20 bg-gray-50 py-6 sm:py-12 lg:py-20 min-h-screen">
        <div className="m-auto max-w-6xl px-3 sm:px-4 md:px-8">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Loading project...</p>
            </div>
          ) : !project ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 text-center">
              <h1 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-3">
                Project not found
              </h1>
              <p className="text-gray-600 mb-6">
                The project you are looking for could not be found.
              </p>
              <Link
                to="/get-demo"
                className="btn-3d inline-flex items-center justify-center px-6 py-3 rounded-2xl text-white bg-green-900 hover:bg-green-800 text-lg shadow-xl"
              >
                Back to portfolio
              </Link>
            </div>
          ) : (
            <>
              <header className="mb-8" data-aos="fade-down">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-2">
                  Project gallery
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-900 mb-2 sm:mb-3 leading-tight">
                  {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-100 font-semibold">
                    {project.sector}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                    {project.images.length} photo{project.images.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </header>

              <section className="mb-10" data-aos="fade-up">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {project.images.map((src, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="aspect-square rounded-xl overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <img
                        src={src}
                        alt={`${project.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </section>

              <div className="flex justify-between items-center mt-8">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-sm font-semibold text-green-900 hover:text-green-700"
                >
                  ← Back to all projects
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {project && lightboxIndex >= 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <div className="flex items-center justify-between p-4 text-white">
            <button
              type="button"
              onClick={() => setLightboxIndex(-1)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold truncate max-w-[50vw]">{project.name}</h2>
            <span className="text-sm text-gray-300">
              {lightboxIndex + 1} / {project.images.length}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <img
              src={project.images[lightboxIndex]}
              alt={`${project.name} ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <button
              type="button"
              onClick={() => setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length)}
              className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((i) => (i + 1) % project.images.length)}
              className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;

