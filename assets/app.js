/* ============================================
   BridgePay — Professional Application Logic
   Enhanced Interactions & Dashboard Foundation
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // THEME TOGGLE & PERSISTENCE
  // ============================================

  const themeBtn = document.getElementById('themeToggle');
  const THEME_KEY = 'bridgepay-theme-mode';

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      if (themeBtn) themeBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      if (themeBtn) themeBtn.textContent = '🌙';
    }
  }

  // Toggle theme and save preference
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });
  }

  // ============================================
  // ORDER TRACKING ANIMATION
  // ============================================

  function animateCar() {
    const path = document.getElementById('route');
    const car = document.getElementById('car');
    
    if (!path || !car) return;

    const pathLength = path.getTotalLength ? path.getTotalLength() : 800;
    let t = 0;

    function step() {
      t += 0.0025; // Speed control
      if (t > 1) t = 1;

      try {
        const pt = path.getPointAtLength(t * pathLength);
        car.setAttribute('transform', `translate(${pt.x - 10}, ${pt.y - 5})`);
      } catch (e) {
        // Fallback for browsers that don't support getPointAtLength
        const progress = t * 100;
        car.setAttribute('transform', `translate(${progress * 5}, ${100 - progress * 0.5})`);
      }

      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    step();
  }

  // Expose tracker function globally
  window.openTracker = function() {
    const mapStatus = document.getElementById('mapStatus');
    if (mapStatus) {
      mapStatus.textContent = '🚚 Live Tracking: Moving to checkpoint #4 — Estimated delivery in 2 days';
    }
    animateCar();
  };

  // ============================================
  // DASHBOARD NAVIGATION
  // ============================================

  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Remove active class from all items
      sidebarItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      this.classList.add('active');
    });
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // FORM VALIDATION & SUBMISSION
  // ============================================

  window.validateForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    });

    return isValid;
  };

  // ============================================
  // TRUST SCORE VISUALIZATION
  // ============================================

  window.updateTrustScore = function(score) {
    const trustScoreElement = document.getElementById('trustScore');
    if (!trustScoreElement) return;

    const percentage = Math.min(Math.max(score, 0), 100);
    trustScoreElement.style.width = percentage + '%';

    // Color based on score
    if (percentage >= 80) {
      trustScoreElement.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    } else if (percentage >= 60) {
      trustScoreElement.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
      trustScoreElement.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    }
  };

  // ============================================
  // AI FINGERPRINT DETECTION DEMO
  // ============================================

  window.runFingerprintDetection = function() {
    const resultElement = document.getElementById('fingerprintResult');
    if (!resultElement) return;

    resultElement.innerHTML = '<p>🔍 Analyzing product fingerprint...</p>';
    resultElement.style.opacity = '0.6';

    // Simulate AI processing
    setTimeout(() => {
      const isAuthentic = Math.random() > 0.3; // 70% authentic rate for demo
      const result = isAuthentic
        ? '✅ Product Verified: Fingerprint matches seller\'s proof. Payment released.'
        : '⚠️ Mismatch Detected: Product fingerprint differs from seller\'s proof. Dispute initiated.';

      resultElement.innerHTML = `<p>${result}</p>`;
      resultElement.style.opacity = '1';
    }, 2000);
  };

  // ============================================
  // PAYMENT ESCROW FLOW
  // ============================================

  window.initiatePaymentHold = function(orderId, amount) {
    const statusElement = document.getElementById(`status-${orderId}`);
    if (!statusElement) return;

    statusElement.innerHTML = `
      <div class="payment-status">
        <p>💳 Payment of $${amount} is being held securely by BridgePay</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 33%"></div>
        </div>
        <p style="font-size: 12px; color: var(--text-muted);">Awaiting product delivery confirmation...</p>
      </div>
    `;
  };

  window.releasePayment = function(orderId, amount) {
    const statusElement = document.getElementById(`status-${orderId}`);
    if (!statusElement) return;

    statusElement.innerHTML = `
      <div class="payment-released">
        <p>✅ Payment of $${amount} has been released to seller</p>
        <p style="font-size: 12px; color: var(--text-secondary);">Transaction completed successfully</p>
      </div>
    `;
  };

  // ============================================
  // PRODUCT TRACKING CHECKPOINTS
  // ============================================

  window.updateTrackingCheckpoint = function(checkpointNumber) {
    const checkpoints = document.querySelectorAll('.checkpoint');
    checkpoints.forEach((cp, index) => {
      if (index < checkpointNumber) {
        cp.classList.add('completed');
      } else {
        cp.classList.remove('completed');
      }
    });
  };

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================

  window.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 10px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6D28D9'};
      color: white;
      font-weight: 600;
      font-size: 14px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  };

  // ============================================
  // DASHBOARD DATA LOADING SIMULATION
  // ============================================

  window.loadDashboardData = function(userType) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    mainContent.style.opacity = '0.6';

    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 800);
  };

  // ============================================
  // ADVANCED PAYMENT ESCROW SIMULATION
  // ============================================

  window.simulatePaymentFlow = function(orderId) {
    const statusElement = document.getElementById(`status-${orderId}`);
    if (!statusElement) return;

    let stage = 0;
    const stages = [
      { text: '💳 Payment received and verified', progress: 25 },
      { text: '🔒 Payment held in escrow by BridgePay', progress: 50 },
      { text: '📦 Awaiting product delivery confirmation', progress: 75 },
      { text: '✅ Payment released to seller', progress: 100 }
    ];

    function nextStage() {
      if (stage < stages.length) {
        const currentStage = stages[stage];
        statusElement.innerHTML = `
          <div class="payment-status">
            <p>${currentStage.text}</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${currentStage.progress}%"></div>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">${currentStage.progress}% complete</p>
          </div>
        `;
        stage++;
        setTimeout(nextStage, 2000);
      }
    }
    nextStage();
  };

  // ============================================
  // ADVANCED TRUST SCORE MANAGEMENT
  // ============================================

  window.calculateTrustScore = function(completedOrders, disputes, confirmedDeliveries) {
    const baseScore = 100;
    const disputePenalty = disputes * 15;
    const confirmationBonus = Math.min(confirmedDeliveries * 0.5, 20);
    const score = Math.max(0, Math.min(100, baseScore - disputePenalty + confirmationBonus));
    return Math.round(score);
  };

  window.displayTrustAnalysis = function() {
    const analysisElement = document.getElementById('trustAnalysis');
    if (!analysisElement) return;

    const score = calculateTrustScore(47, 1, 46);
    const level = score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 50 ? 'Fair' : 'Poor';
    const color = score >= 90 ? '#10b981' : score >= 75 ? '#f59e0b' : '#ef4444';

    analysisElement.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 48px; color: ${color}; margin-bottom: 16px;">${score}%</div>
        <div style="color: var(--white); font-size: 20px; font-weight: 700; margin-bottom: 8px;">${level} Standing</div>
        <p style="color: var(--text-secondary); margin: 0;">Your trust score reflects your transaction history and behavior on the platform.</p>
      </div>
    `;
  };

  // ============================================
  // ENHANCED FINGERPRINT DETECTION WITH CONFIDENCE SCORE
  // ============================================

  window.runAdvancedFingerprintDetection = function() {
    const resultElement = document.getElementById('fingerprintResult');
    if (!resultElement) return;

    resultElement.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <p style="font-size: 14px; color: var(--text-secondary);">🔍 Analyzing product fingerprint...</p>
        <div style="margin-top: 16px; width: 100%; height: 4px; background: rgba(139, 92, 246, 0.1); border-radius: 2px; overflow: hidden;">
          <div style="width: 0%; height: 100%; background: linear-gradient(90deg, #6D28D9, #8B5CF6); animation: progress 2s ease-in-out forwards;"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const isAuthentic = Math.random() > 0.25; // 75% authentic rate
      const confidence = Math.round(90 + Math.random() * 9); // 90-99% confidence

      if (isAuthentic) {
        resultElement.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 10px; border-left: 3px solid #10b981;">
            <p style="color: #10b981; font-weight: 600; margin: 0 0 8px 0;">✅ Product Verified</p>
            <p style="color: var(--text-secondary); font-size: 13px; margin: 0;">Fingerprint matches seller's proof with ${confidence}% confidence. Payment released to seller.</p>
          </div>
        `;
      } else {
        resultElement.innerHTML = `
          <div style="background: rgba(239, 68, 68, 0.1); padding: 20px; border-radius: 10px; border-left: 3px solid #ef4444;">
            <p style="color: #ef4444; font-weight: 600; margin: 0 0 8px 0;">⚠️ Mismatch Detected</p>
            <p style="color: var(--text-secondary); font-size: 13px; margin: 0;">Product fingerprint differs from seller's proof (${confidence}% confidence). Dispute initiated. Buyer will be refunded.</p>
          </div>
        `;
      }
    }, 2000);
  };

  // ============================================
  // CHECKPOINT TRACKING WITH TIMESTAMPS
  // ============================================

  window.updateCheckpointWithTime = function(checkpointNumber) {
    const checkpoints = document.querySelectorAll('.checkpoint');
    const timestamps = [
      'Jan 28, 2025 - 10:30 AM',
      'Jan 28, 2025 - 2:45 PM',
      'Jan 29, 2025 - 8:15 AM',
      'Jan 30, 2025 - 2:00 PM'
    ];

    checkpoints.forEach((cp, index) => {
      if (index < checkpointNumber) {
        cp.classList.add('completed');
        const timeElement = cp.nextElementSibling;
        if (timeElement) {
          timeElement.style.color = '#10b981';
        }
      } else {
        cp.classList.remove('completed');
      }
    });
  };

  // ============================================
  // DISPUTE RESOLUTION FLOW
  // ============================================

  window.initiateDisputeFlow = function(orderId) {
    const disputeElement = document.getElementById(`dispute-${orderId}`);
    if (!disputeElement) return;

    disputeElement.innerHTML = `
      <div style="background: rgba(245, 158, 11, 0.1); padding: 20px; border-radius: 10px; border-left: 3px solid #f59e0b;">
        <p style="color: #f59e0b; font-weight: 600; margin: 0 0 12px 0;">⚖️ Dispute Under Review</p>
        <div style="color: var(--text-secondary); font-size: 13px; line-height: 1.8;">
          <p style="margin: 0 0 8px 0;">📸 Analyzing seller's proof images...</p>
          <p style="margin: 0 0 8px 0;">📸 Analyzing buyer's received product...</p>
          <p style="margin: 0 0 8px 0;">🤖 Running AI fingerprint comparison...</p>
          <p style="margin: 0;">⏳ Estimated resolution: 24-48 hours</p>
        </div>
      </div>
    `;
  };

  // ============================================
  // INITIALIZATION
  // ============================================

  // Initialize theme on page load
  initTheme();

  // Add fade-in animation to page elements
  document.querySelectorAll('.card, .tracker-card, .feature, .stat-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add('fade-in');
  });

  // Log initialization
  console.log('🌉 BridgePay Application Initialized');
  console.log('Theme:', localStorage.getItem(THEME_KEY) || 'system');

})();

// ============================================
// CSS ANIMATIONS (injected)
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 3px;
    overflow: hidden;
    margin: 12px 0;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6D28D9, #8B5CF6);
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .payment-status, .payment-released {
    padding: 16px;
    border-radius: 10px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .payment-released {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
  }

  input.error {
    border-color: #ef4444 !important;
    background: rgba(239, 68, 68, 0.05) !important;
  }

  .checkpoint {
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .checkpoint.completed {
    opacity: 1;
  }
`;
document.head.appendChild(style);
