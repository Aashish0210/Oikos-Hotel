import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Wifi, 
  Wind, 
  Car, 
  ArrowRight,
  Star,
  Bath,
  Tv,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

const BOOKING_URL = 'https://www.booking.com/hotel/my/the-oikos.en-gb.html?aid=2276380&label=msn-Jf2IWpGrTwUziJF7286E0Q-80745576698325%3Atikwd-80745763988249%3Aloc-128%3Aneo%3Amte%3Alp142622%3Adec%3Acid578349456%3Aagid1291927491243949%3Aclkid82401187996614b13b817b57f4bbe4bd&sid=7ea2ad755fe567413f078ed3b4990e2f&dest_id=-2405499&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1792044521&srpvid=b8decf058b28541110f1b7b36e112d41&type=total&ucfs=1&';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(el => observer.observe(el));

    // Fallback: force-reveal any element already in viewport on load
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });

    // Safety net: after 2.5s, reveal anything still hidden
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        el.classList.add('visible');
      });
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollCarousel = (id, direction) => {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const imgWidth = carousel.querySelector('img').offsetWidth;
    carousel.scrollBy({ left: direction * imgWidth, behavior: 'smooth' });
  };

  const rooms = [
    {
      id: 'junior',
      name: 'Junior Suite with Sea View',
      description: 'Our premium 42 m² sea-view suite. Perfect for a couple\'s getaway.',
      amenities: ['1 King-size Bed · 42 m²', 'Soundproofing', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_double_alt.jpg', '/assets/room_junior_bath.jpg']
    },
    {
      id: 'family',
      name: 'Family Room',
      description: 'Comfortably fits 3 guests. Perfect for families.',
      amenities: ['1 Queen + 1 Single Bed', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_family_bed.jpg', '/assets/room_family_bath.jpg']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Modern comfort for 2, with all essentials included.',
      amenities: ['1 King-size Bed', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_deluxe_king.jpg', '/assets/room_deluxe_tv.jpg']
    },
    {
      id: 'twin',
      name: 'Deluxe Twin Room',
      description: 'Great for friends or colleagues sharing a room.',
      amenities: ['2 Single Beds', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_twin_bed.jpg', '/assets/room_twin_seating.jpg']
    },
    {
      id: 'double',
      name: 'Double Room',
      description: 'A clean, comfortable room for 2 with all essentials.',
      amenities: ['1 Double Bed', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_double_king.jpg', '/assets/room_double_alt.jpg']
    },
    {
      id: 'single',
      name: 'Standard Single Room',
      description: 'Cozy and efficient — ideal for solo travellers.',
      amenities: ['1 Single Bed', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_single_bed.jpg']
    }
  ];

  return (
    <div className="app-container">
      {/* Floating WhatsApp */}
      <a href={`https://wa.me/9779766386790?text=${encodeURIComponent('Hello! I am interested in booking a room at The Oikos Hotel. Could you please provide more details about availability and rates? Thank you!')}`} className="whatsapp-float" target="_blank" rel="noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        <span>Chat with Us</span>
      </a>

      {/* Mobile nav backdrop */}
      {isMenuOpen && (
        <div className="nav-backdrop active" onClick={() => setIsMenuOpen(false)} />
      )}

      <nav id="main-nav" className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="the">the</span>
            <span className="oikos">OIKOS</span>
            <span className="hotel">hotel</span>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#rooms" onClick={() => setIsMenuOpen(false)}>Rooms</a></li>
            <li><a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <a 
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm nav-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </a>
            <button className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-bg">
          <img src="/assets/hero_original.png" alt="Pontian Fishing Harbor at Dusk" />
        </div>
        <div className="hero-content container">
          <div className="hero-text-box reveal">
            <p className="subtitle">Pontian Kechil, Johor</p>
            <h1>Cozy Boutique Comfort<br />by the Shore</h1>
            <p className="tagline">"The beauty of a sleepy fishing town awaits..."</p>
            <div className="hero-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Now</a>
              <a href="#rooms" className="btn btn-secondary">Explore Rooms</a>
            </div>
          </div>
        </div>
        <div className="hero-lower-info">
          <div className="container info-grid">
            <div className="info-item">
              <strong>50 Meters</strong>
              <span>from the Sea</span>
            </div>
            <div className="info-item">
              <strong>20 Minutes</strong>
              <span>to Tanjung Piai</span>
            </div>
            <div className="info-item">
              <strong>21 Rooms</strong>
              <span>Private & Cozy</span>
            </div>
          </div>
        </div>
      </header>

      <section id="story" className="section">
        <div className="container grid grid-2">
          <div className="story-content reveal">
            <h2 className="section-title">Your Home Away from Home</h2>
            <p className="lead">Nestled in the heart of Pontian's historic fishing town, The Oikos Hotel offers a simple yet modern retreat for the curious traveler.</p>
            <p>Named after the Greek word for 'home', Oikos is designed to be your sanctuary. Whether you're here to visit the southernmost point of mainland Asia or to savor the world-famous local seafood, our boutique rooms provide the perfect base for your adventure.</p>
            <div className="feature-pills">
              <span><Wifi size={14} /> Free High-Speed WiFi</span>
              <span><Bath size={14} /> Ensuite Bathrooms</span>
              <span><Wind size={14} /> Air Conditioning</span>
              <span><Car size={14} /> Private Parking</span>
            </div>
          </div>
          <div className="story-image reveal">
            <img src="/assets/lobby.png" alt="The Oikos Hotel Lobby & Front Desk" />
          </div>
        </div>
      </section>

      <section id="rooms" className="section bg-warm">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Authentic Boutique Comfort</h2>
            <p>Simple, clean, and heritage-inspired rooms in the heart of Pontian.</p>
            <div className="rating-badge">
              <span className="score">8.1</span>
              <span className="label">Location Rating on Booking.com</span>
            </div>
          </div>
          <div className="room-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-card reveal">
                <div className="room-img">
                  <div className="room-carousel" id={`carousel-${room.id}`}>
                    {room.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`${room.name} ${idx + 1}`} />
                    ))}
                  </div>
                  {room.images.length > 1 && (
                    <>
                      <button className="carousel-btn prev" aria-label="Previous" onClick={() => scrollCarousel(`carousel-${room.id}`, -1)}>&#8249;</button>
                      <button className="carousel-btn next" aria-label="Next" onClick={() => scrollCarousel(`carousel-${room.id}`, 1)}>&#8250;</button>
                    </>
                  )}
                  {room.tag && <span className="room-tag">{room.tag}</span>}
                </div>
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <ul className="room-amenities">
                    {room.amenities.map((amenity, idx) => {
                      let Icon = ArrowRight;
                      if (amenity.toLowerCase().includes('wifi')) Icon = Wifi;
                      if (amenity.toLowerCase().includes('conditioning')) Icon = Wind;
                      if (amenity.toLowerCase().includes('bathroom') || amenity.toLowerCase().includes('bath')) Icon = Bath;
                      if (amenity.toLowerCase().includes('tv')) Icon = Tv;
                      if (amenity.toLowerCase().includes('bed')) Icon = Star;
                      
                      return (
                        <li key={idx}>
                          <Icon size={14} strokeWidth={2.5} className="amenity-icon" />
                          {amenity}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="room-footer">
                    <a 
                      href={BOOKING_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="section location-section">
        <div className="container">
          <div className="grid grid-2-1">
            <div className="location-image reveal">
              <img src="/assets/location_sunset.jpg" alt="Seaside Sunset at The Oikos Hotel" />
            </div>
            <div className="location-text reveal">
              <h2 className="section-title">Prime Coastal Location</h2>
              <p>Strategically located 50m from the Pontian seafront and 20 mins from Tanjung Piai National Park.</p>
              <p className="address-text"><strong>Address:</strong><br />No. 2 & 3, Jalan Delima 2, Pusat Perdagangan Pontian,<br />82000 Pontian, Johor Darul Takzim, Malaysia</p>
              <ul className="attractions">
                <li><strong>Wang Wang (Chinese Cuisine)</strong> (50m)</li>
                <li><strong>Nasi Ayam Sin Yap</strong> (50m)</li>
                <li><strong>Tanjung Piai National Park</strong> (20 mins)</li>
                <li><strong>Legoland Malaysia</strong> (40 mins)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews section bg-light">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Guest Experiences</h2>
            <p>What travelers love about their stay at Oikos.</p>
          </div>
          <div className="review-grid">
            <div className="review-card card reveal">
              <div className="quote-icon"><Star size={24} fill="var(--accent)" stroke="var(--accent)" /></div>
              <p>"Great location, near to everything. Strategic place for food hunters!"</p>
              <div className="review-author">- 8.1 Location Rating</div>
            </div>
            <div className="review-card card reveal">
              <div className="quote-icon"><Star size={24} fill="var(--accent)" stroke="var(--accent)" /></div>
              <p>"Simple, clean and budget-friendly. Perfect for a short getaway to see the southern tip of Asia."</p>
              <div className="review-author">- Verified Guest</div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-info">
              <div className="logo light">
                <span className="the">the</span>
                <span className="oikos">OIKOS</span>
                <span className="hotel">hotel</span>
              </div>
              <p>Cozy boutique comfort in Pontian Kechil.</p>
            </div>
            <div className="footer-nav">
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#location">Location</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <p><MapPin size={16} /> <span><strong>Address:</strong> No. 2 & 3, Jalan Delima 2, Pusat Perdagangan Pontian, 82000 Pontian, Johor, Malaysia</span></p>
              <p><Clock size={16} /> <span><strong>Check-in:</strong> 2:00 PM | <strong>Check-out:</strong> 12:00 PM</span></p>
              <p><Phone size={16} /> <span><strong>Tel:</strong> <a href={`https://wa.me/9779766386790?text=${encodeURIComponent('Hello! I am interested in booking a room at The Oikos Hotel. Could you please provide more details about availability and rates? Thank you!')}`} target="_blank" rel="noreferrer" className="footer-phone-link">+977 976-6386790</a></span></p>
              <p><Mail size={16} /> <span><strong>Email:</strong> info@theoikoshotel.com.my</span></p>
              <p><Car size={16} /> <span><strong>Parking:</strong> On-site available</span></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 The Oikos Hotel. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
