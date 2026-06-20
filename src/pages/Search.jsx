import { useState, useEffect } from 'react';
import { getFromStorage, createBooking, getCurrentUser } from '../storage';
import { Star, MapPin, Briefcase, ChevronRight, Search as SearchIcon, ShieldCheck, Lock, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ pkg, artist, onClose, onSuccess }) => {
  // Steps: 0 = Form, 1 = Generating, 2 = Locking, 3 = Success
  const [step, setStep] = useState(0);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPlace, setEventPlace] = useState('');

  const handleStartEscrow = (e) => {
    e.preventDefault();
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2500);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => {
        onSuccess({ eventDate, eventTime, eventPlace });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onSuccess, eventDate, eventTime, eventPlace]);

  const advanceAmount = pkg.price * 0.2;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(5px)' }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass" style={{ width: '450px', padding: '2.5rem', background: 'var(--card-bg)' }}>
        
        {step === 0 ? (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Event Details</h3>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>Please provide details for {artist.name}</p>
            
            <form onSubmit={handleStartEscrow}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}><Calendar size={16} style={{display:'inline', marginRight:'0.5rem'}}/>Event Date</label>
                <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-main)' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}><Clock size={16} style={{display:'inline', marginRight:'0.5rem'}}/>Event Time</label>
                <input type="time" required value={eventTime} onChange={e => setEventTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-main)' }} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}><MapPin size={16} style={{display:'inline', marginRight:'0.5rem'}}/>Venue / Place</label>
                <input type="text" placeholder="e.g. Taj Palace, Chanakyapuri" required value={eventPlace} onChange={e => setEventPlace(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-main)' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={onClose} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={18}/> Proceed to Pay</button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <ShieldCheck size={48} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Enterprise Escrow Vault</h3>
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ color: 'var(--text-muted)' }}>Generating Secure Smart Contract for {artist.name}...</p>
                <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '1.5rem' }}>
                  <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2 }} style={{ height: '100%', background: 'var(--primary-color)' }} />
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Lock size={32} color="#f39c12" style={{ margin: '0 auto 1rem auto' }} />
                <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>Locking Advance: ₹{advanceAmount.toLocaleString()}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Funds are held securely in escrow until service completion.</p>
                <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '1.5rem' }}>
                  <motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5 }} style={{ height: '100%', background: '#f39c12' }} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#2ecc71', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '2rem' }}>✓</div>
                <p style={{ color: '#2ecc71', fontWeight: 600, fontSize: '1.2rem' }}>Escrow Locked & Booked!</p>
              </motion.div>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};

export const Search = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentModal, setPaymentModal] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const allUsers = getFromStorage('users');
    setAllArtists(allUsers.filter(u => u.role === 'ARTIST'));
    setPackages(getFromStorage('packages'));
  }, []);

  const filteredArtists = allArtists.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInitiateBooking = (pkg, artist) => {
    if (!user || user.role !== 'BRIDE') {
      alert("Please login as a Client to book this package.");
      return;
    }
    setPaymentModal({ pkg, artist });
  };

  const handlePaymentSuccess = ({ eventDate, eventTime, eventPlace }) => {
    const { pkg } = paymentModal;
    createBooking({
      brideId: user.id,
      brideName: user.name,
      artistId: pkg.artistId,
      packageId: pkg.id,
      eventDate,
      eventTime,
      eventPlace,
      eventType: pkg.title,
      totalAmount: pkg.price,
      advancePaid: pkg.price * 0.2
    });
    setPaymentModal(null);
    alert(`Successfully requested booking for ${pkg.title}! You can track it in your dashboard.`);
    setSelectedArtist(null);
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '100vh' }}>
      
      <AnimatePresence>
        {paymentModal && (
          <PaymentModal 
            pkg={paymentModal.pkg} 
            artist={paymentModal.artist}
            onClose={() => setPaymentModal(null)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </AnimatePresence>

      {!selectedArtist ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>Discover <span className="text-gradient">Artists</span></h1>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <SearchIcon size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search by name, location, or specialty..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '30px', 
                  border: '1px solid var(--glass-border)', background: 'var(--card-bg)', 
                  color: 'var(--text-main)', fontSize: '1rem', outline: 'none',
                  boxShadow: 'var(--glass-shadow)'
                }} 
              />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredArtists.map((artist, idx) => (
              <motion.div 
                key={artist.id} 
                className="glass" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setSelectedArtist(artist)}
              >
                <div style={{ position: 'relative' }}>
                  <img src={artist.profileImage} alt={artist.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--card-bg)', padding: '0.25rem 0.75rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(5px)' }}>
                    {artist.specialty}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{artist.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)' }}>
                      <Star size={16} fill="var(--primary-color)" />
                      <span style={{ fontWeight: 600 }}>{artist.average_rating}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> {artist.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14}/> {artist.experience_years} Years</span>
                  </div>
                  <button className="btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    View Profile <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredArtists.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                No artists found matching your search.
              </div>
            )}
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => setSelectedArtist(null)} style={{ marginBottom: '2rem', background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ← Back to Search
          </button>
          
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <img src={selectedArtist.profileImage} alt={selectedArtist.name} style={{ width: '100%', borderRadius: '24px', marginBottom: '2rem', maxHeight: '500px', objectFit: 'cover' }} />
              <div style={{ display: 'inline-block', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, marginBottom: '1rem' }}>
                {selectedArtist.specialty}
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selectedArtist.name}</h2>
              <p style={{ color: 'var(--primary-color)', fontWeight: 600, marginBottom: '1.5rem' }}>⭐ {selectedArtist.average_rating} ({selectedArtist.reviews_count} Reviews)</p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{selectedArtist.bio}</p>
            </div>
            
            <div style={{ flex: '1 1 500px' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Service Packages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {packages.filter(p => p.artistId === selectedArtist.id).map(pkg => (
                  <div key={pkg.id} className="glass" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1.5rem', margin: 0 }}>{pkg.title}</h4>
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>₹{pkg.price.toLocaleString()}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{pkg.description}</p>
                    <ul style={{ marginBottom: '2rem', paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
                      {pkg.features.map((feat, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{feat}</li>)}
                    </ul>
                    <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 500 }}>Advance Required (20%):</span>
                      <span style={{ fontWeight: 700, color: '#f39c12' }}>₹{(pkg.price * 0.2).toLocaleString()}</span>
                    </div>
                    <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} onClick={() => handleInitiateBooking(pkg, selectedArtist)}>
                      <ShieldCheck size={18} /> Enter Details & Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
