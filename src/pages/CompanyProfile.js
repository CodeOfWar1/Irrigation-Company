import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';

const CompanyProfile = () => {
  useDocTitle('Lawn Irrigation Technologies | Company profile');

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="mt-20 bg-gray-50 py-12 lg:py-20 min-h-screen">
        <div className="m-auto max-w-6xl px-4 md:px-8 space-y-10">
          <header className="text-center" data-aos="fade-down">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brandGreen">
              Company profile
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-blue-900">
              Lawn Irrigation Technologies
            </h1>
            <p className="mt-2 text-lg text-gray-600 font-semibold">
              “Green Grass, Zero Effort.”
            </p>
          </header>

          {/* Executive summary */}
          <section
            aria-labelledby="executive-summary-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="executive-summary-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              1. Executive summary
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
              Established in 2011, Lawn Irrigation Technologies is a leading Zambian
              engineering firm specialising in the design, supply and installation of
              advanced residential and commercial irrigation systems.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
              Unlike standard landscaping firms, we approach every project through the
              lens of Agricultural Engineering and Soil Science. With over 14 years of
              hands‑on experience, we have successfully executed high‑profile projects
              for diplomatic missions, government agencies and international schools.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              We combine modern 3D visualisation technology with scientific soil
              analysis to deliver water‑efficient, solar‑ready (“Zesco‑proof”) and
              automated green spaces that thrive in the Zambian climate.
            </p>
          </section>

          {/* Company details */}
          <section
            aria-labelledby="company-details-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="company-details-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              2. Company details
            </h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm md:text-base text-gray-700">
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
          </section>

          {/* Technical advantage */}
          <section
            aria-labelledby="technical-advantage-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="technical-advantage-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              3. The technical advantage – why us?
            </h2>
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
          </section>

          {/* Services */}
          <section
            aria-labelledby="services-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="services-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              4. Our services
            </h2>
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
          </section>

          {/* Leadership & team */}
          <section
            aria-labelledby="leadership-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="leadership-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              5. Leadership &amp; team
            </h2>
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
          </section>

          {/* Project portfolio */}
          <section
            aria-labelledby="portfolio-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="portfolio-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              6. Project portfolio – proven success
            </h2>
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
          </section>

          {/* Service pathway */}
          <section
            aria-labelledby="service-pathway-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="service-pathway-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              7. The service pathway – how we work
            </h2>
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
          </section>

          {/* Contact information */}
          <section
            aria-labelledby="contact-heading"
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              id="contact-heading"
              className="text-2xl font-bold text-blue-900 mb-4"
            >
              8. Contact information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base text-gray-700">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Physical address</h3>
                <p>Plot 70, Handsworth,</p>
                <p>Great East Road, Lusaka, Zambia.</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Direct lines</h3>
                <p>+260 966 897 354</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Email</h3>
                <p>lawnirrigationtech@gmail.com</p>
                <p>geomulenga@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Tagline</h3>
                <p>“Easy Life With Modern Technology”.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompanyProfile;

