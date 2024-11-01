// src/routes/AgentsPage.jsx
import React from "react";
import "./agents.scss";

// Dummy data for agents
const agentsData = [
  {
    id: 1,
    name: "John Doe",
    image:
      "/team-member1.jpg",
    achievements: [
      "Top Seller 2021",
      "Best Customer Service 2020",
      "Real Estate Agent of the Year 2019",
    ],
    praises: [
      "John was fantastic! He helped us find our dream home.",
      "Very knowledgeable and professional. Highly recommend!",
      "John made the buying process so smooth and easy.",
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    image:
      "/team-member2.jpg",
    achievements: [
      "Most Properties Sold 2021",
      "Client Satisfaction Award 2020",
    ],
    praises: [
      "Jane was a pleasure to work with. She was always available for questions.",
      "Her expertise in the market is unmatched!",
    ],
  },
  {
    id: 3,
    name: "Mike Johnson",
    image:
      "/team-member3.jpg",
    achievements: ["Rising Star Award 2021", "Best Negotiator 2020"],
    praises: [
      "Mike's negotiation skills saved us thousands!",
      "He really cares about his clients.",
    ],
  },
];

const Agents = () => {
  return (
    <div className="agentsPage">
      <h1>Meet Our Agents</h1>
      <div className="agentsContainer">
        {agentsData.map((agent) => (
          <div className="agentCard" key={agent.id}>
            <img src={agent.image} alt={agent.name} className="agentImage" />
            <h2>{agent.name}</h2>
            <h3>Achievements:</h3>
            <ul>
              {agent.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
            <h3>Praises from the Community:</h3>
            <ul>
              {agent.praises.map((praise, index) => (
                <li key={index}>{praise}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
