export default function About() {
    return (
      <>
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-4 py-6 mx-auto">
            <div className="flex">
              {/* Feature section (w-1/2) */}
              <div className="w-1/2">
                {/* Feature content (replace this with your feature section) */}
              </div>
  
              {/* Divider (Vertical Line) */}
              <div className="w-px bg-gray-300 dark:bg-gray-600 mx-6"></div>
  
              {/* About Us section (w-1/2) */}
              <div className="w-1/2 pl-8">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                  About HeadlineAI
                </h1>
                <div className="mt-1">
                  <span className="inline-block w-32 h-1 bg-blue-500 rounded-full" />
                  <span className="inline-block w-2 h-1 ml-1 bg-blue-500 rounded-full" />
                  <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full" />
                </div>
                <p className="mt-6 text-gray-600 dark:text-gray-300">
                  HeadlineAI is an innovative AI-powered news platform that provides the latest news 
                  and updates through a conversational user interface (CUI).
                </p>
                <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
                  <li>✓ Powered by advanced AI to deliver real-time news insights.</li>
                  <li>✓ User-friendly chat interface for personalized news conversations.</li>
                  <li>✓ Stay updated on the latest headlines with a simple and engaging experience.</li>
                  <li>✓ Offers customizable news filters based on user preferences.</li>
                  <li>✓ Secure login to keep your news feed personalized and private.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  