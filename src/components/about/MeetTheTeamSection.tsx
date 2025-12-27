'use client';

import { Reveal } from '../animations/Reveal';
import { useCursorFollow } from '../animations/useCursorFollow';
import { teamMembers } from '../../data/team';

export function MeetTheTeamSection() {
  const { setHoveredImage, CursorImage } = useCursorFollow();

  return (
    <>
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950">
        {/* Elegant top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" aria-hidden="true" />
        
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-24 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
              Meet the team
            </h2>
          </Reveal>

          <div className="space-y-0">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
                index={index}
                isLast={index === teamMembers.length - 1}
                onHover={() => setHoveredImage(member.image)}
                onLeave={() => setHoveredImage(null)}
              />
            ))}
          </div>
        </div>
      </section>
      <CursorImage />
    </>
  );
}

interface TeamMemberCardProps {
  member: typeof teamMembers[0];
  index: number;
  isLast: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function TeamMemberCard({ member, index, isLast, onHover, onLeave }: TeamMemberCardProps) {
  return (
    <div
      className="relative group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Elegant divider between members */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-200 dark:bg-zinc-800 transition-opacity duration-300 group-hover:opacity-50" aria-hidden="true" />
      )}

      <div className="py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
          {/* Name and Role Section */}
          <Reveal delay={index * 0.1}>
            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                {member.name}
              </h3>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium uppercase tracking-wider text-sm">
                {member.role}
              </p>
            </div>
          </Reveal>

          {/* Bio Section */}
          <Reveal delay={index * 0.1 + 0.05}>
            <div className="pt-2">
              <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl">
                {member.bio}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
