import React from 'react';
import { Link } from 'react-router-dom';

const ITEMS = [
  {
    title: 'Scientific approach',
    desc: 'Every project starts with a proper site audit: soil, water pressure and hydraulics—so your system is designed for your conditions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Precision design',
    desc: '3D visualisation and CAD blueprints mean you see the result before we dig—zero surprises, every detail quantified.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Water-smart systems',
    desc: 'Smart controllers, rain sensors and zone design reduce waste and keep your landscape healthy with less water.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Handover & support',
    desc: 'We train you on your system and stay available for maintenance and after-sales—so your investment lasts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-gray-50 to-white" data-aos="fade-up">
      <div className="m-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold uppercase tracking-widest text-sm">Why LIT</p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
            Why choose Lawn Irrigation Technologies
          </h2>
          <div className="w-20 h-0.5 bg-green-900 rounded-full mx-auto mt-3" />
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            From audit to handover, we combine science, design and support so your landscape thrives.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="card-3d bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-100 group"
            >
              <div className="w-14 h-14 rounded-xl bg-green-900 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/about"
            className="btn-3d inline-flex items-center gap-2 text-green-900 font-semibold hover:text-green-700"
          >
            Meet our team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

