import Header from "./Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
        {/* Intro Section */}
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700">
            About NoteStack
          </h2>
          <h3 className="mt-4 text-lg md:text-xl italic text-gray-700">
            "Notes that Connect, Knowledge that Empowers."
          </h3>
          <p className="mt-4 bg-blue-100 text-gray-800 rounded-full py-3 px-6 inline-block max-w-2xl mx-auto">
            Built for students who prefer quiet learning, need help but hesitate
            to ask, or love sharing knowledge. NoteStack is a space where
            everyone can thrive academically through collaboration.
          </p>
        </section>

        {/* What is NoteStack */}
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mb-8">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            📚 What is NoteStack?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            NoteStack is a student-powered platform to upload, discover, and
            share academic notes effortlessly. Whether you're preparing for
            exams, reviewing missed classes, or exploring new topics — NoteStack
            provides peer-contributed content tailored for student needs.
          </p>
        </section>

        {/* Vision */}
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            🎯 Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We're building a bridge between students by creating a central hub
            for sharing notes and learning materials. Our goal is to foster a
            peer-to-peer learning culture where collaboration helps everyone
            succeed.
          </p>
        </section>

        {/* Mission */}
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            🌟 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To make academic resources accessible and shareable across
            institutions. We believe knowledge grows when shared — and NoteStack
            is built to make learning more inclusive, efficient, and
            student-centered.
          </p>
        </section>

        {/* Features + Unique Approach */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              🚀 Key Features
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Upload and download academic notes with ease</li>
              <li>Browse by course, subject, and semester</li>
              <li>Like, comment, and engage with peers</li>
              <li>Clean, distraction-free interface</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              💡 Our Unique Approach
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Free, fast, and student-first platform</li>
              <li>Peer-reviewed notes with admin moderation</li>
              <li>Mobile-friendly and fully responsive</li>
              <li>Built by students, for students</li>
            </ul>
          </div>
        </section>

        {/* Who it's for */}
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            👥 Who Is It For?
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              <strong>College Students:</strong> Across all years and
              disciplines
            </li>
            <li>
              <strong>Busy Learners:</strong> Seeking quick, reliable notes
            </li>
            <li>
              <strong>Knowledge Sharers:</strong> Who love to contribute and
              help others
            </li>
            <li>
              <strong>Academic Explorers:</strong> Looking for verified
              resources
            </li>
          </ul>
        </section>

       
      </div>
    </>
  );
};

export default About;