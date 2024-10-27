export default function AboutAndFeature() {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-4 py-6 mx-auto flex flex-col lg:flex-row">
          {/* Features Section */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Explore Our <br /> Awesome Components
            </h1>
            <div className="mt-2 flex">
              <span className="inline-block w-32 h-1 bg-blue-500 rounded-full" />
              <span className="inline-block w-2 h-1 ml-1 bg-blue-500 rounded-full" />
              <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
            </div>
            <div className="mt-6 xl:mt-8 lg:flex lg:items-center">
              <div className="grid w-full grid-cols-1 gap-6 xl:gap-12 md:grid-cols-2">
                {/* Individual Feature Cards */}
                <FeatureCard title="New Components" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                <FeatureCard title="Elegant Dark Mode" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." iconPath="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <FeatureCard title="Easy to Customize" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." iconPath="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                <FeatureCard title="Simple & Clean Designs" description="Lorem ipsum dolor sit amet consectetur adipisicing elit." iconPath="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </div>
            </div>
          </div>
  
          {/* Divider (Vertical Line) */}
          <div className="w-px bg-gray-300 dark:bg-gray-600 mx-6"></div>
  
          {/* About Us Section */}
          <div className="w-full lg:w-1/2 pl-8">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              About HeadlineAI
            </h1>
            <div className="mt-1">
              <span className="inline-block w-32 h-1 bg-blue-500 rounded-full" />
              <span className="inline-block w-2 h-1 ml-1 bg-blue-500 rounded-full" />
              <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              HeadlineAI is an AI-powered news platform that delivers the latest updates using a conversational interface.
            </p>
            <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
              <li>✓ Real-time news insights powered by AI.</li>
              <li>✓ User-friendly chat interface for news conversations.</li>
              <li>✓ Personalized news feed based on preferences.</li>
              <li>✓ Secure login for a customized experience.</li>
              <li>✓ Multi-source news aggregation for diverse viewpoints.</li>
              <li>✓ Daily updates to keep users informed.</li>
              <li>✓ Notifications for breaking news alerts.</li>
              <li>✓ Option to save favorite articles for later reading.</li>

            </ul>
          </div>
        </div>
      </section>
    );
  }
  
  // Helper Component for Feature Card
  const FeatureCard = ({ title, description, iconPath }) => (
    <div className="space-y-2">
      <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </span>
      <h1 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">{title}</h1>
      <p className="text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  );
  