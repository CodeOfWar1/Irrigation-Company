import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';

const MAP_ADDRESS = 'Plot 70, Handsworth, Great East Road, Lusaka, Zambia';
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&z=16&output=embed`;

const SectionCard = ({ id, heading, children, className = '' }) => (
  <section
    aria-labelledby={id}
    className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl ${className}`}
    data-aos="fade-up"
  >
    <div className="border-l-4 border-blue-900 bg-gradient-to-r from-blue-50/50 to-white px-6 md:px-8 py-4">
      <h2 id={id} className="text-xl md:text-2xl font-bold text-blue-900">
        {heading}
      </h2>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </section>
);

const CompanyProfile = () => {
  useDocTitle('Lawn Irrigation Technologies | Company profile');

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-14 sm:mt-20 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-10 sm:py-16 md:py-24" data-aos="fade-down">
          <div className="m-auto max-w-6xl px-3 sm:px-4 md:px-8 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Company profile
            </p>
            <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight px-2">
              Lawn Irrigation Technologies
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto px-1">
              “Green Grass, Zero Effort.”
            </p>
            <p className="mt-2 text-sm text-blue-200">
              Design • Supply • Install • Maintain
            </p>
          </div>
        </div>

        <div className="m-auto max-w-6xl px-3 sm:px-4 md:px-8 -mt-4 sm:-mt-6 relative z-10 pb-12 sm:pb-20">
          <div className="space-y-8">
            {/* Executive summary */}
            <SectionCard id="executive-summary-heading" heading="1. Executive summary">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Established in 2011, Lawn Irrigation Technologies is a leading Zambian
                engineering firm specialising in the design, supply and installation of
                advanced residential and commercial irrigation systems.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Unlike standard landscaping firms, we approach every project through the
                lens of Agricultural Engineering and Soil Science. With over 14 years of
                hands‑on experience, we have successfully executed high‑profile projects
                for diplomatic missions, government agencies and international schools.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                We combine modern 3D visualisation technology with scientific soil
                analysis to deliver water‑efficient, solar‑ready (“Zesco‑proof”) and
                automated green spaces that thrive in the Zambian climate.
              </p>
            </SectionCard>

            {/* Company details */}
            <SectionCard id="company-details-heading" heading="2. Company details">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-base text-gray-700">
                <div className="font-semibold text-gray-500">Legal name</div>
                <div>Lawn Irrigation Technologies</div>

                <div className="font-semibold text-gray-500">Registration number</div>
                <div>184163</div>

                <div className="font-semibold text-gray-500">TPIN</div>
                <div>1002735194</div>

                <div className="font-semibold text-gray-500">Year established</div>
                <div>2011</div>

                <div className="font-semibold text-gray-500">Headquarters</div>
                <div>Plot 70, Handsworth, Great East Road, Lusaka</div>

                <div className="font-semibold text-gray-500">Bankers</div>
                <div>Zambia National Commercial Bank (Zanaco) – Premium Branch</div>
              </div>
            </SectionCard>

            {/* Technical advantage */}
            <SectionCard id="technical-advantage-heading" heading="3. The technical advantage – why us?">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                We differentiate ourselves through precision engineering and deep
                integration of soil science, hydraulics and modern control systems.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-gray-700 list-disc list-inside">
                <li>
                  <span className="font-semibold text-gray-900">Soil science integration:</span>{' '}
                  Led by a BSc Soil Scientist (UNZA), we analyse soil fertility and water
                  retention before design, ensuring each system suits the site conditions.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">3D landscape visualisation:</span>{' '}
                  We use high‑performance computing to generate 3D renders so clients can
                  “walk through” their garden before installation begins.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Water conservation by design:</span>{' '}
                  Our layouts minimise wastage through precise hydro‑zoning, head‑to‑head
                  coverage and correct nozzle selection, protecting both your lawn and
                  your water bills.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Solar‑ready systems:</span>{' '}
                  We offer fully independent solar‑powered irrigation options that keep
                  your lawn green even during power outages.
                </li>
              </ul>
            </SectionCard>

            {/* Services */}
            <SectionCard id="services-heading" heading="4. Our services">
              <div className="space-y-6 text-sm md:text-base text-gray-700">
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">A. Design &amp; consultancy</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Scientific site audits and hydraulic assessments.</li>
                    <li>Professional CAD blueprints and 3D landscape rendering.</li>
                    <li>Technical material quantification (bill of quantities).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">B. Installation &amp; supply</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Automated pop-up sprinkler systems (rotors and sprays).</li>
                    <li>Precision drip and micro‑irrigation for hedges and beds.</li>
                    <li>Pump station setup (booster, centrifugal and submersible).</li>
                    <li>Smart controllers (Wi‑Fi / GSM enabled).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-blue-900 mb-2">C. Maintenance &amp; after‑sales</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Seasonal system audits and routine servicing.</li>
                    <li>Borehole‑to‑irrigation integration.</li>
                    <li>Soil fertility management and consultancy.</li>
                  </ul>
                </div>
              </div>
            </SectionCard>

            {/* Leadership & team */}
            <SectionCard id="leadership-heading" heading="5. Leadership & team">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                Our team consists of varsity‑qualified professionals with decades of combined
                experience in irrigation hydraulics, water engineering and electrical automation.
              </p>

              <div className="space-y-5 text-sm md:text-base text-gray-700">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    George Kabwe Mulenga – Director / Lead Irrigation Designer
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>M.Eng Agricultural Engineering (Candidate) – UNZA.</li>
                    <li>B.Sc Agricultural Science, major: Soil Science – UNZA.</li>
                    <li>Diploma in Agricultural Engineering – NRDC.</li>
                    <li>Over 14 years of specialised experience in irrigation hydraulics.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-900">
                    Stevenson Sumbukeni – Site Manager
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Diploma in Water Engineering – NRDC.</li>
                    <li>Expertise in large‑scale pump installations (formerly CAMCO / Saro Agro).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-900">
                    William Jere – Lead Technician
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Certificate in Electronics.</li>
                    <li>15+ years’ experience in complex pump systems and electrical automation.</li>
                  </ul>
                </div>
              </div>
            </SectionCard>

            {/* Project portfolio */}
            <SectionCard id="portfolio-heading" heading="6. Project portfolio – proven success">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                We have maintained a 100% project success rate since 2011. Selected clients include:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Diplomatic &amp; government
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Turkish Embassy.</li>
                    <li>Embassy Park (Presidential Burial Site).</li>
                    <li>Zambia Development Agency (ZDA).</li>
                    <li>ZICTA Headquarters.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Institutional
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>University of Zambia (UNZA – Confucius Institute).</li>
                    <li>International School of Lusaka (ISL).</li>
                    <li>Zambia Institute of Chartered Accountants (ZiCA).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Commercial &amp; leisure
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Chainama Golf Course (fairways and greens).</li>
                    <li>Alliance Motors (Jaguar / Land Rover HQ).</li>
                    <li>Levy Park Mall (NAPSA).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Residential estates
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>High‑end installations in Kabulonga.</li>
                    <li>Roma Park.</li>
                    <li>Leopard’s Hill.</li>
                    <li>New Kasama.</li>
                  </ul>
                </div>
              </div>
            </SectionCard>

            {/* Service pathway */}
            <SectionCard id="service-pathway-heading" heading="7. The service pathway – how we work">
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700">
                <li>
                  <span className="font-semibold">Phase 1: Scientific site audit</span> –
                  Technical assessment of soil and water (ZMW 1,000).
                </li>
                <li>
                  <span className="font-semibold">Phase 2: 3D visualisation</span> – Virtual
                  design and material quantification.
                </li>
                <li>
                  <span className="font-semibold">Phase 3: Precision installation</span> –
                  Turnkey setup using world‑class components.
                </li>
                <li>
                  <span className="font-semibold">Phase 4: Handover &amp; training</span> –
                  Empowering the client to manage their new smart system.
                </li>
              </ol>
            </SectionCard>

            {/* Contact & location */}
            <section
              aria-labelledby="contact-heading"
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
              data-aos="fade-up"
            >
              <h2
                id="contact-heading"
                className="text-2xl font-bold text-blue-900 mb-4"
              >
                8. Contact & location
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6 text-base text-gray-700">
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><span className="text-blue-900">📍</span> Physical address</h3>
                    <p className="leading-relaxed">{MAP_ADDRESS}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Direct lines</h3>
                    <p>+260 966 897 354</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Email</h3>
                    <p>lawnirrigationtech@gmail.com</p>
                    <p>geomulenga@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Tagline</h3>
                    <p>“Easy Life With Modern Technology”.</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md h-[280px] md:h-[320px] min-h-[240px]">
                  <iframe title="Lawn Irrigation Technologies location" src={MAP_EMBED_URL} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompanyProfile;

