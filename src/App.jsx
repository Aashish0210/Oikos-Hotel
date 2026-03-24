import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Wifi, 
  Wind, 
  Car, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Menu,
  X,
  Star,
  Bath,
  Tv,
  Coffee,
  Shield,
  Clock,
  Phone,
  Monitor,
  Mail,
  CheckCircle
} from 'lucide-react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState('landing'); // 'landing', 'select-dates', 'select-room', 'success'
  const [lastBookedRoom, setLastBookedRoom] = useState(null);
  
  // Scroll to top on bookingStep change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookingStep]);

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
  }, [bookingStep]);

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
      price: 250,
      amenities: ['1 King-size Bed · 42 m²', 'Soundproofing', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_double_alt.jpg', '/assets/room_junior_bath.jpg'],
      bookingUrl: 'https://www.booking.com/Share-mHVkfk'
    },
    {
      id: 'family',
      name: 'Family Room',
      description: 'Comfortably fits 3 guests. Perfect for families.',
      price: 180,
      amenities: ['1 Queen + 1 Single Bed', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_family_bed.jpg', '/assets/room_family_bath.jpg'],
      bookingUrl: 'https://www.booking.com/Share-mHVkfk'
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Modern comfort for 2, with all essentials included.',
      price: 150,
      amenities: ['1 King-size Bed', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
      images: ['/assets/room_deluxe_king.jpg', '/assets/room_deluxe_tv.jpg'],
      bookingUrl: 'https://www.booking.com/Share-mHVkfk'
    },
    {
        id: 'twin',
        name: 'Deluxe Twin Room',
        description: 'Great for friends or colleagues sharing a room.',
        price: 155,
        amenities: ['2 Single Beds', 'Air Conditioning', 'Ensuite Bathroom', 'Flat-screen TV · Free WiFi'],
        images: ['/assets/room_twin_bed.jpg', '/assets/room_twin_seating.jpg'],
        bookingUrl: 'https://www.booking.com/Share-mHVkfk'
      },
      {
        id: 'double',
        name: 'Double Room',
        description: 'A clean, comfortable room for 2 with all essentials.',
        price: 130,
        amenities: ['1 Double Bed', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
        images: ['/assets/room_double_king.jpg', '/assets/room_double_alt.jpg'],
        bookingUrl: 'https://www.booking.com/Share-mHVkfk'
      },
      {
        id: 'single',
        name: 'Standard Single Room',
        description: 'Cozy and efficient — ideal for solo travellers.',
        price: 90,
        amenities: ['1 Single Bed', 'Air Conditioning', 'Private Bathroom', 'Flat-screen TV · Free WiFi'],
        images: ['/assets/room_single_bed.jpg'],
        bookingUrl: 'https://www.booking.com/Share-mHVkfk'
      }
  ];

  return (
    <div className="app-container">
      {/* Floating WhatsApp - logic consistent with original */}
      <a href="https://wa.me/60123456789" className="whatsapp-float" target="_blank" rel="noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        <span>Chat with Us</span>
      </a>

      {/* Mobile nav backdrop */}
      {isMenuOpen && (
        <div className="nav-backdrop active" onClick={() => setIsMenuOpen(false)} />
      )}

      <nav id="main-nav" className={`${isScrolled ? 'scrolled' : ''} ${bookingStep !== 'landing' ? 'dark-mode' : ''}`}>
        <div className="container nav-wrapper">
          <div className="logo" onClick={() => {
            setBookingStep('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
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
            <button 
                className="btn btn-primary btn-sm nav-btn"
                onClick={() => {
                    setIsMenuOpen(false);
                    setBookingStep('select-dates');
                }}
            >
                Direct Booking
            </button>
            <button className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {bookingStep === 'landing' && (
        <>
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
                  <button onClick={() => setBookingStep('select-dates')} className="btn btn-primary">Book Directly</button>
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
                        <span className="room-price">from MYR {room.price}</span>
                        <button className="btn btn-primary" onClick={() => setBookingStep('select-dates')}>Select Dates</button>
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
        </>
      )}

      {bookingStep !== 'landing' && (
          <BookingPortal step={bookingStep} setStep={setBookingStep} rooms={rooms} lastBookedRoom={lastBookedRoom} setLastBookedRoom={setLastBookedRoom} />
      )}

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
              <p><Phone size={16} /> <span><strong>Tel:</strong> +60 7-688 3333</span></p>
              <p><Mail size={16} /> <span><strong>Email:</strong> info@theoikoshotel.com.my</span></p>
              <p><Car size={16} /> <span><strong>Parking:</strong> On-site (RM 6/day)</span></p>
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

// --- Sub-Components ---

const BookingPortal = ({ step, setStep, rooms, lastBookedRoom, setLastBookedRoom }) => {
  const [selectedDates, setSelectedDates] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (step === 'select-dates') {
      flatpickr("#date-range", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: (dates) => {
          if (dates.length === 2) {
            setSelectedDates(dates);
          }
        }
      });
    }
  }, [step]);

  const handleDatesSubmit = () => {
    if (!selectedDates || selectedDates.length !== 2) {
      setIsValidationFailed(true);
      alert("Please select your check-in and check-out dates to see available rooms.");
      return;
    }
    setIsValidationFailed(false);
    setStep('select-room');
    // Scroll to the room selection top
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const calculateNights = () => {
    if (!selectedDates) return 0;
    const diff = selectedDates[1].getTime() - selectedDates[0].getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const handlePayment = (room) => {
    setLastBookedRoom(room);
    setStep('success');
  };

  return (
    <section className="booking-portal section">
      <div className="container">
        <div className="booking-header">
            <button className="btn-back" onClick={() => setStep('landing')}>
                <ChevronLeft size={20} /> Back to Home
            </button>
            <h2 className="section-title">Direct Booking</h2>
        </div>

        {step === 'select-dates' && (
            <div className="booking-step-container card">
                <h3>Select Your Dates</h3>
                <div className="booking-form-grid">
                    <div className={`input-group ${isValidationFailed ? 'validation-error' : ''}`}>
                        <label><Calendar size={16} /> Check-in & Check-out</label>
                        <input 
                            type="text" 
                            id="date-range" 
                            placeholder="Select your stay dates" 
                            onFocus={() => setIsValidationFailed(false)}
                        />
                    </div>
                    <div className="input-group">
                        <label><Users size={16} /> Guests</label>
                        <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                            <option value={3}>3 Guests</option>
                            <option value={4}>4 Guests</option>
                        </select>
                    </div>
                </div>
                <button 
                    className="btn btn-primary btn-full" 
                    onClick={handleDatesSubmit}
                >
                    Check Availability
                </button>
            </div>
        )}

        {step === 'select-room' && (
            <div className="booking-room-selection">
                <div className="booking-summary-bar">
                    <div className="summary-item">
                        <strong>Dates</strong>
                        {selectedDates && selectedDates.length === 2
                            ? `${selectedDates[0].toLocaleDateString()} – ${selectedDates[1].toLocaleDateString()} (${calculateNights()} nights)`
                            : 'No dates selected'}
                    </div>
                    <div className="summary-item">
                        <strong>Guests</strong>
                        {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setStep('select-dates')}>Edit Dates</button>
                </div>

                <div className="room-selection-grid">
                    {rooms.map(room => (
                        <div key={room.id} className="room-selection-card">
                            <img src={room.images[0]} alt={room.name} />
                            <div className="content">
                                <h4>{room.name}</h4>
                                <p className="selection-description">{room.description}</p>
                                <ul className="mini-amenities">
                                    {room.amenities.map((a, i) => <li key={i}>{a}</li>)}
                                </ul>
                                <div className="price-box">
                                    <div className="pricing">
                                        <span className="price">MYR {room.price}</span>
                                        <span className="unit">/ night (approx.)</span>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => handlePayment(room)}>
                                        Complete Booking <ArrowRight size={16}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {step === 'success' && (
            <div className="booking-step-container success-card" style={{ textAlign: 'center' }}>
                <div className="success-icon-box">
                    <CheckCircle size={80} color="#10b981" />
                </div>
                <h3>Booking Confirmed!</h3>
                <p className="success-msg">Your stay at <strong>{lastBookedRoom?.name}</strong> has been successfully reserved.</p>
                <div className="booking-details-summary">
                    <p>A confirmation email has been sent to your registered address.</p>
                </div>
                <button className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} onClick={() => setStep('landing')}>
                    Return to Home Page
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default App;
