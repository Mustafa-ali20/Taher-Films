import Card from "./Card";
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Lenis from "lenis";



const Projects = [
  {
    title: "Corporate Insights: Lawyer Noor Al Naqeeb",
    description:
      "Kuwait's corporate landscape explained by legal expert Noor Al Naqeeb. Gain clarity on expatriate rights, business setup, and company ownership in Kuwait through practical legal advice for entrepreneurs and professionals.",
    src: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/youtube/image1.jpg",
    link: "https://www.youtube.com/watch?v=QM5XTi-3Wsw",
    color: "#000000", 
  },
  {
    title: "Escaping the Matrix with Fatema Al Habib",
    description:
      "An inspiring talk with Qesati founder Fatema Al Habib on mental health, self-improvement, and finding freedom from life's 'matrix'. Learn strategies for positivity, growth, and building resilience through her journey and insights.",
    src: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/youtube/image4.jpg",
    link: "https://www.youtube.com/watch?v=kr_X3LySw5E",
    color: "#000000", 
  },
  {
    title: "Science Behind Interstellar: Jenan Al-Shehab",
    description:
      "Engineer and innovator Jenan Al-Shehab uncovers the real science behind the film Interstellar. Explore scientific evidence, engineering feats, and the fascinating connections between cinematic storytelling and real-world research.",
    src: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/youtube/image5.jpg",
    link: "https://www.youtube.com/watch?v=xdwfIW__YAQ",
    color: "#000000", 
  },
  {
    title: "Why 'Cringe' Content Drives Success Online",
    description:
      "Kuwaiti food vlogger Abdulkareem Akram shares insights on social media growth, content creation, and audience engagement. Discover why unconventional content often outperforms expectations and learn strategies to thrive online.",
    src: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/youtube/image3.jpg",
    link: "https://www.youtube.com/watch?v=yV986G8Agh8",
    color: "#000000", 
  },
  {
    title: "Business Growth with Ahmad Ndoom",
    description:
      "Consultant Ahmad Ndoom discusses strategies for building sustainable businesses. From leveraging technology to overcoming challenges, his practical tips highlight persistence and adaptability as keys to long-term success.",
    src: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/youtube/image2.jpg",
    link: "https://www.youtube.com/watch?v=m9FR5OwFpaM",
    color: "#000000", 
  },
];

export default function WorkParallax() {
  const container = useRef(null);
  const projects = Projects;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
     
      <main className="mt-15 lg:mt-[10vh]">
        <div className="flex items-center justify-center">
         <h2 className="text-4xl md:text-5xl text-white font-[villo]">
            Youtube <span className='font-[apple]'>Content</span> 
          </h2>
        </div>

        <div ref={container}>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}