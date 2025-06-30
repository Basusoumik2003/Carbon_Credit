import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Your Carbon Footprint",
      excerpt: "Discover practical tips and strategies to minimize your environmental impact in everyday life.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Lifestyle",
      readTime: "5 min read",
      image: "🌱"
    },
    {
      id: 2,
      title: "The Future of Renewable Energy",
      excerpt: "Exploring the latest developments in solar, wind, and other renewable energy technologies.",
      author: "Michael Chen",
      date: "March 12, 2024",
      category: "Technology",
      readTime: "8 min read",
      image: "⚡"
    },
    {
      id: 3,
      title: "Sustainable Cities: Building for Tomorrow",
      excerpt: "How urban planning and green infrastructure are shaping the cities of the future.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      category: "Urban Planning",
      readTime: "6 min read",
      image: "🏙️"
    },
    {
      id: 4,
      title: "The Impact of Fast Fashion on the Environment",
      excerpt: "Understanding the environmental consequences of the fashion industry and sustainable alternatives.",
      author: "David Kim",
      date: "March 8, 2024",
      category: "Fashion",
      readTime: "7 min read",
      image: "👕"
    },
    {
      id: 5,
      title: "Zero Waste Living: A Complete Guide",
      excerpt: "Learn how to minimize waste and live a more sustainable lifestyle with practical tips and resources.",
      author: "Lisa Thompson",
      date: "March 5, 2024",
      category: "Lifestyle",
      readTime: "10 min read",
      image: "♻️"
    },
    {
      id: 6,
      title: "Climate Change: What You Need to Know",
      excerpt: "A comprehensive overview of climate change, its causes, effects, and what we can do about it.",
      author: "Dr. Robert Wilson",
      date: "March 3, 2024",
      category: "Science",
      readTime: "12 min read",
      image: "🌍"
    }
  ];

  return (
    <div className="main-content">
      <div className="blog-header">
        <div className="container">
          <h1>Sustainability Blog</h1>
          <p>Stay updated with the latest insights on sustainable development and environmental conservation</p>
        </div>
      </div>

      <section className="blog-section">
        <div className="container">
          <div className="blog-filters">
            <button className="filter-btn active">All Posts</button>
            <button className="filter-btn">Lifestyle</button>
            <button className="filter-btn">Technology</button>
            <button className="filter-btn">Science</button>
            <button className="filter-btn">Urban Planning</button>
          </div>

          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <span className="image-emoji">{post.image}</span>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="category">{post.category}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-footer">
                    <div className="author-info">
                      <span className="author">{post.author}</span>
                      <span className="date">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-primary read-more">Read More</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-pagination">
            <button className="pagination-btn">Previous</button>
            <div className="page-numbers">
              <span className="page-number active">1</span>
              <span className="page-number">2</span>
              <span className="page-number">3</span>
            </div>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest sustainability insights and tips.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CarbonCredit</h3>
              <p>Building a sustainable future through innovative carbon credit solutions and environmental consciousness.</p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/disclaimer">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 CarbonCredit. All rights reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog; 