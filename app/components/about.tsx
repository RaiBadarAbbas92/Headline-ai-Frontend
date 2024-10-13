// components/About.tsx

import Image from 'next/image';
import aboutImage from './img/ab.jpg'; // Replace with your image path

const About = () => {
    return (
        <>
        <hr />
        
        <section className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 border border-gray-300 rounded-lg shadow-md max-w-4xl mx-auto my-8">
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-3">About</h1>
                <p className="text-base md:text-lg text-gray-700">
                HeadlineAI is an innovative AI-powered news platform that delivers the latest news through a conversational user interface (CUI). Users can engage with HeadlineAI just like chatting with a person—simply ask questions, and the AI will respond with relevant news articles, updates, and stories. Whether it's the latest global headlines, trending topics, or local events, HeadlineAI provides quick and personalized news responses. The platform offers a seamless experience with easy signup and login functionality, and once logged in, users can explore news interactively. The AI continuously learns from user queries, providing smarter, more relevant answers over time.

</p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                <Image 
                    src={aboutImage} 
                    alt="About HeadlineAI" 
                    className="rounded-lg shadow-lg" 
                    layout="intrinsic" 
                    width={250} // Decreased image width
                    height={150} // Decreased image height
                />
            </div>
        </section><hr /></>
    );
};

export default About;
