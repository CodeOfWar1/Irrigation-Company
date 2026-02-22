import React from 'react';

const STATS = [
  { value: '14+', label: 'Years experience', sub: 'in irrigation & design' },
  { value: '100+', label: 'Projects delivered', sub: 'residential to commercial' },
  { value: 'Scientific', label: 'Site audit first', sub: 'soil, water & hydraulics' },
  { value: 'Zambia', label: 'Based in Lusaka', sub: 'serving nationwide' },
];

const StatsBar = () => {
  return (
    <section className="relative py-10 sm:py-12 bg-white border-y border-gray-100" data-aos="fade-up">
      <div className="m-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center float-3d" style={{ animationDelay: `${i * 0.2}s` }}>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-gray-800">{stat.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

