import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';

const Terms = () => {
  useDocTitle('Terms & Conditions | Lawn Irrigation Technologies');

  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-800 text-white py-10 sm:py-14">
          <div className="m-auto max-w-4xl px-4 text-center">
            <p className="text-green-200 text-sm font-semibold uppercase tracking-widest">
              Legal
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
              Professional Service &amp; Design Terms
            </h1>
            <p className="mt-2 text-green-100 text-base sm:text-lg max-w-xl mx-auto">
              Terms and conditions governing our professional services and design work.
            </p>
          </div>
        </div>

        <div className="m-auto max-w-3xl px-3 sm:px-4 md:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="border-l-4 border-green-900 bg-green-50/50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-800">
                Lawn Irrigation Technologies
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Effective for all engagements from the date of booking or acceptance of quote.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-900 text-sm">1</span>
                  The Site Audit (Initial Commitment)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  All projects begin with a Scientific Site Audit at a fee of ZMW 1,000. This fee covers the professional
                  mobilization of our Engineering team. By booking, the Client agrees that this fee is
                  <strong> non-refundable</strong> but is <strong>100% deductible</strong> from the final project
                  installation cost upon award of the installation contract.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-900 text-sm">2</span>
                  Large-Scale Design Policy (Properties &gt; 4,200 m²)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Properties exceeding 4,200 m² require advanced hydraulic calculations and precision quantification.
                  To ensure the integrity of the system, a Design &amp; Quantification fee of <strong>ZMW 3,000</strong> is
                  applicable. Work commences upon receipt of a <strong>50% down payment (ZMW 1,500)</strong>. The balance
                  is due as agreed in the project schedule.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-900 text-sm">3</span>
                  3D Visualization Rights
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our 3D Landscape Designs are premium intellectual property. For standard plots (under 4,200 m²), a
                  fixed fee of <strong>ZMW 4,000</strong> provides the Client with a high-resolution 3D walkthrough and a
                  comprehensive material list. These designs are intended to provide a &quot;Zero-Error&quot; roadmap for the
                  garden. Use, reproduction, or transfer of the designs beyond the agreed scope may be subject to
                  separate licence terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-900 text-sm">4</span>
                  Cancellation &amp; Legal Recourse
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We value technical precision and punctuality. Confirmed appointments (including site audits and
                  site visits) constitute professional commitments. <strong>Late cancellations (with less than 24 hours
                  notice) or &quot;No-Shows&quot;</strong> result in the <strong>immediate forfeiture of the Audit Fee</strong> (or
                  applicable booking fee). Lawn Irrigation Technologies reserves the right to seek legal recourse for
                  &quot;Loss of Opportunity&quot; and recovery of mobilization costs in respect of confirmed large-scale
                  project assessments or other confirmed engagements.
                </p>
              </section>

              <p className="text-sm text-gray-500 mt-10 pt-6 border-t border-gray-200">
                By engaging our services, making a booking, or accepting a quote, the Client is deemed to have
                read, understood, and agreed to these Professional Service &amp; Design Terms. For questions, contact
                us at lawnirrigationtech@gmail.com.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-900 hover:text-green-700"
            >
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;

