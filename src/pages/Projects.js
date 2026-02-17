import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { portfolioProjects } from '../data/portfolioProjects';

const Projects = () => {
  useDocTitle('Portfolio | Lawn Irrigation Technologies');

  const commercial = portfolioProjects.filter((p) => p.sector !== 'Residential');
  const residential = portfolioProjects.filter((p) => p.sector === 'Residential');

  const ProjectCard = ({ project }) => (
    <Link
      key={project.id}
      to={`/projects/${project.id}`}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:border-green-100 transition-all duration-300"
    >
      <div className="h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-100">
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

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-10 sm:py-14">
          <div className="m-auto max-w-4xl px-4 text-center">
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">
              What we deliver
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
              Our client projects
            </h1>
            <p className="mt-2 text-green-100 text-base sm:text-lg max-w-xl mx-auto">
              Irrigation and landscaping projects we have delivered.
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

export default Projects;
