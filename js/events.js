const UPCOMING_EVENTS = [
    {
        id: 1,
        type: "upcoming",
        date: "14",
        month: "FEB",
        title: "IoT Workshop: Smart Devices & Sensors",
        time: "10:00 PM – 12:00 PM",
        venue: "AB-2, G-6",
        tag: "workshop",
        tagText: "IoT Workshop",
        description: "Learn to build smart devices with Arduino and Raspberry Pi. Hands-on experience with sensors, actuators, and IoT protocols.",
        speaker: {
            name: "Vaibhav Agarwal",
            role: "IoT Specialist",
            avatar: "VA",
        },
        details: {
            seats: "50",
            level: "Beginner to Intermediate",
            topics: "Arduino, Sensors, MQTT"
        },
        registrationLink: "https://docs.google.com/forms/d/YOUR_IOT_WORKSHOP_FORM_ID"
    },
    {
        id: 2,
        type: "upcoming",
        date: "21",
        month: "FEB",
        title: "Web Development",
        time: "10:00 PM – 12:00 PM",
        venue: "AB-2, G-6",
        tag: "workshop",
        tagText: "Web Development",
        description: "Build, deploy, and pitch a complete web product in a team environment. Win exciting prizes and internships!",
        speaker: {
            name: "Hariom Dubey",
            role: "Senior Developer",
            avatar: "HD",
            avatarClass: "web-avatar"
        },
        details: {
            seats: "50",
            level: "Intermediate to Advance ",
            topics: "REACT,CSS,HTML"
        },
        registrationLink: "https://docs.google.com/forms/d/YOUR_WEB_DEVELOPMENT_FORM_ID"
    },
];

const PAST_EVENTS = [
    {
        id: 104,
        type: "past",
        title: "HTML & CSS – INTRODUCING WEB DEVELOPMENT",
        date: "7 DEC 2025",
        time: "11:30 AM",
        venue: "REC Sonbhadra, AB2 G6",
        image: "assets/event/event_4.png",
        description: "Build your vision. Code shapes the future with open reality. Perfect for beginners starting their web development journey.",
        speaker: {
            name: "SHREYA TRIPATHI",
            role: "Web Developer",
            avatar: "ST"
        },
        stats: {
            attendees: "50+",
            duration: "1.3 Hours"
        }
    },
    {
        id: 103,
        type: "past",
        title: "GIT & GITHUB – INTRODUCING OPEN SOURCE",
        date: "7 DEC 2025",
        time: "9:30 AM",
        venue: "REC Sonbhadra, AB2 G6",
        image: "assets/event/event_3.png",
        description: "Unleash your potential. Shape the future with open source. Master version control and collaborative development.",
        speaker: {
            name: "AYUSHMAN PANDEY",
            role: "Git Expert",
            avatar: "AP"
        },
        stats: {
            attendees: "50+",
            duration: "1.3 Hours"
        }
    },
    {
        id: 102,
        type: "past",
        title: "APP DEVELOPMENT WORKSHOP",
        date: "22 NOV 2025",
        time: "10:00 AM",
        venue: "Language Lab",
        image: "assets/event/event_2.png",
        description: "Learn mobile app development fundamentals and build your first application with hands-on guidance.",
        speaker: {
            name: "AKASH GIRI",
            role: "App Developer",
            avatar: "AG"
        },
        stats: {
            attendees: "50+",
            duration: "6 Hours",
        }
    },
    {
        id: 101,
        type: "past",
        title: "C PROGRAMMING WORKSHOP",
        date: "16 NOV 2025",
        time: "10:00 AM",
        venue: "REC Sonbhadra, AB2 G6",
        image: "assets/event/event_1.jpeg",
        description: "Learn C Programming fundamentals and make  your basic strong with hands-on guidance.",
        speaker: {
            name: "ANSH VERMA ",
            role: "C Programming ",
            avatar: "AV"
        },
        stats: {
            attendees: "50+",
            duration: "1.3 Hours",
        }
    }
];

// Combine for compatibility with existing code
const eventsData = [...UPCOMING_EVENTS, ...PAST_EVENTS];

/* ================= RENDER FUNCTIONS ================= */

document.addEventListener('DOMContentLoaded', function() {
    renderUpcomingEvents();
    renderPastEvents();
    setupQuickFilter();
    updateEventCounts();
});

