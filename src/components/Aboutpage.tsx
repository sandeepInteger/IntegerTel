const AboutPage = () => {
  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Avenir Next LT Pro', sans-serif" }}>

      {/* ─── Navbar ─── */}
      {/**<nav className="w-full flex items-center justify-between px-10 py-6 bg-white shadow-sm">
        <span className="text-xl font-bold" style={{ color: "#2B0D3E" }}>
          YourBrand
        </span>
        <div className="flex items-center gap-6">
          {["Home", "About", "Services", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-medium text-sm transition-colors duration-200"
              style={{ color: "#2B0D3E" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7A3F91")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2B0D3E")}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-200"
            style={{ background: "#2B0D3E", color: "#F5F6F7" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#7A3F91")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2B0D3E")}
          >
            Get Started
          </a>
        </div>
      </nav> */}

      {/* ─── Hero Section ─── */}
      <section
        className="relative w-full flex items-center overflow-hidden"
        style={{
          height: "520px",
          background: "linear-gradient(135deg, #2B0D3E 0%, #7A3F91 60%, #C59DD9 100%)",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(43,13,62,0.75), rgba(43,13,62,0.35))",
          }}
        />
        {/* Decorative circle */}
        <div
          className="absolute right-16 top-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            width: 380,
            height: 380,
            background: "#C59DD9",
            filter: "blur(60px)",
          }}
        />
        <div className="relative z-10 pl-20 max-w-2xl">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#C59DD9", letterSpacing: "0.3px" }}
          >
            Who We Are
          </p>
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Avenir Next LT Pro', sans-serif",
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#F5F6F7",
            }}
          >
            Turning Ideas Into
            <br />
            Meaningful Impact
          </h1>
          <p
            className="mb-8"
            style={{
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(245,246,247,0.80)",
            }}
          >
            We are a team of creators, strategists, and technologists dedicated
            to building products that matter.
          </p>
          <a
            href="#"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-200"
            style={{ background: "#C59DD9", color: "#2B0D3E" }}
          >
            Meet the Team
          </a>
        </div>
      </section>

      {/* ─── Mission Section ─── */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Text */}
          <div className="col-span-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#7A3F91", letterSpacing: "0.3px" }}
            >
              Our Mission
            </p>
            <h2
              className="mb-6"
              style={{
                fontSize: "42px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#2B0D3E",
              }}
            >
              We Build With
              <br />
              Purpose
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(43,13,62,0.80)",
              }}
              className="mb-4"
            >
              Our mission is to craft digital experiences that don't just look
              beautiful — they drive real, measurable results for the businesses
              and communities we serve.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(43,13,62,0.60)",
              }}
            >
              Founded in 2018, we have partnered with over 200 companies across
              industries, helping them transform complex challenges into elegant
              solutions.
            </p>
          </div>

          {/* Stats */}
          <div className="col-span-6 grid grid-cols-2 gap-6">
            {[
              { stat: "200+", label: "Clients Served" },
              { stat: "7 Yrs", label: "Industry Experience" },
              { stat: "98%", label: "Client Satisfaction" },
              { stat: "40+", label: "Team Members" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="rounded-[14px] p-8 text-center"
                style={{
                  background: "#F2EAF7",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <p
                  className="font-bold mb-1"
                  style={{ fontSize: "32px", color: "#2B0D3E" }}
                >
                  {stat}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(43,13,62,0.60)",
                    letterSpacing: "0.3px",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values Section ─── */}
      <section style={{ background: "#F2EAF7" }}>
        <div className="max-w-[1280px] mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#7A3F91", letterSpacing: "0.3px" }}
            >
              Core Values
            </p>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#2B0D3E",
              }}
            >
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {[
              {
                icon: "✦",
                title: "Integrity",
                desc:
                  "We hold ourselves accountable and operate with radical transparency — with clients and with each other.",
              },
              {
                icon: "◈",
                title: "Innovation",
                desc:
                  "Curiosity is our default. We question assumptions and explore bold ideas before settling on solutions.",
              },
              {
                icon: "⬡",
                title: "Impact",
                desc:
                  "Every decision is filtered through a single question: does this create meaningful, lasting value?",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="col-span-4 rounded-[14px] p-8 text-left transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-6"
                  style={{ background: "#2B0D3E", color: "#C59DD9" }}
                >
                  {icon}
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#2B0D3E",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "rgba(43,13,62,0.60)",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#7A3F91", letterSpacing: "0.3px" }}
          >
            The People
          </p>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#2B0D3E",
            }}
          >
            Meet Our Team
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {[
            { name: "Ananya Sharma", role: "Co-Founder & CEO", initials: "AS" },
            { name: "Rohan Mehta", role: "Head of Design", initials: "RM" },
            { name: "Priya Iyer", role: "Lead Engineer", initials: "PI" },
            { name: "Karan Bose", role: "Strategy Director", initials: "KB" },
          ].map(({ name, role, initials }) => (
            <div
              key={name}
              className="col-span-3 rounded-[14px] p-8 text-center transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "#F2EAF7",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Avatar placeholder — replace with 1:1 AI images */}
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-xl font-bold"
                style={{ background: "#7A3F91", color: "#F5F6F7" }}
              >
                {initials}
              </div>
              <h3
                className="mb-1"
                style={{ fontSize: "18px", fontWeight: 600, color: "#2B0D3E" }}
              >
                {name}
              </h3>
              <p
                style={{ fontSize: "13px", color: "rgba(43,13,62,0.60)", letterSpacing: "0.3px" }}
              >
                {role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section
        className="py-24 text-center"
        style={{ background: "#2B0D3E" }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <h2
            className="mb-6"
            style={{
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#F5F6F7",
            }}
          >
            Ready to Work Together?
          </h2>
          <p
            className="mb-10 max-w-xl mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(245,246,247,0.80)" }}
          >
            Let's start a conversation about your next big idea.
          </p>
          <a
            href="#"
            className="inline-block text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-200"
            style={{ background: "#7A3F91", color: "#F5F6F7" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C59DD9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7A3F91")}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: "#2B0D3E", color: "#F5F6F7", padding: "64px" }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <p className="text-lg font-bold mb-3">YourBrand</p>
            <p style={{ fontSize: "16px", color: "rgba(245,246,247,0.60)", lineHeight: 1.7 }}>
              Building digital experiences that drive real impact.
            </p>
          </div>
          <div className="col-span-2 col-start-7">
            <p className="font-semibold mb-4" style={{ fontSize: "13px", letterSpacing: "0.3px" }}>
              Company
            </p>
            {["About", "Services", "Careers", "Blog"].map((l) => (
              <p key={l} className="mb-2" style={{ fontSize: "16px", color: "rgba(245,246,247,0.60)" }}>
                {l}
              </p>
            ))}
          </div>
          <div className="col-span-2">
            <p className="font-semibold mb-4" style={{ fontSize: "13px", letterSpacing: "0.3px" }}>
              Connect
            </p>
            {["LinkedIn", "Twitter", "Instagram", "Dribbble"].map((l) => (
              <p key={l} className="mb-2" style={{ fontSize: "16px", color: "rgba(245,246,247,0.60)" }}>
                {l}
              </p>
            ))}
          </div>
        </div>
        <div
          className="max-w-[1280px] mx-auto mt-12 pt-8 flex justify-between"
          style={{ borderTop: "1px solid rgba(245,246,247,0.15)", fontSize: "13px", color: "rgba(245,246,247,0.40)" }}
        >
          <span>© 2026 YourBrand. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;