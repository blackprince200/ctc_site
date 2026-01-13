const showcaseData = [
    {
    title: "tHub & HTML/CSS Workshops",
    category: "event",
    images: [
      "assets/show/event4_1.jpeg",
      "assets/show/event4_2.jpeg",
      "assets/show/event4_3.jpeg",
      "assets/show/event4_4.jpeg",
      "assets/show/event4_5.jpeg"
    ],
    date: "7 December 2025",
    location: "AB-2 G7, REC Sonbhadra",
    description:
      "Learn the fundamentals of Git, GitHub, version control, and how to collaborate like a pro! Understand the building blocks of web development and start creating beautiful web pages from scratch!",
    socials: {
      youtube: "https://www.youtube.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/"
    }
  },
  {
    title: "App Development Workshop",
    category: "event",
    images: [
      "assets/show/event3_1.jpeg",
      "assets/show/event3_2.jpeg",
      "assets/show/event3_3.jpeg",
      "assets/show/event3_4.jpeg"
    ],
    date: "22 November 2025",
    location: "AB-1 G6, REC Sonbhadra",
    description:
      "📱✨ CTC’s App Development Workshop – Highlights Students explored:, Basics of Android app development, UI design fundamentals, Hands-on coding with real componentsThe session was interactive, engaging, and a great step toward strengthening our tech community at REC Sonbhadra. ",
    socials: {
      youtube: "https://youtube.com/shorts/CX1s89gZCVM?si=eKzhnnyrUmfBc-pk",
      instagram: "https://www.instagram.com/p/DRh3fI5gHfY/?igsh=c3hoaTBya25rc2U3",
      linkedin: "https://www.linkedin.com/posts/community-for-technology-and-coding_ctcrecs-appdevelopment-androiddevelopment-activity-7399516223702507521-ajoC?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAE_FYWEBGp6qayhK5WWmYAgQN4jaM65f0nM&utm_campaign=copy_link"
    }
  },
  {
    title: "C Programming Session",
    category: "event",
    images: [
      "assets/show/event2_1.jpeg",
      "assets/show/event2_2.jpeg",
      "assets/show/event2_3.jpeg",
      "assets/show/event2_4.jpeg"
    ],
    date: "16 November 2025",
    location: "AB-1 G6, REC Sonbhadra",
    description:
      "The workshop introduced students to the foundations of programming while enabling hands-on practice and peer learning.A great learning experience and an excellent start to our journey of technical growth.Looking forward to more such workshops and a thriving coding community at REC Sonbhadra.Code. Connect. Create.",
    socials: {
      youtube: "https://youtube.com/shorts/ebtmhvSOIa0?si=6TVjBh9DMjE324Gw",
      instagram: "https://www.instagram.com/p/DRNXmbjgPsk/?igsh=a3hnaTJjMWY5dWRq",
      linkedin: "https://www.linkedin.com/posts/community-for-technology-and-coding_ctcrecs-ctc-cprogramming-activity-7396628493788278785-0V5W?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAE_FYWEBGp6qayhK5WWmYAgQN4jaM65f0nM&utm_campaign=copy_link"
    }
  },
  {
    title: "CTC INTRODUCTION",
    category: "",
    images: [
      "assets/show/event1_1.jpeg",
      "assets/show/event1_2.jpeg",
      "assets/show/event1_3.jpeg",
      "assets/show/event1_4.jpeg",
      "assets/show/event1_5.jpeg"
    ],
    date: " 6 SEPTEMBER 2025",
    location: "AB-1 G6, REC Sonbhadra",
    description:
      "A strong coding culture is essential for a tech-driven campus. With this vision, students of B.Tech CSE (3rd year) at Rajkiya Engineering College, Sonbhadra founded CTC – Community for Technology and Coding.Supported by our batchmates and faculty coordinator Mr. Anurag Sewak, CTC aims to create a collaborative ecosystem for learning, innovation, and growth through workshops, hackathons, contests, and hands-on projects.",
    socials: {
      youtube: "https://youtube.com/shorts/CX1s89gZCVM?si=eKzhnnyrUmfBc-pk",
      instagram: "https://www.instagram.com/p/DRNTkT_Ek0A/?igsh=MXA4bWwya2d4NmN1dA%3D%3D",
      linkedin: "https://www.linkedin.com/posts/community-for-technology-and-coding_ctc-codingclub-recsonbhadra-activity-7396620389327593472-tVcA?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAE_FYWEBGp6qayhK5WWmYAgQN4jaM65f0nM&utm_campaign=copy_link"
    }
  }
];

const container = document.getElementById("showcaseList");
const filterButtons = document.querySelectorAll(".showcase-filter button");

/* ================= RENDER FUNCTION ================= */

function renderShowcase(filter = "all") {
  const filteredData =
    filter === "all"
      ? showcaseData
      : showcaseData.filter(item => item.category === filter);

  container.innerHTML = filteredData
    .map(item => `
      <article class="showcase-item reveal">
        <div class="showcase-image">
  <button class="slide-btn prev">‹</button>

  <img 
    src="${item.images[0]}" 
    alt="${item.title}"
    data-images='${JSON.stringify(item.images)}'
    data-index="0"
  >

  <button class="slide-btn next">›</button>
</div>


        <div class="showcase-content">
          <h2>${item.title}</h2>

          <div class="showcase-meta">
            <span>📅 ${item.date}</span>
            <span>📍 ${item.location}</span>
          </div>

          <p>${item.description}</p>

          <div class="showcase-social">
            <a href="${item.socials.youtube}" target="_blank">
              <img src="assets/show/youtube.svg" alt="YouTube">
            </a>
            <a href="${item.socials.instagram}" target="_blank">
              <img src="assets/show/instagram.svg" alt="Instagram">
            </a>
            <a href="${item.socials.linkedin}" target="_blank">
              <img src="assets/show/linkedIN.svg" alt="LinkedIn">
            </a>
          </div>
        </div>
      </article>
    `)
    .join("");

  startSlideshows();
}

/* ================= FILTER HANDLING ================= */

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    renderShowcase(filter);
  });
});

/* ================= SLIDESHOW ================= */

function startSlideshows() {
  const images = document.querySelectorAll(".showcase-image img");

  images.forEach(img => {
    const imageList = JSON.parse(img.dataset.images);
    if (imageList.length <= 1) return;

    setInterval(() => {
      let index = Number(img.dataset.index);
      index = (index + 1) % imageList.length;

      img.src = imageList[index];
      img.dataset.index = index;
    }, 3000);
  });
}

/* ================= INITIAL LOAD ================= */

renderShowcase();

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("slide-btn")) return;

  const btn = e.target;
  const container = btn.closest(".showcase-image");
  const img = container.querySelector("img");

  const images = JSON.parse(img.dataset.images);
  let index = Number(img.dataset.index);

  if (btn.classList.contains("next")) {
    index = (index + 1) % images.length;
  } else {
    index = (index - 1 + images.length) % images.length;
  }

  img.src = images[index];
  img.dataset.index = index;
});

/* ================= SCROLL REVEAL ================= */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