function renderUpcomingEvents() {
    const container = document.getElementById('upcomingContainer');
    
    container.innerHTML = UPCOMING_EVENTS.map((event, index) => `
        <div class="upcoming-card loading-animation ${index === 0 ? 'featured' : ''}" data-id="${event.id}">
            <div class="card-header">
                <div class="event-date-badge">
                    <span class="date-day">${event.date}</span>
                    <span class="date-month">${event.month}</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag ${event.tag}">${event.tagText}</span>
                </div>
            </div>
            
            <div class="event-content">
                <h3>${event.title}</h3>
                
                <div class="event-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                </div>
                
                <p class="event-description">${event.description}</p>
                
                <div class="event-details">
                    ${event.details.seats ? `
                    <div class="event-detail">
                        <div class="label">Seats</div>
                        <div class="value">${event.details.seats}</div>
                    </div>
                    ` : ''}
                    
                    ${event.details.level ? `
                    <div class="event-detail">
                        <div class="label">Level</div>
                        <div class="value">${event.details.level}</div>
                    </div>
                    ` : ''}
                    
                    ${event.details.topics ? `
                    <div class="event-detail">
                        <div class="label">Topics</div>
                        <div class="value">${event.details.topics}</div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="speaker-info">
                    <div class="speaker-avatar ${event.speaker.avatarClass || ''}">
                        ${event.speaker.avatar}
                    </div>
                    <div class="speaker-details">
                        <div class="speaker-name">${event.speaker.name}</div>
                        ${event.speaker.role ? `<div class="speaker-role">${event.speaker.role}</div>` : ''}
                    </div>
                </div>
                
                <a href="${event.registrationLink || '#'}" class="register-btn" data-event-id="${event.id}" ${event.registrationLink ? 'target="_blank"' : ''}>
                    <i class="fas fa-calendar-plus"></i> Register Now
                </a>
            </div>
        </div>
    `).join('');
}

function renderPastEvents() {
    const container = document.getElementById('pastContainer');
    
    container.innerHTML = PAST_EVENTS.map(event => `
        <div class="past-card loading-animation" data-id="${event.id}">
            <img src="${event.image}" alt="${event.title}" class="past-image" loading="lazy">
            <div class="past-content">
                <h4>${event.title}</h4>
                <div class="past-date">${event.date} • ${event.time}</div>
                <div class="event-meta past-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
                </div>
                <p class="past-description">${event.description}</p>
                
                <!-- Speaker info added here -->
                ${event.speaker ? `
                <div class="speaker-info past-speaker">
                    <div class="speaker-avatar">
                        ${event.speaker.avatar}
                    </div>
                    <div class="speaker-details">
                        <div class="speaker-name">${event.speaker.name}</div>
                        ${event.speaker.role ? `<div class="speaker-role">${event.speaker.role}</div>` : ''}
                    </div>
                </div>
                ` : ''}
                
                <!-- Stats without rating -->
                <div class="past-stats">
                    <div class="stat-item">
                        <span class="stat-number">${event.stats.attendees}</span>
                        <span class="stat-label">Attendees</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${event.stats.duration}</span>
                        <span class="stat-label">Duration</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ================= FILTER ================= */

function setupQuickFilter() {
    const filterLinks = document.querySelectorAll('.filter-jump');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================= UPDATE COUNTS ================= */

function updateEventCounts() {
    document.getElementById('upcomingCount').textContent = UPCOMING_EVENTS.length;
    document.getElementById('pastCount').textContent = PAST_EVENTS.length;
}

/* ================= EVENT HANDLERS ================= */

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('register-btn') || 
        e.target.closest('.register-btn')) {
        const btn = e.target.classList.contains('register-btn') ? 
            e.target : e.target.closest('.register-btn');
        
        const eventId = btn.getAttribute('data-event-id');
        const event = eventsData.find(e => e.id == eventId);
        
        if (event) {
            // Only prevent default if there's no registration link
            if (!event.registrationLink) {
                e.preventDefault();
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
                
                // Show alert for events without registration link (past events)
                alert(`Registration for: ${event.title}\n\nDate: ${event.month} ${event.date}\nTime: ${event.time}\nVenue: ${event.venue}\n\nRegistration is closed for this event.`);
            }
            // If registration link exists, it will open automatically (no need for preventDefault)
        }
    }
});

/* ================= ANIMATIONS ================= */

function animateCards() {
    const cards = document.querySelectorAll('.loading-animation');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

setTimeout(animateCards, 300);