'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const industries = [
{
  title: 'Security & Facilities',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_11c1d13fc-1785550297802.png",
  alt: 'Security professional in uniform at a corporate building entrance, UK office building exterior, professional security presence',
  roles: ['Security officers', 'Door supervisors', 'Site guards', 'Corporate reception'],
  icon: 'ShieldCheckIcon'
},
{
  title: 'Logistics & Warehousing',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3494f48-1772541068284.png",
  alt: 'Modern UK warehouse interior with workers operating, bright lighting, organised logistics environment',
  roles: ['Warehouse operatives', 'Pickers/packers', 'Forklift operators', 'Stock control'],
  icon: 'TruckIcon'
},
{
  title: 'Hospitality & Catering',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_198a71793-1773232115350.png",
  alt: 'Professional hospitality staff serving at a corporate event, elegant table setting, front-of-house service',
  roles: ['Event staff', 'Kitchen assistants', 'Front-of-house', 'Floor staff'],
  icon: 'SparklesIcon'
},
{
  title: 'Healthcare & Social Care',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_10c945f5d-1784580521819.png",
  alt: 'Healthcare support worker in a care facility, bright clinical environment, professional care setting',
  roles: ['Support roles', 'Care assistants', 'Administrative support', 'Compliance-verified roles'],
  icon: 'HeartIcon'
},
{
  title: 'Facilities & Cleaning',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1120d767b-1786319157185.png",
  alt: 'Professional commercial cleaner in a modern UK office building, clean bright environment, professional equipment',
  roles: ['Commercial cleaners', 'Industrial cleaners', 'Facilities maintenance', 'Site services'],
  icon: 'BuildingOfficeIcon'
},
{
  title: 'Office & Administration',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc420a95-1772191564593.png",
  alt: 'Modern UK office environment with administrative professionals working at desks, bright open-plan workspace',
  roles: ['Administrative assistants', 'Data entry clerks', 'Receptionists', 'Customer support'],
  icon: 'ComputerDesktopIcon'
}];


export default function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background" aria-label="Industries we serve">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">Sectors</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Industries We Serve</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From security and logistics to healthcare and office administration, we provide workforce solutions across key UK sectors.
          </p>
        </div>

        {/* BENTO GRID: 6 cards */}
        {/* Row 1: [col-1: Security cs-1] [col-2: Logistics cs-1] [col-3: Hospitality cs-1] */}
        {/* Row 2: [col-1: Healthcare cs-1] [col-2: Facilities cs-1] [col-3: Office cs-1] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) =>
          <div
            key={ind.title}
            className={`fade-up stagger-${Math.min(i + 1, 6)} group relative rounded-2xl overflow-hidden card-lift shadow-card cursor-default`}>
            
              <div className="relative h-52 overflow-hidden">
                <AppImage
                src={ind.img}
                alt={ind.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Icon name={ind.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-card p-5 border border-border border-t-0 rounded-b-2xl">
                <h3 className="font-bold text-base text-primary mb-3">{ind.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {ind.roles.map((role) =>
                <span key={role} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                      {role}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}