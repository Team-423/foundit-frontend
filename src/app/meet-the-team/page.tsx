export default function MeetTheTeam() {
  const teamMembers = [
    {
      name: "Wan Lok",
      role: "Junior Developer",
      bio: "Hello! I'm Wan, A junior developer with a strange background stemming from Medical Science and have reskilled into tech to pursue my interest and work on some cool and amazing projects!.",
      linkedin: "https://www.linkedin.com/in/wan-lok-17b7aa223/",
      github: "https://github.com/Wanb00",
    },
    {
      name: "Kevin Stephenson",
      role: "Junior Developer",
      bio: "Kevins bio",
      linkedin: "https://www.linkedin.com/in/kevin-stephenson-a1571b357/",
      github: "https://github.com/kevpstephens",
    },
    {
      name: "Carly Zhong",
      role: "Junior Developer",
      bio: "Hi, I am Carly. I was an accountant and now I am transitioning into tech with a deep passion for software development and data engineering. I love using programming to solve real-world problems and create solutions that make life simpler, more efficient, and more human-centred.",
      linkedin: "https://www.linkedin.com/in/carlyzhong/",
      github: "https://github.com/carlyzhong",
    },
    {
      name: "Elzbieta Stankunaite",
      role: "Junior Developer",
      bio: "Fueled by curiosity and a love of solving tricky problems, I’ve gone from helping customers to coding cool stuff through self-learning and Northcoders — and I’m loving every minute of it!",
      linkedin: "https://www.linkedin.com/in/ellie-s-696438317/",
      github: "https://github.com/ell-stan",
    },
    {
      name: "Irina Grigoras",
      role: "Junior Developer",
      bio: "",
      linkedin: "https://www.linkedin.com/in/grigorasirina/",
      github: "https://github.com/grigorasirina",
    },
    {
      name: "Lera Dunning",
      role: "Junior Developer",
      bio: "",
      linkedin: "https://www.linkedin.com/in/leradunning/",
      github: "https://github.com/LeraD98",
    },
    {
      name: "Pourya Azari",
      role: "Junior Developer",
      bio: "Hello! I’m Pourya, a junior developer working with JavaScript frameworks and libraries alongside Node.js. I come from a background in game art and graphic design, which helps me bring a creative edge to problem-solving and user-focused development.",
      linkedin: "https://www.linkedin.com/in/pouryaazari/",
      github: "https://github.com/p021a",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#1ee6091]">
        Meet The Team!
      </h1>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 shadow">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-center text-[#1e6091]">
              {member.name}
            </h2>
            <p className="text-center text-[#168aad] font-medium">
              {member.role}
            </p>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {member.bio}
            </p>
            <a
              href={member.linkedin}
              className="flex justify-center items-center mt-4 text-[#0a66c2] hover:underline"
              target="blank"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="mr-2 text-center"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 
    .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 
    14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.213c.837 
    0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.341-1.248-.821 
    0-1.358.54-1.358 1.248 0 .694.52 1.248 1.326 1.248h.015zm4.908 
    8.213h2.4V9.359c0-.215.016-.43.08-.586.176-.43.576-.875 
    1.248-.875.88 0 1.232.66 1.232 1.63v3.866h2.4V9.25c0-2.22-1.184-3.252-2.764-3.252-1.28 
    0-1.845.7-2.165 1.193h.031v-1.026h-2.4c.03.66 0 7.225 0 7.225z"
                />
              </svg>
              LinkedIn
            </a>
            <a
              href={member.github}
              target="_blank"
              className="flex justify-center items-center gap-2 mt-2 text-gray-800 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 
    3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
    -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 
    2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
    0 0 .67-.21 2.2.82a7.62 7.62 0 0 
    1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 
    2.2-.82.44 1.1.16 1.92.08 
    2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 
    3.75-3.65 3.95.29.25.54.73.54 1.48 
    0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 
    8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
