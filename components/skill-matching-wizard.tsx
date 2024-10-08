import React, { useState } from 'react';
import {
  Check,
  X,
  CalendarDays,
  Zap,
  Code,
  Building,
  Globe,
  DollarSign,
  Users,
  Brain,
  Binary,
} from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  required: boolean;
}

interface MatchedSkills {
  [key: number]: boolean;
}

const SkillMatchingWizard: React.FC = () => {
  const [matchedSkills, setMatchedSkills] = useState<MatchedSkills>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const skills: Skill[] = [
    {
      id: 1,
      name: "Our company's stack is based on JavaScript, particularly React.js, Node.js",
      description:
        "Your tech stack aligns with my expertise in JavaScript. I am proficient in React.js, while my backends typically employ a powerful Node.js + GraphQL combo. I'm also proficient in REST and gRPC APIs. Naturally, all my projects are built with TypeScript. Additionally, I'm comfortable with various cloud platforms and languages like Python and Go.",
      icon: Code,
      required: true,
    },
    {
      id: 2,
      name: 'We are developing our own product',
      description:
        "Your organization is dedicated to building and evolving its own products, not an outsourcing agency. I'm seeking a role where I can have a meaningful, long-term impact on product development.",
      icon: Building,
      required: true,
    },
    {
      id: 3,
      name: 'We are open to fully remote work arrangements',
      description:
        'The company has the capability to operate seamlessly in a fully remote environment. As working across various countries and time zones becomes increasingly prevalent, I am eager to contribute my expertise in establishing an async-first culture.',
      icon: Globe,
      required: true,
    },
    {
      id: 4,
      name: 'Our compensation package is within the range of 500 EUR/day (or 125,000 EUR/year)',
      description:
        'My usual daily rate starts at 500 EUR (12k CZK) or 125,000 EUR/year. I operate under a Czech entity, which allows for flexible B2B arrangements — this is my preferred way of collaboration.',
      icon: DollarSign,
      required: true,
    },
    {
      id: 5,
      name: 'We offer technical leadership roles',
      description:
        "At this stage in my career, I'm seeking roles that combine hands-on development with technical leadership, such as Tech Lead or Engineering Manager positions. I find great satisfaction in balancing coding with guiding and mentoring teams.",
      icon: Users,
      required: false,
    },
    {
      id: 6,
      name: 'Our company uses or plans to use AI and LLMs as part of our development process',
      description:
        'Your company values the integration of AI and LLMs in work processes, recognizing their potential to enhance productivity and innovation.',
      icon: Brain,
      required: false,
    },
    {
      id: 7,
      name: 'We actively contribute to Open Source projects',
      description:
        "I'm a passionate supporter of the Open Source philosophy, and I'm looking for a job and colleagues who share my enthusiasm. I look forward to collaborating on Open Source projects and contributing to the community together!",
      icon: Binary,
      required: false,
    },
  ];

  const handleMatch = (id: number): void => {
    setMatchedSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkMatch = (): void => {
    setShowResult(true);
  };

  const matchedCount: number =
    Object.values(matchedSkills).filter(Boolean).length;
  const matchedNiceToHaveCount: number = skills.filter(
    (skill) => !skill.required && matchedSkills[skill.id],
  ).length;
  const allRequiredMatched: boolean = skills.every(
    (skill) => !skill.required || matchedSkills[skill.id],
  );

  return (
    <div className="mt-8 rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-center text-2xl font-bold text-blue-600">
        Company-Candidate Matching
      </h3>
      <p className="mb-4 text-center text-gray-600">
        Please answer the following questions about your company:
      </p>
      <div className="grid gap-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.id}
              className={`cursor-pointer rounded-lg p-5 transition-all duration-300 ${
                matchedSkills[skill.id]
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white'
              } relative border-2 hover:shadow-md`}
              onClick={() => handleMatch(skill.id)}
            >
              {!skill.required && (
                <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-yellow-400 px-2 py-1 text-xs text-white">
                  Nice to have
                </div>
              )}
              <div className="flex items-start">
                <Icon className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <div className="flex-grow">
                  <h4 className="mb-1 mt-0.5 font-bold">{skill.name}</h4>
                  <p className="m-0 text-sm text-gray-600">
                    {skill.description}
                  </p>
                </div>
              </div>
              {matchedSkills[skill.id] && (
                <div className="absolute bottom-2 right-2">
                  <Check className="text-green-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={checkMatch}
          className="rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-600"
        >
          Check Compatibility
        </button>
      </div>

      {showResult && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-4 text-center text-2xl font-bold text-blue-600">
            Compatibility Results
          </h3>
          <p className="mb-4 text-center text-lg">
            Your company matches {matchedCount} out of {skills.length} criteria
            (including {matchedNiceToHaveCount} nice-to-have).
          </p>
          {allRequiredMatched ? (
            <div className="mb-4 flex items-center justify-center text-green-600">
              <Zap className="mr-2" />
              <span className="text-lg font-semibold">
                {matchedCount === skills.length
                  ? "Perfect match! Let's schedule a call to discuss the opportunity."
                  : "Great match on required criteria! Let's discuss the details further."}
              </span>
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-center text-yellow-600">
              <X className="mr-2" />
              <span className="text-lg font-semibold">
                We might not be a perfect match, but feel free to schedule a
                call if you'd like to discuss the position further.
              </span>
            </div>
          )}
          <button className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
            <CalendarDays className="mr-2" />
            Schedule a Call
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillMatchingWizard;
