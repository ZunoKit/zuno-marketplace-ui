import { TeamMemberCard } from "@/modules/mint/mint-nft/TeamMemberCard";
interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio?: string;
  linkedinUrl?: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Meet the team
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            title={member.title}
            image={member.image}
            bio={member.bio}
            linkedinUrl={member.linkedinUrl}
          />
        ))}
      </div>
    </div>
  );
};
