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
      chapters.forEach((chapter, i) => {
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

      // Parallax for chapter images
      const images = gsap.utils.toArray('.chapter-image img')
      images.forEach((img) => {
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
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/2.jpg?v=1705196470" 
                alt="Brenda Williams - Founder" 
              />
              <div className="image-caption">Brenda Williams, Founder</div>
            </div>
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
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/t/4/assets/pfeccddd4abuilding2_1200x-1648492546539.png?v=1648492547" 
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
               <div className="signature-text">Brenda Williams</div>
               <div className="founder-awards">
                  Global Community Alliance Achievement • 100 Accomplished Black Canadian Women • BHO Community Builder
               </div>
            </div>

            <div className="founder-board-preview">
              <h3>Guided by Vision</h3>
              <p>Supported by a dedicated Board of Directors committed to sustainable community transformation.</p>
              <div className="board-preview-image">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/3.jpg?v=1705196469" 
                  alt="NewLife Board" 
                />
              </div>
            </div>

            <div className="founder-call-to-action">
              <p>We invite you to be part of this journey. Help us create pathways to opportunity.</p>
              <a href="#newsletter" className="editorial-btn">Join the Movement</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FounderStory
