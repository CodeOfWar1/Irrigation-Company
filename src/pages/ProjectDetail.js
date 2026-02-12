import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = Number(id);
  const project = projects.find((p) => p.id === projectId);

  useDocTitle(
    project
      ? `Project | ${project.name} - Lawn Irrigation Technologies`
      : 'Project not found - Lawn Irrigation Technologies'
  );

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-20 bg-gray-50 py-12 lg:py-20 min-h-screen">
        <div className="m-auto max-w-6xl px-4 md:px-8">
          {!project ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 text-center">
              <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-3">
                Project not found
              </h1>
              <p className="text-gray-600 mb-6">
                The project you are looking for could not be found. It may have been moved or
                the link may be incorrect.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl text-white bg-blue-900 hover:bg-blue-800 text-lg shadow-xl"
              >
                Back to projects
              </Link>
            </div>
          ) : (
            <>
              <header className="mb-8" data-aos="fade-down">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-2">
                  Project case study
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
                  {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                  {project.sector && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 font-semibold">
                      {project.sector}
                    </span>
                  )}
                  {project.location && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                      {project.location}
                    </span>
                  )}
                </div>
              </header>

              <section className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-10" data-aos="fade-up">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-gray-100 flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-72 md:h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">
                      Project overview
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  {project.highlights && project.highlights.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        Key outcomes
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        {project.highlights.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Before & after gallery */}
              <section className="mb-10" data-aos="fade-up">
                <h2 className="text-lg md:text-xl font-semibold text-blue-900 mb-4">
                  Before &amp; after
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  A visual comparison of the site before and after installation. You can update
                  these images with dedicated before/after photos as they become available.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-gray-100 flex items-center justify-center">
                      <img
                        src={project.beforeImage || project.image}
                        alt={`${project.name} – before`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-3 text-center text-sm font-semibold text-gray-700">
                      Before
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-gray-100 flex items-center justify-center">
                      <img
                        src={project.afterImage || project.image}
                        alt={`${project.name} – after`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-3 text-center text-sm font-semibold text-gray-700">
                      After
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between items-center mt-8">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-sm font-semibold text-blue-900 hover:text-blue-700"
                >
                  ← Back to all projects
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;

