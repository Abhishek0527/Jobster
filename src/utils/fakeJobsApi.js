const fakeJobs = [
  {
    _id: 'job-1',
    title: 'Frontend Developer',
    company: 'Pixel Forge',
    location: 'Bangalore',
    experienceRequired: 'yes',
    description:
      'Build responsive React interfaces, collaborate with design, and improve component quality across a hiring platform.',
    employmentType: 'full-time',
  },
  {
    _id: 'job-2',
    title: 'Backend Engineer',
    company: 'DataNest Labs',
    location: 'Hyderabad',
    experienceRequired: 'yes',
    description:
      'Design APIs, work with Node.js services, and support secure integrations for partner dashboards.',
    employmentType: 'full-time',
  },
  {
    _id: 'job-3',
    title: 'QA Analyst',
    company: 'Verity Systems',
    location: 'Pune',
    experienceRequired: 'no',
    description:
      'Write test cases, validate releases, and report issues clearly across web application workflows.',
    employmentType: 'full-time',
  },
  {
    _id: 'job-4',
    title: 'UI Designer',
    company: 'Northstar Studio',
    location: 'Mumbai',
    experienceRequired: 'yes',
    description:
      'Create user-focused layouts, improve product polish, and hand off production-ready interface specs.',
    employmentType: 'hybrid',
  },
  {
    _id: 'job-5',
    title: 'Junior React Developer',
    company: 'AppMint',
    location: 'Chennai',
    experienceRequired: 'no',
    description:
      'Support feature delivery, fix UI bugs, and learn modern frontend workflows with mentoring.',
    employmentType: 'full-time',
  },
  {
    _id: 'job-6',
    title: 'DevOps Associate',
    company: 'Cloud Harbor',
    location: 'Noida',
    experienceRequired: 'yes',
    description:
      'Assist with CI/CD pipelines, deployment monitoring, and environment stability for internal products.',
    employmentType: 'remote',
  },
  {
    _id: 'job-7',
    title: 'Product Support Executive',
    company: 'Helplane',
    location: 'Kolkata',
    experienceRequired: 'no',
    description:
      'Resolve product issues, guide customers, and document common troubleshooting flows.',
    employmentType: 'full-time',
  },
  {
    _id: 'job-8',
    title: 'Data Analyst',
    company: 'InsightBloom',
    location: 'Gurgaon',
    experienceRequired: 'yes',
    description:
      'Prepare reports, analyze hiring funnel data, and surface recommendations for team leads.',
    employmentType: 'hybrid',
  },
  {
    _id: 'job-9',
    title: 'Technical Content Writer',
    company: 'DocsBridge',
    location: 'Remote',
    experienceRequired: 'no',
    description:
      'Write concise technical guides, onboarding docs, and release notes for software teams.',
    employmentType: 'remote',
  },
  {
    _id: 'job-10',
    title: 'Full Stack Developer',
    company: 'BrightLoop Tech',
    location: 'Ahmedabad',
    experienceRequired: 'yes',
    description:
      'Work across frontend and backend features, maintain APIs, and contribute to product architecture.',
    employmentType: 'full-time',
  },
];

export const getFakeJobs = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(fakeJobs), 400);
  });

export const submitFakeApplication = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        referenceId: `APP-${Date.now()}`,
        payload,
      });
    }, 600);
  });
