import { useState, useEffect } from 'react';
import { getBookingsForUser, getCurrentUser } from '../storage';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';

export const BrideDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      setBookings(getBookingsForUser(user.id, 'BRIDE'));
    }
  }, [user]);

  if (!user || user.role !== 'BRIDE') {
    return <div className="container" style={{paddingTop:'150px'}}>Access Denied. Please login as a Client.</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hello, {user.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Track your beauty bookings for your big day!</p>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>You haven't booked any artists yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {bookings.map((booking, idx) => (
            <motion.div 
              key={booking.id} 
              className="glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{ padding: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem',
                    background: booking.status === 'PENDING' ? '#f39c12' : booking.status === 'CONFIRMED' ? '#2ecc71' : '#e74c3c',
                    color: '#fff'
                  }}>
                    {booking.status}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', marginBottom: '1rem' }}>{booking.eventType}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Date: {booking.eventDate || 'TBD'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> Time: {booking.eventTime || 'TBD'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Venue: {booking.eventPlace || 'TBD'}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Total: ₹{booking.totalAmount?.toLocaleString()}</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Advance Escrow: ₹{booking.advancePaid?.toLocaleString()}</p>
                </div>
              </div>
              
              {booking.status === 'PENDING' && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(243, 156, 18, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f39c12' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>Your booking request has been sent to the artist. They will review the venue and timing shortly.</p>
                </div>
              )}

              {booking.status === 'CONFIRMED' && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>Your booking is confirmed! The artist will be at the venue on time.</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
