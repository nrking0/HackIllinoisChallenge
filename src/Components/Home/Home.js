import React from 'react';
import './Home.css';


const Home = (props) => {
    return(
        <>
        <div className="root">
        <h1>HackIllinois</h1>

        <div className="below">
          <h1>What we are about!</h1>
          <p>Students Meet was inspired from the lack of virtual collaboration students can utilize, especially
          during COVID-19. This application seeks to open up an opportunity for students to help each other academically
          and socially. Not only will this open up learning from a variety of experienced individuals, but it will also
          allow students to make a diverse and widespread group of friends while increasing their network connections. Students Meet
          streamlines the process of getting help while taking a portion of the burden of teaching off of teachers who are already
          overburdened due to the virtual environment.
          </p>
          <div className="about">
            <div className="aboutH">About the Project</div>
            <p>Students Meet's tech stack includes PERN Stack (PostgreSQL, Express, React Native, Node.js), Material UI, React Router,
            and React Icons. The prime functionality is broken into two main parts: Finding a mentor and Becoming a mentor. By creating
            a database from scratch, we were able to create a small potential of what Students Meet could be. The form includes a diverse
            series of courses with a large potential for mass expansion. On the search component, finding a mentor utilizes a
            personally designed algorithm that takes the search queries and matches and ranks mentors according to the queries. This
          is visible within the table's color ranking system that displays green, yellow, and red based on the quality of the match. </p>
          <div style={{fontSize: '50px', textAlign: 'center', paddingTop: '11%'}}>A Look to the Future</div>
         
          <div className="vision">As the COVID-19 pandemic continues to rage on across the world, every facet of our life is continually being
            forced to adapt. Students Meet provides a framework that can allow students to collaborate in a socially distanced
            world. What is currently a website for class help could easily expand to provide mentorship across every part of our
            lives. Coupling our website with more advanced technologies, such as machine learning, in the future could allow quicker
            and more expansive collaboration. Additionally, once people have met a mentor, a chatting or blogging system could easily
            be added to the website in the future to further bolster communication and the exchange of ideas. Whether it is preparing
            for the LSAT or learning about local activist groups, Students Meet has the ability to grow into a website that can positively
            influence just about anyone!</div>
          <p></p>
          </div>
          <div className="image">
          </div>
        </div>
      </div>
      </>
    )
};

export default Home;