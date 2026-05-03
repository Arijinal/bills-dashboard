import { socialFeed, fullRoster } from '../data/mockData';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaHeart, FaRetweet, FaComment } from 'react-icons/fa';
import { usePlayerDossier } from '../contexts/PlayerDossierContext';

import { onKeyboardActivate } from '../utils/a11y';
const fmt = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n;
};

export default function SocialFeed() {
  const { openDossier } = usePlayerDossier();
  const findPlayer = (name) => fullRoster.find(p => p.name === name);

  return (
    <motion.section id="social" className="section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="section-header">
        <span className="section-prefix">SOCIAL</span>
        <h2 className="section-title">Player Feed</h2>
      </div>

      <div className="social-grid">
        {socialFeed.map((post, i) => (
          <motion.div
            key={post.id}
            className="social-card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            {/* Platform indicator */}
            <div className="social-platform">
              {post.platform === 'twitter' ? <FaTwitter color="#1DA1F2" /> : <FaInstagram color="#E4405F" />}
            </div>

            {/* Header */}
            <div className="social-header">
              <div className="social-avatar" style={{ background: 'linear-gradient(135deg, #00338D, #C60C30)' }}>
                <span>{post.avatar}</span>
              </div>
              <div className="social-user-info">
                <span className="social-player-name player-name-link" onClick={() => openDossier(findPlayer(post.player))} role="button" tabIndex={0} onKeyDown={onKeyboardActivate(() => openDossier(findPlayer(post.player)))}>
                  {post.player}
                  {post.verified && <span className="verified-check">&#10003;</span>}
                </span>
                <span className="social-handle">{post.handle}</span>
              </div>
              <span className="social-time">{post.time}</span>
            </div>

            {/* Content */}
            <p className="social-text">{post.text}</p>

            {/* Engagement */}
            <div className="social-engagement">
              <span className="engagement-item">
                <FaHeart color="#C60C30" size={14} />
                {fmt(post.likes)}
              </span>
              {post.platform === 'twitter' && (
                <span className="engagement-item">
                  <FaRetweet color="#22c55e" size={14} />
                  {fmt(post.retweets)}
                </span>
              )}
              <span className="engagement-item">
                <FaComment color="#00338D" size={14} />
                {fmt(post.comments)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
