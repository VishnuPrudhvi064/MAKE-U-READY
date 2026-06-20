import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 1,
    title: 'Bridal HD Makeup & Saree',
    image: '/bride.jpg',
    span: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    title: 'Mehendi Art',
    image: '/mehendi.jpg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    title: 'Premium Hair Styling',
    image: '/hair.jpg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    title: 'Nail Art & Polishing',
    image: '/nails.jpg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 5,
    title: 'Pre-Bridal & Salon Services',
    image: '/salon.jpg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'Bridal Jewelry Ornaments',
    image: '/jewelry.jpg',
    span: 'col-span-1 row-span-1'
  }
];

export const Home = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      
      <motion.div className="container animate-fade-up" style={{ textAlign: 'center', width: '100%', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Your Perfect Look,<br/> <span className="text-gradient">Just a Click Away</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Join the exclusive bridal beauty platform in Delhi NCR. Explore a curated selection of elite artists and premium salon services tailored for your big day.
        </p>
      </motion.div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Premium Services</h2>
          <p style={{ color: 'var(--text-muted)' }}>From head to toe, everything a bride and groom needs to shine.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          gridAutoFlow: 'dense'
        }}>
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="glass"
              style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '24px',
                height: cat.span.includes('row-span-2') ? '500px' : '240px',
                gridColumn: cat.span.includes('col-span-2') ? 'span 2' : 'span 1',
                cursor: 'pointer'
              }}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
