import React, { useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import chainamaImg from '../images/projectsImg/Chainama.JPG';
import chomaImg from '../images/projectsImg/Choma.jpg';
import farmImg from '../images/projectsImg/Farm.jpg';
import islImg from '../images/projectsImg/ISL.jpg';
import lodgeImg from '../images/projectsImg/lodge.jpg';
import rangeImg from '../images/projectsImg/Range.jpg';
import zdaImg from '../images/projectsImg/ZDA.jpg';
import zictaImg from '../images/projectsImg/Zicta.jpg';

const projects = [
  {
    id: 1,
    name: 'Chainama irrigation & landscape upgrade',
    sector: 'Institutional campus',
    location: 'Chainama',
    shortDescription:
      'Rehabilitation and extension of irrigation across lawns and trees at Chainama, improving coverage and resilience.',
    fullDescription:
      'Comprehensive upgrade of the Chainama campus landscape, including new pipe runs, sprinklers and control valves to cover previously dry areas. The project balanced re‑use of existing infrastructure with new zones, resulting in greener open spaces and lower manual watering effort.',
    highlights: [
      'Mapped and integrated with existing irrigation assets',
      'Introduced new zones for high‑traffic lawn areas',
      'Reduced manual hose watering for maintenance teams',
    ],
    image: chainamaImg,
  },
  {
    id: 2,
    name: 'Choma office perimeter irrigation',
    sector: 'Commercial exterior',
    location: 'Choma',
    shortDescription:
      'Automated irrigation for office perimeter beds, keeping shrubs healthy through the dry season.',
    fullDescription:
      'Design and installation of a low‑profile irrigation system for perimeter planting beds at offices in Choma. The solution uses drip and micro‑sprinklers to target root zones, limiting overspray onto pathways and walls while providing consistent moisture for decorative plants.',
    highlights: [
      'Discreet pipe routing along existing hardscape',
      'Water‑efficient delivery focused on plant root zones',
      'Programmable schedules aligned with local water rules',
    ],
    image: chomaImg,
  },
  {
    id: 3,
    name: 'Farm irrigation block',
    sector: 'Agriculture',
    location: 'Farm installation',
    shortDescription:
      'Irrigation setup for a farm block, prepared for future crop rotation and expansion.',
    fullDescription:
      'Initial irrigation works for a farm block, including mainline routing, valves and sprinkler layout. The design supports current planting patterns while leaving capacity for future crop rotation and additional zones as the farm expands.',
    highlights: [
      'Mainline and valve layout designed for expansion',
      'Coverage tuned for current crop spacing',
      'Simple controls for on‑site farm team operation',
    ],
    image: farmImg,
  },
  {
    id: 4,
    name: 'ISL sports field irrigation',
    sector: 'Education & sports',
    location: 'ISL',
    shortDescription:
      'Installation of irrigation for sports fields to maintain safe, playable turf year‑round.',
    fullDescription:
      'Project to provide uniform irrigation coverage for sports pitches at ISL. Work included pipework, sprinkler positioning, controller setup and testing to ensure safe, even turf conditions for students and events throughout the year.',
    highlights: [
      'Even coverage across full sports surfaces',
      'Night‑time watering schedules to reduce disruption',
      'Coordinated with grounds team for maintenance access',
    ],
    image: islImg,
  },
  {
    id: 5,
    name: 'Lodge landscape irrigation',
    sector: 'Hospitality',
    location: 'Lodge gardens',
    shortDescription:
      'Landscape irrigation for lodge gardens, enhancing guest experience with greener surroundings.',
    fullDescription:
      'Design and deployment of irrigation for ornamental lawns and beds at a lodge. The system was planned around existing paths and guest areas, keeping hardware discreet while supporting lush planting that elevates the overall guest experience.',
    highlights: [
      'Discreet installation around guest walkways and rooms',
      'Separate zones for lawn and planting beds',
      'Improved visual appeal of outdoor spaces for guests',
    ],
    image: lodgeImg,
  },
  {
    id: 6,
    name: 'Range irrigation commissioning',
    sector: 'Recreation facilities',
    location: 'Range site',
    shortDescription:
      'Commissioning and fine‑tuning of irrigation on a range facility to stabilise new surfaces.',
    fullDescription:
      'Support for the commissioning of irrigation at a range facility, including nozzle selection, pressure checks and controller programming. The setup helped to establish new surfaces quickly and maintain them under varying usage patterns.',
    highlights: [
      'On‑site calibration for pressure and throw distance',
      'Programming based on establishment versus maintenance needs',
      'Training for staff on seasonal schedule changes',
    ],
    image: rangeImg,
  },
  {
    id: 7,
    name: 'ZDA landscape irrigation',
    sector: 'Corporate grounds',
    location: 'ZDA facility',
    shortDescription:
      'Structured irrigation for corporate grounds to support consistent, low‑maintenance greenery.',
    fullDescription:
      'Implementation of irrigation across ZDA grounds, providing reliable watering to lawns and feature planting. The design reduces manual intervention while keeping the frontage and internal courtyards presentable throughout the year.',
    highlights: [
      'Zones configured for lawns, trees and shrubs separately',
      'Controllers positioned for easy facility team access',
      'Documented operating and maintenance guidelines',
    ],
    image: zdaImg,
  },
  {
    id: 8,
    name: 'ZICTA site irrigation',
    sector: 'Public sector',
    location: 'ZICTA facility',
    shortDescription:
      'On‑site irrigation works for ZICTA grounds to improve landscape quality and reduce manual watering.',
    fullDescription:
      'Project covering design support and installation of irrigation infrastructure for ZICTA grounds. The solution helps maintain lawns and planted areas with minimal manual watering, supporting a professional and welcoming exterior for visitors and staff.',
    highlights: [
      'Infrastructure sized for both current and future planting',
      'Schedules aligned with facility operating hours',
      'Reduced reliance on manual hose and sprinkler moves',
    ],
    image: zictaImg,
  },
];

const Projects = () => {
  useDocTitle('MLD | Molad e Konsult - Client projects');
  const [activeProject, setActiveProject] = useState(null);

  const handleOpenProject = (project) => {
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
  };

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
                <article
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col cursor-pointer"
                  onClick={() => handleOpenProject(project)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed flex-1">
                      {project.shortDescription}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {activeProject && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
                <div className="w-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </div>
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900">
                        {activeProject.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                        {activeProject.sector && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 font-semibold">
                            {activeProject.sector}
                          </span>
                        )}
                        {activeProject.location && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                            {activeProject.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseProject}
                      className="text-gray-400 hover:text-gray-700 ml-4 rounded-full border border-gray-200 w-8 h-8 flex items-center justify-center"
                      aria-label="Close project details"
                    >
                      <span className="text-lg leading-none">×</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Project overview
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {activeProject.fullDescription}
                      </p>
                    </div>
                    {activeProject.highlights && activeProject.highlights.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                          Key outcomes
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                          {activeProject.highlights.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;

