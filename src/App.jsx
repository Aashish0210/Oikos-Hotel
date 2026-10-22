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
  Mail,
  Bed,
  Eye,
  Sparkles
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

  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  const handlePrevImage = (e, roomId, total) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total
    }));
  };

  const handleNextImage = (e, roomId, total) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total
    }));
  };

  const handleSelectDot = (e, roomId, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [roomId]: index
    }));
  };

  const rooms = [
    {
      id: 'deluxe-family',
      name: 'Deluxe Family Room',
      description: 'Scenic family accommodation featuring a king bed and a super single bed with windows overlooking the shore.',
      amenities: [
        '1 King + 1 Super Single Bed',
        'Panoramic Sea View Window',
        'Sofa Living Lounge Area',
        'Private Ensuite Bathroom',
        'Air Conditioning · Free WiFi'
      ],
      images: ['/assets/room_junior_suite_hd.jpg', '/assets/room_junior_suite_view2.jpg']
    },
    {
      id: 'junior',
      name: 'Junior Suite Room',
      description: 'Our premier 42 m² suite featuring a king bed, living lounge seating, and panoramic Malacca Strait views.',
      amenities: [
        '1 King-size Bed · 42 m²',
        'Ensuite Bathroom with Bidet',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_deluxe_king_hd.jpg']
    },
    {
      id: 'family',
      name: 'Family Room',
      description: 'Thoughtfully designed for families or groups of 3, featuring one queen bed and one single bed.',
      amenities: [
        '1 Queen + 1 Single Bed',
        'Private Ensuite Bathroom',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_deluxe_family_hd.jpg', '/assets/room_family_hd.jpg']
    },
    {
      id: 'super-family',
      name: 'Super Family Room',
      description: 'Spacious family layout comfortably sleeping 4 guests with one king bed and two super single beds.',
      amenities: [
        '1 King + 2 Super Single Beds',
        'Private Ensuite Bathroom',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_super_family_beds_hd.png']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Generously appointed boutique room for couples with a king bed and handcrafted timber headboard.',
      amenities: [
        '1 King-size Bed',
        'Ensuite Bathroom with Bidet',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_deluxe_king_hd.jpg']
    },
    {
      id: 'twin',
      name: 'Deluxe Twin Room',
      description: 'Bright and airy room with windows providing natural light and two comfortable super single beds.',
      amenities: [
        '2 Super Single Beds',
        'Window (Natural Daylight)',
        'Private Ensuite Bathroom',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_deluxe_twin_hd.jpg', '/assets/room_twin_bed.jpg']
    },
    {
      id: 'queen',
      name: 'Queen Room',
      description: 'Modern, peaceful comfort featuring a plush queen bed and warm ambient lighting for a restful stay.',
      amenities: [
        '1 Queen-size Bed',
        'Private Ensuite Bathroom',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_queen_bed_hd.png']
    },
    {
      id: 'single',
      name: 'Standard Single Room',
      description: 'Cozy and efficient room with a super single bed, ideal for solo travelers and brief business stays.',
      amenities: [
        '1 Super Single Bed',
        'Private Ensuite Bathroom',
        'Work Desk · Electric Kettle',
        'Air Conditioning',
        'Flat-screen TV · Free WiFi'
      ],
      images: ['/assets/room_standard_single_bed.jpg']
    }
  ];

  return (
    <div className="app-container">

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
          <img src="/assets/hero_sunset_hd.jpg" alt="Pontian Fishing Harbor at Dusk" />
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
              <span><Car size={14} /> Public Parking</span>
            </div>
          </div>
          <div className="story-image reveal">
            <img src="/assets/lobby_reception.jpg" alt="The Oikos Hotel Lobby & Front Desk" />
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
            {rooms.map(room => {
              const currentIdx = activeImageIndexes[room.id] || 0;
              const currentImg = room.images[currentIdx] || room.images[0];

              return (
                <div key={room.id} className="room-card reveal">
                  <div className="room-img">
                    <div className="room-image-frame">
                      <img 
                        src={currentImg} 
                        alt={`${room.name} photo ${currentIdx + 1}`} 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {room.images.length > 1 && (
                      <>
                        <button 
                          type="button"
                          className="carousel-btn prev" 
                          aria-label={`Previous photo of ${room.name}`} 
                          onClick={(e) => handlePrevImage(e, room.id, room.images.length)}
                        >
                          &#8249;
                        </button>
                        <button 
                          type="button"
                          className="carousel-btn next" 
                          aria-label={`Next photo of ${room.name}`} 
                          onClick={(e) => handleNextImage(e, room.id, room.images.length)}
                        >
                          &#8250;
                        </button>
                        <div className="carousel-indicators">
                          {room.images.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`carousel-indicator ${currentIdx === dotIdx ? 'active' : ''}`}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                              onClick={(e) => handleSelectDot(e, room.id, dotIdx)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <ul className="room-amenities">
                    {room.amenities.map((amenity, idx) => {
                      let Icon = ArrowRight;
                      const aLower = amenity.toLowerCase();
                      if (aLower.includes('wifi')) Icon = Wifi;
                      else if (aLower.includes('conditioning')) Icon = Wind;
                      else if (aLower.includes('bathroom') || aLower.includes('bath') || aLower.includes('bidet')) Icon = Bath;
                      else if (aLower.includes('tv')) Icon = Tv;
                      else if (aLower.includes('bed')) Icon = Bed;
                      else if (aLower.includes('window') || aLower.includes('view') || aLower.includes('light')) Icon = Eye;
                      else if (aLower.includes('suite') || aLower.includes('lounge') || aLower.includes('m²')) Icon = Sparkles;
                      
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
            );
          })}
          </div>
        </div>
      </section>

      <section id="location" className="section location-section">
        <div className="container">
          <div className="grid grid-2-1">
            <div className="location-image reveal">
              <img src="/assets/location_sunset_hd.jpg" alt="Seaside Sunset at The Oikos Hotel" />
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
              <p><MapPin size={16} /> <span><strong>Address:</strong> No. 2 & 3, Jalan Delima 2, Pusat Perdagangan Pontian, 82000 Pontian, Johor Darul Takzim, Malaysia</span></p>
              <p><Phone size={16} /> <span><strong>Tel:</strong> <a href="tel:+6076881228">+60 7-6881228</a></span></p>
              <p><Mail size={16} /> <span><strong>Email:</strong> <a href="mailto:Reservations@theoikoshotel.com.my">Reservations@theoikoshotel.com.my</a></span></p>
              <p><Clock size={16} /> <span><strong>Check-in:</strong> 2:00 PM | <strong>Check-out:</strong> 12:00 PM</span></p>
              <p><Car size={16} /> <span><strong>Parking:</strong> Public parking available</span></p>
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
