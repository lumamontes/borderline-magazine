export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  backgroundColor: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Enling',
    role: 'Editor',
    bio: 'Enling Liao is a university student in Australia studying Politics, Philosophy, & Economics and Applied Data Analytics. She has been a Community Ambassador for Write the World and is also currently a Web Content Intern at Sine Theta Magazine. She loves early mornings, oranges, mountains, and fresh green vegetables.',
    image: '/src/assets/flower.png',
    backgroundColor: '#82BD99',
  },
  {
    name: 'Luana',
    role: 'Designer',
    bio: "Luana Góes is a mixed media artist and designer from Brazil. Born in 2002, she is from the Amazon region (Amapá) and has a twin sister, Luma, who coded this website! When not doing anything creative, you can find her playing electric guitar and watching women's sports. Her favorite musicians are Little Simz and Warpaint.",
    image: '/src/assets/flower.png',
    backgroundColor: '#FCEDD2',
  },
  {
    name: 'Myra',
    role: 'Editor',
    bio: 'Myra Kamal is a college student from Arizona. She was named the 2021-2022 Phoenix Youth Poet Laureate. In her free time, she loves to bike, read chapbook gems, or drink a hot bowl of soup on the rare rainy day.',
    image: '/src/assets/flower.png',
    backgroundColor: '#F9BB7C',
  },
];

