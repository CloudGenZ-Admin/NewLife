import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/FounderStory.css'

gsap.registerPlugin(ScrollTrigger)

const FounderStory = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in chapters on scroll
      const chapters = gsap.utils.toArray('.story-chapter')
      chapters.forEach((chapter) => {
        gsap.from(chapter, {
          scrollTrigger: {
            trigger: chapter,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: 'power3.out'
        })
      })

      // Parallax for chapter images - Skip the first image (my_profile.jpg)
      const images = gsap.utils.toArray('.chapter-image img')
      images.forEach((img, index) => {
        // Skip the first image (index 0)
        if (index === 0) return;
        
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          },
          y: 60,
          ease: 'none'
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="founder-story-editorial" ref={sectionRef}>
      <div className="container">

        {/* CHAPTER 1: THE PROMISE */}
        <div className="story-chapter chapter-left">
          <div className="chapter-visual">
            <div className="chapter-image">
              <img
                src="./my_profile.jpg"
                alt="Brenda Williams - Founder"
              />
            </div>
            <p className="image-caption">Executive Director and Founder</p>
          </div>
          <div className="chapter-content">
            <h2 className="chapter-title">The Promise.</h2>
            <div className="chapter-text">
              <p className="lead">
                For more than twenty years, Brenda Williams has dedicated her life to uplifting women, youth,
                and vulnerable communities through education, mentorship, and economic empowerment. Her journey
                is not defined by titles or recognition, but by a deep and unwavering commitment to helping
                others discover their strength and potential.
              </p>
              <p>
                Long before NewLife Project became an established organization, Brenda was simply a student at
                Fourah Bay College in Sierra Leone with a heart for those who were often overlooked. One evening,
                she and two fellow women visited Government Wharf, a community where many young girls were facing
                difficult and uncertain futures.
              </p>
              <p>
                That night, six young women made the courageous decision to pursue a different path. For Brenda,
                this moment became the beginning of a lifelong promise to create safe spaces where women and youth
                could rebuild confidence, gain skills, and move toward brighter futures. From this promise,
                NewLife Project was born.
              </p>
            </div>
          </div>
        </div>

        {/* CHAPTER 2: THE REACH */}
        <div className="story-chapter chapter-right">
          <div className="chapter-content">
            <h2 className="chapter-title">Building Bridges.</h2>
            <div className="chapter-text">
              <p>
                Brenda worked tirelessly across West Africa and later in Canada to build programs
                providing vocational training, mentorship, and rehabilitation support.
                She collaborated with federal government leaders, university researchers, and grassroots
                community partners — always focused on creating opportunities that could transform lives.
              </p>
              <div className="chapter-pullquote">
                "Her journey is not defined by titles, but by the strength she helps others discover."
              </div>
              <p>
                She has earned several awards, including Global Community Alliance Business Achievement, 100
                Accomplished Black Canadian Women, Black History Ottawa Community Builders, to name a few.
              </p>
              <p>
                Through these efforts, hundreds found hope. Women secured employment and started small businesses.
                Young people returned to school with renewed motivation. Families began to believe in new possibilities.
              </p>
            </div>
          </div>
          <div className="chapter-visual">
            <div className="chapter-image">
              <img
                src="./pfeccddd4abuilding2_1200x-1648492546539.webp"
                alt="NewLife Project Impact"
              />
            </div>
          </div>
        </div>

        {/* CHAPTER 3: THE RESILIENCE */}
        <div className="story-chapter chapter-left">
          <div className="chapter-visual chapter-quote-feature reveal-item">
            <div className="quote-feature-inner">
              <span className="quote-mark">“</span>
              <p className="big-quote">Healing is not just about survival; it is about <em>renewal</em>.</p>
              <div className="quote-divider"></div>
              <span className="quote-sub">The Journey of Resilience</span>
            </div>
          </div>
          <div className="chapter-content">
            <h2 className="chapter-title">The Resilience.</h2>
            <div className="chapter-text">
              <p>
                While Brenda was helping others navigate their struggles, she was quietly facing one of her own.
                She encountered life-threatening experiences that tested her resilience, and most recently,
                she faced a battle with cancer that changed everything.
              </p>
              <p>
                The diagnosis brought uncertainty and deep emotional pain. During one of the most vulnerable
                periods of her life, Brenda found herself confronting illness with a profound sense of pain
                but supported by family and a few friends. She lost significant weight, her strength was
                tested daily, and her future was held upon her faith that God would heal her.
              </p>
              <p>
                But even in these moments, she did not lose her purpose.
              </p>
              <p>
                Today, cancer-free and deeply renewed in spirit, Brenda has strengthened the NewLife Project
                into a vibrant space of empowerment where women and youth can grow, learn, and reclaim their confidence.
              </p>
              <p>
                Her recovery marked more than a return to health — it became a powerful reminder that resilience
                can give birth to new beginnings.
              </p>
            </div>
          </div>
        </div>

        {/* CHAPTER 4: THE LEGACY */}
        <div className="story-chapter chapter-center">
          <div className="chapter-content">
            <h2 className="chapter-title">A Lasting Impact.</h2>
            <div className="chapter-text">
              <p>
                Her promise remains simple yet profound: to leave the world better than she found it —
                for her children, for her community, and for every individual who walks through our doors.
              </p>
              <p>
                Brenda’s story is not only about survival. It is about hope, courage, and the extraordinary impact one person can have when they choose to keep showing up for others.
              </p>
            </div>

            <div className="founder-signature-block">
              <div className="signature-text">Board of Directors</div>
              <div className="founder-awards">
                Global Community Alliance Achievement • 100 Accomplished Black Canadian Women • BHO Community Builder
              </div>
            </div>

            <div className="founder-board-preview">
              <h3>Guided by Vision</h3>
              <p>Supported by a dedicated Board of Directors committed to sustainable community transformation.</p>
              <div className="board-preview-grid">
                
                {/* Board Member 1 - Hervé Some */}
                <div className="board-card">
                  <div className="board-card-image">
                    <img src="./1.jpg" alt="Hervé Some - Board Member" />
                  </div>
                  <div className="board-card-bio-section">
                    <h4>Hervé Some</h4>
                    <p className="board-bio">
                      Hervé Some is a member of the Ontario College of Teachers. He worked as a teacher at La Cité, in several language schools, elementary and secondary schools of the French language school board in Kingston and Ottawa.
                    </p>
                    <p className="board-bio">
                      Stung by the entrepreneurial spirit for several years and passionate about self-directed education, Hervé founded Fast French Formula, Sympatorium, and Idnov Consulting. He has been working on his own since June 2019.
                    </p>
                    <p className="board-bio">
                      Active member of the community, Hervé is, among other things, projects and events coordinator for the Aggregation of Foreign Born or Trained Professionals, responsible for French communication for the Ottawa Book Show, and coordinator of the Ottawa local Panafrican Movement Committee.
                    </p>
                    <p className="board-vision">
                      <strong>Vision for Project:</strong> Bring my expertise and resources to New Life Project to help educate and empower women and children.
                    </p>
                  </div>
                </div>

                {/* Board Member 2 - Irene Cummings */}
                <div className="board-card">
                  <div className="board-card-image">
                    <img src="./2.jpg" alt="Irene Cummings - Board Member" />
                  </div>
                  <div className="board-card-bio-section">
                    <h4>Irene Cummings</h4>
                    <p className="board-bio">
                      Irene Cummings is a dedicated professional with nearly 20 years of experience in Human Services and Education. She is currently pursuing a Bachelor's degree in Psychology and holds a Developmental Services Worker diploma.
                    </p>
                    <p className="board-bio">
                      As a Special Needs Educator, Irene supports individuals in overcoming academic, behavioral, and social challenges. Her experience spans schools, residential care, and community programs.
                    </p>
                    <p className="board-bio">
                      She also provides at-home, online, and family support services through her own practice. Irene is passionate about creating safe, inclusive environments that foster growth, independence, and well-being for individuals with special needs.
                    </p>
                  </div>
                </div>

                {/* Board Member 3 - Abena Beloved Green */}
                <div className="board-card">
                  <div className="board-card-image">
                    <img src="./3.jpg" alt="Abena Beloved Green - Board Member" />
                  </div>
                  <div className="board-card-bio-section">
                    <h4>Abena Beloved Green</h4>
                    <p className="board-bio">
                      Abena Green is a poet, writer, and dancer who seeks to create, engage, and elevate through words and movement. She is the author of "The Way We Hold On" (Pottersfield Press, 2018) and Ode to the Unpraised (Pottersfield Press, 2020).
                    </p>
                    <p className="board-bio">
                      A first-generation Canadian, Abena grew up in Nova Scotia and writes on culture, family, environment, wellness, and personal growth.
                    </p>
                    <p className="board-bio">
                      She has shared her poetry in Ghana, Ethiopia, Rwanda, and in several Canadian locales. Her submission, "The Art of Living", won the Writers' Federation of Nova Scotia's 2016 Atlantic Writing Competition. She was the inaugural H.E.R. Story Writer-in-Residence for YWCA Halifax and Atlantic Publishers Marketing Association from April 2021 to March 2022.
                    </p>
                    <p className="board-bio">
                      Abena believes honest stories build bridges and break walls. She enjoys coaching individuals and groups to produce writing that is clear and compelling.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="founder-call-to-action">
              <p>We invite you to be part of this journey. Help us create pathways to opportunity.</p>
              <a href="/contact" className="editorial-btn">Join the Movement</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FounderStory
