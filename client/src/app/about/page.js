// pages/about-us.js
import Head from "next/head";
import styles from "@/css/button.module.css";
import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: "500px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/1676564035808-76KOYKMHNT3C0KDTHMA1/unsplash-image-Zyx1bK9mqmA.jpg?format=1500w")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 style={{ color: "white", fontWeight: "normal" }}>
          Meet Our Core Members.
        </h2>
        <br />
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "lighter",
          }}
        >
          Below, you will find the people behind Senpage Consulting's core
          management teams. <br />
          These individuals are responsible for overseeing the internal and
          external operations of Senpage. <br />
          Their tasks include building relationships with clients, assembling
          consulting teams, recruiting new volunteers, guiding our outbound
          communications, and more.
          <br />
        </p>
      </div>

      <div className="container my-5" style={{ padding: 0 }}>
        {/* Meet Our Core Members */}
        <section className="my-5">
          <br />
          <div className="row">
            {/* Repeat this structure for each member */}
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/2d187376-e609-4b27-9f8e-0f6a6ff96430/photo.jpeg?format=750w"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Sean Vincent</h5>
                    <span>Co-Founder & Project Team Director</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                      As the head of Senpage's Project Team, Sean's role is to
                      translate objectives into actionable plans by enriching
                      our talent pool, identifying prospective clients, and
                      assembling effective project teams. He holds an MSc.
                      Business, Language, and Culture from Copenhagen Business
                      School.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/seanvincentjr/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="\..\images\marco.png"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Marco Constantinou</h5>
                    <span>Project Team Lead</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                      As a Project Team Lead, Marco’s role is to ensure
                      effective communication with the clients and support
                      consultants in the planning, execution, and evaluation of
                      projects. He holds an MSc. in Strategic Management and
                      Digital Innovation from the Technical University of
                      Denmark.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/marco-barfoed-constantinou/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e277228d-9477-42f5-91bb-f13579011564/Nandita.jpeg?format=750w"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Nandita Parikh</h5>
                    <span>Project Team Lead</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                      As a Project Team Lead, Nandita’s role is to ensure
                      seamless communications with the client while supporting
                      the consulting teams in the execution and delivery of
                      their project. She holds an MBA specialising in Marketing
                      and Finance from IIPM, India.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/nandita-parikh-aa402123b/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Member Structure */}
          </div>
        </section>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: "500px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/1676571588882-AWQF8TZVC69RQAKRYV0S/unsplash-image-KdeqA3aTnBY.jpg?format=1500w")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 style={{ color: "white", fontWeight: "normal" }}>
          Meet our consultants.
        </h2>
        <br />
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "lighter",
          }}
        >
          Here is Senpage Consulting’s roster of incredibly talented volunteer
          consultants. As our mission is to develop solutions for startups and
          organisations operating in a variety of industries, we try to recruit
          consultants from a diverse range of academic and professional
          backgrounds to serve on our project teams. You can learn about each
          volunteer below.
          <br />
        </p>
      </div>
      {/* Meet Our Consultants */}
      <div className="container my-5" style={{ padding: 0 }}>
        <section className="my-5">
          <div className="row">
            {/* Repeat this structure for each consultant */}
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/84d9ef9a-c982-4711-bfbc-1111bf8706e5/Anna-Laura+Bonk.jpg?format=750w"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Anna-Laura Bonk</h5>
                    <span>Consultant</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                      Laura is an MSc. Business, Language, and Culture student
                      at Copenhagen Business School. She is interested in
                      applying her research on sustainable business models, as
                      well as her experience in management and business
                      development, towards startups making a positive impact.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/anna-laura-bonk-76a316134/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/3f8c4682-f91a-4a30-a690-a31a69fd2eb2/1679599821856.jpg?format=750w"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Luca Buchwald</h5>
                    <span>Consultant</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                      Luca is an MA Sustainable Tourism student at Aalborg
                      University and has a background in International
                      Hospitality and Management. Drawing from his experience in
                      regenerative tourism, he strives to provide solutions to
                      startups that go beyond sustainability.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/lucamessinabuchwald/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
                {/* End of Consultant Structure */}
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6387732c01792d359b954e6f/e0d28431-3077-4954-a533-757a8f585c00/1660401647895.jpeg?format=750w"
                    className="card-img-top"
                    alt="Member Name"
                    style={{
                      borderRadius: "50%",
                      width: "300px",
                      height: "300px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div>
                    <h5 className="card-title">Robert Bunzel</h5>
                    <span>Consultant</span>
                  </div>
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="card-text">
                    Robert is an MSc. Psychology graduate from the University of Vienna and specialises in Environmental Psychology research. He aims to leverage his project and stakeholder management skills toward finding creative solutions for sustainable startups.
                    </p>
                    <a
                      className={styles.a}
                      href="https://www.linkedin.com/in/robert-bunzel/"
                      target="_blank"
                    >
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Consultant Structure */}
          </div>
        </section>
      </div>

      {/* Add more sections as needed */}
    </>
  );
}
