import '../../styles/FounderStory.css'

const FounderStory = () => {

  return (
    <section className="founder-story">
      <div className="container">
        <div className="founder-header">
          <span className="section-label">Founder Story</span>
          <h2 className="founder-name">Brenda Williams</h2>
          <p className="founder-tagline">A Life Given to Others — A Life Given Back</p>
        </div>

        {/* Founder Image */}
        <div className="founder-image-wrapper">
          <img 
            src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/2.jpg?v=1705196470" 
            alt="Brenda Williams - Founder" 
            className="founder-image"
          />
        </div>

        <div className="founder-content">
          <div className="founder-text">
            <p>
              For more than twenty years, Brenda Williams has dedicated her life to uplifting women, youth, 
              and vulnerable communities through education, mentorship, and economic empowerment. Her journey 
              is not defined by titles or recognition, but by a deep and unwavering commitment to helping 
              others discover their strength and potential.
            </p>

            <p>
              Long before NewLife Project became an established organization, Brenda was simply a student at 
              Fourah Bay College in Sierra Leone with a heart for those who were often overlooked. One evening, 
              she and two fellow women leaders visited Government Wharf, a community where many young girls 
              were facing difficult and uncertain futures. They had no formal program, no funding, and no 
              guarantees — only compassion and a belief that change was possible.
            </p>

            <p>
              That night, six young women made the courageous decision to pursue a different path. For Brenda, 
              this moment became the beginning of a lifelong promise to create safe spaces where women and youth 
              could rebuild confidence, gain skills, and move toward brighter futures. From this promise, 
              NewLife Project was born.
            </p>

            <div className="founder-highlight">
              <p>
                Over the years, Brenda worked tirelessly across West Africa and later in Canada to build programs 
                that provided vocational training, mentorship, language education, and rehabilitation support for 
                women who had experienced trafficking and hardship. She collaborated with federal government leaders, 
                university researchers, mayors, governors, CEOs, and grassroots community partners — always focused 
                on creating opportunities that could transform lives.
              </p>
            </div>

            {/* Building Image */}
            <div className="building-image-wrapper">
              <img 
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/t/4/assets/pfeccddd4abuilding2_1200x-1648492546539.png?v=1648492547" 
                alt="NewLife Project Building" 
                className="building-image"
              />
            </div>

            <p>
              Through these efforts, hundreds of individuals found hope. Women secured employment and started 
              small businesses. Young people returned to school with renewed motivation. Families began to 
              believe in new possibilities.
            </p>

            <p>
              Yet while Brenda was helping others navigate their struggles, she was quietly facing one of her own. 
              She encountered life-threatening experiences that tested her resilience, and most recently, she faced 
              a battle with cancer that changed everything.
            </p>

            <p>
              The diagnosis brought uncertainty and deep emotional pain. During one of the most vulnerable periods 
              of her life, many of the relationships she had nurtured over the years faded away. Support grew distant, 
              and Brenda found herself confronting illness with a profound sense of loneliness. She lost significant 
              weight, her strength was tested daily, and the future often felt unclear.
            </p>

            <p className="founder-emphasis">
              But even in these moments, she did not lose her purpose.
            </p>

            <p>
              Through prayer, determination, and an unshakable belief that her life still had meaning, Brenda 
              continued to move forward. She remained committed to NewLife Project, mentoring participants, 
              encouraging her team, and holding on to the vision she had carried for decades.
            </p>

            <p>
              Her recovery marked more than a return to health — it became a powerful reminder that resilience 
              can give birth to new beginnings. Today, cancer-free and deeply renewed in spirit, Brenda has 
              strengthened NewLife Project into a vibrant space of empowerment where women and youth can grow, 
              learn, and reclaim their confidence.
            </p>

            <div className="founder-quote">
              <p>
                Her promise remains simple yet profound: to leave the world better than she found it — for her 
                children, for her community, and for every individual who walks through the doors of NewLife 
                seeking a second chance.
              </p>
            </div>

            <p>
              Brenda's story is not only about survival. It is about hope, courage, and the extraordinary impact 
              one person can have when they choose to keep showing up for others.
            </p>

            {/* Board Members Image */}
            <div className="board-image-wrapper">
              <h3 className="board-title">Our Board of Directors</h3>
              <img 
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/3.jpg?v=1705196469" 
                alt="Board of Directors" 
                className="board-image"
              />
            </div>

            <div className="founder-cta">
              <p>
                We invite you to be part of this journey. Join NewLife Project in building stronger communities 
                by supporting our programs, uplifting participants, and helping create pathways to opportunity 
                for women and youth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderStory
