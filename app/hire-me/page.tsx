'use client';

import Info from './info.mdx';

import SkillMatchingWizard from '@/components/skill-matching-wizard';

const SkillMatchingBoard = () => {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-xl">
      <div className="rounded-lg bg-white p-8 shadow-inner">
        <div className="prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
            Hello dear stranger!
          </h1>

          <p>
            It seems you have an interesting job offer for me, and I directed
            you here.{' '}
            <strong>
              It's a fortunate coincidence, as I'm currently seeking new
              opportunities!
            </strong>
          </p>

          <p>
            I appreciate your interest in me as a candidate. I value your time
            as much as I value my own, so let's make the most of it. I receive a
            great number of messages on <strong>LinkedIn</strong>, almost all of
            which are irrelevant. To streamline this process, I've created this
            introduction.
          </p>

          <p>
            My name is <strong>Yuri</strong>, and I'm a{' '}
            <strong>Web Developer</strong> with more than 10 years of experience
            in the field.
          </p>

          <p>Previously, I worked as a</p>
          <ul>
            <li>
              Developer at <strong>Matrix Requirements GmbH</strong>, where I
              contributed to modernizing legacy codebases, implemented React
              microfrontends, and participated in the development of an in-house
              UI library and adoption of a monorepo structure.
            </li>
            <li>
              Engineering manager and Tech Lead at <strong>Igluu</strong> where
              I had a key role in building the team, establishing development
              processes, and enhancing the platform's user experience for a
              seamless home buying and renting journey.
            </li>
            <li>
              Developer at <strong>LiveScore.com</strong> where my team and I
              were building a better version of the web using top-notch frontend
              technologies and tools.
            </li>
            <li>
              Tech Lead at <strong>Oak's Lab</strong>. I led teams of Software
              Engineers both in the Web and Mobile fields.
            </li>
          </ul>

          <p>
            All I expect you to do is to meet only a few criteria before you're
            going to contact me and offer a new role. Let's see how well we
            match!
          </p>
        </div>

        <SkillMatchingWizard />

        <div className="prose prose-sm mx-auto mt-8 sm:prose lg:prose-lg xl:prose-xl">
          <p>
            Checked every point above carefully and you are pretty sure that{' '}
            <em>I'm the guy</em> and <em>you are that 1%</em>? Please drop me an
            email at <strong>yuri@nezdemkovski.com</strong> or book a quick call
            in my <strong>Calendar</strong>.
          </p>

          <p>
            P.S. These are the technologies I use on a daily basis (mmm,
            buzzwords): JavaScript, TypeScript, React.js, Node.js, Next.js,
            Styled-components, Tailwind, Apollo Client/Urql, GraphQL, GraphQL
            Code Generator, SQL/NoSQL databases, Prisma, AWS, Supabase, Google
            Cloud.
          </p>

          <p>
            Cheers,
            <br />
            Yuri Nezdemkovski
          </p>
        </div>
      </div>
    </div>
  );
};

const HireMePage = () => {
  return (
    <main className="prose prose-lg m-6 mx-auto max-w-3xl">
      <SkillMatchingBoard />
    </main>
  );
};

export default HireMePage;
