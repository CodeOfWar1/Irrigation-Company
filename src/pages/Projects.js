import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { projects } from '../data/projects';

const Projects = () => {
  useDocTitle('MLD | Molad e Konsult - Client projects');

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-20 bg-gray-50 py-12 lg:py-20 min-h-screen">
        <div className="m-auto max-w-6xl px-4 md:px-8">
          <header className="mb-10 text-center" data-aos="fade-down">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
              Our client projects
            </h1>
            <p className="text-lg text-gray-600 font-semibold">
              A snapshot of irrigation and landscaping projects we have delivered.
            </p>
          </header>

          <section aria-labelledby="projects-list-heading" data-aos="fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2
                id="projects-list-heading"
                className="text-2xl font-bold text-blue-900"
              >
                Completed projects
              </h2>
              <span className="text-sm text-gray-500">
                {projects.length} project{projects.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col group"
                >
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed flex-1">
                      {project.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                      View full project
                      <svg
                        className="w-4 h-4 ml-1"
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
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;

