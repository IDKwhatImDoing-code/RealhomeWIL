import "./about.scss";
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="aboutPage">
      <div className="hero">
        <h1>About RealHome</h1>
        <p>Your Trusted Partner in Real Estate Since 2007</p>
      </div>
      
      <div className="section ourStory">
        <h2>Our Story</h2>
        <p>Founded in 2007, RealHome began as a small, family-owned business with a vision to revolutionize the real estate industry. Over the past 16 years, we've grown into a leading force in the market, helping thousands of families find their dream homes and investors secure lucrative properties.</p>
      </div>
      
      <div className="section mission">
        <h2>Our Mission</h2>
        <p>At RealHome, our mission is to provide unparalleled service in the real estate industry, ensuring that every client finds their perfect property match. We strive to make the buying, selling, and renting process as smooth and enjoyable as possible, leveraging cutting-edge technology and our team's expertise.</p>
      </div>
      
      <div className="section achievements">
        <h2>Our Achievements</h2>
        <div className="achievementBoxes">
          <div className="box">
            <h3>16+</h3>
            <p>Years of Excellence</p>
          </div>
          <div className="box">
            <h3>20,000+</h3>
            <p>Satisfied Clients</p>
          </div>
          <div className="box">
            <h3>$5B+</h3>
            <p>in Property Sales</p>
          </div>
          <div className="box">
            <h3>50+</h3>
            <p>Industry Awards</p>
          </div>
        </div>
      </div>
      
      <div className="section team">
        <h2>Our Leadership Team</h2>
        <div className="teamMembers">
          <div className="member">
            <img src="/team-member1.jpg" alt="John Doe" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="member">
            <img src="/team-member2.jpg" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Chief Operations Officer</p>
          </div>
          <div className="member">
            <img src="/team-member3.jpg" alt="Mike Johnson" />
            <h3>Mike Johnson</h3>
            <p>Head of Sales</p>
          </div>
        </div>
      </div>
      
      <div className="section testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonialBoxes">
          <div className="testimonial">
            <p>RealHome made finding our dream house a breeze. Their team was professional, knowledgeable, and always available to answer our questions.</p>
            <h4>- Sarah & Tom B.</h4>
          </div>
          <div className="testimonial">
            <p>As a first-time homebuyer, I was nervous about the process. RealHome guided me every step of the way, making it a stress-free experience.</p>
            <h4>- Alex M.</h4>
          </div>
        </div>
      </div>
      
      <div className="section community">
        <h2>Community Involvement</h2>
        <p>At RealHome, we believe in giving back to the communities we serve. We actively participate in local charity events, sponsor youth sports teams, and contribute to housing initiatives for underprivileged families.</p>
      </div>
      
      <div className="section contact">
        <h2>Get in Touch</h2>
        <p>Ready to start your real estate journey with RealHome? Contact us today to speak with one of our experienced agents.</p>
        <Link to="/contact" className="ctaButton">Contact Us</Link>
      </div>
    </div>
  );
}

export default About;