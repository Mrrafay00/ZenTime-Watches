// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Create custom alert styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 51, 12, 0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .custom-alert-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .custom-alert {
            background: rgba(244, 247, 245, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 3px solid rgb(3, 51, 12);
            transform: translateY(-30px);
            transition: transform 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        
        .custom-alert-overlay.active .custom-alert {
            transform: translateY(0);
        }
        
        .alert-header {
            text-align: center;
            margin-bottom: 25px;
            position: relative;
        }
        
        .alert-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, rgb(3, 51, 12), rgb(5, 80, 20));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: rgb(244, 247, 245);
            font-size: 36px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .alert-title {
            font-size: 28px;
            font-weight: 800;
            color: rgb(3, 51, 12);
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        
        .alert-subtitle {
            font-size: 16px;
            color: rgb(3, 51, 12);
            opacity: 0.8;
        }
        
        .alert-content {
            background: rgba(3, 51, 12, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid rgb(3, 51, 12);
        }
        
        .alert-message {
            font-size: 16px;
            line-height: 1.6;
            color: rgb(3, 51, 12);
            margin-bottom: 15px;
        }
        
        .alert-details {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border: 1px solid rgba(3, 51, 12, 0.2);
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .detail-label {
            color: rgb(3, 51, 12);
            font-weight: 600;
        }
        
        .detail-value {
            color: rgb(3, 51, 12);
            font-weight: 500;
        }
        
        .message-preview {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
            border-left: 3px solid rgb(244, 247, 245);
            font-style: italic;
            color: rgb(3, 51, 12);
            font-size: 14px;
            line-height: 1.5;
        }
        
        .alert-footer {
            text-align: center;
            margin-top: 25px;
            color: rgb(3, 51, 12);
            font-size: 14px;
            opacity: 0.8;
        }
        
        .alert-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        
        .alert-btn {
            flex: 1;
            padding: 15px 25px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .alert-btn-primary {
            background: linear-gradient(135deg, rgb(3, 51, 12), rgb(5, 80, 20));
            color: rgb(244, 247, 245);
        }
        
        .alert-btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(3, 51, 12, 0.3);
        }
        
        .alert-btn-secondary {
            background: transparent;
            color: rgb(3, 51, 12);
            border: 2px solid rgb(3, 51, 12);
        }
        
        .alert-btn-secondary:hover {
            background: rgba(3, 51, 12, 0.1);
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgb(3, 51, 12);
            border-radius: 50%;
            animation: confetti-fall 2s ease-out forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(500px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .watch-icon {
            font-size: 24px;
            margin-right: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Create custom alert function
    function showCustomAlert(options) {
        const overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';
        
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        
        // Create confetti
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            confetti.style.background = i % 3 === 0 ? 'rgb(244, 247, 245)' : 
                                       i % 3 === 1 ? 'rgb(3, 51, 12)' : 'rgb(5, 80, 20)';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            alert.appendChild(confetti);
        }
        
        const header = document.createElement('div');
        header.className = 'alert-header';
        
        const icon = document.createElement('div');
        icon.className = 'alert-icon';
        icon.innerHTML = options.icon || '✓';
        
        const title = document.createElement('h2');
        title.className = 'alert-title';
        title.textContent = options.title || 'Alert';
        
        const subtitle = document.createElement('p');
        subtitle.className = 'alert-subtitle';
        subtitle.textContent = options.subtitle || '';
        
        header.appendChild(icon);
        header.appendChild(title);
        if (options.subtitle) header.appendChild(subtitle);
        
        const content = document.createElement('div');
        content.className = 'alert-content';
        
        const message = document.createElement('p');
        message.className = 'alert-message';
        message.textContent = options.message || '';
        content.appendChild(message);
        
        // Add details if provided
        if (options.details && options.details.length > 0) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'alert-details';
            
            options.details.forEach(detail => {
                const detailItem = document.createElement('div');
                detailItem.className = 'detail-item';
                
                const label = document.createElement('span');
                label.className = 'detail-label';
                label.textContent = detail.label + ': ';
                
                const value = document.createElement('span');
                value.className = 'detail-value';
                value.textContent = detail.value;
                
                detailItem.appendChild(label);
                detailItem.appendChild(value);
                detailsDiv.appendChild(detailItem);
            });
            
            content.appendChild(detailsDiv);
        }
        
        // Add message preview if provided
        if (options.messagePreview) {
            const preview = document.createElement('div');
            preview.className = 'message-preview';
            preview.textContent = '💎 ' + options.messagePreview;
            content.appendChild(preview);
        }
        
        const footer = document.createElement('div');
        footer.className = 'alert-footer';
        footer.textContent = options.footer || 'ZenTime Watches • Crafting Timeless Moments';
        
        const actions = document.createElement('div');
        actions.className = 'alert-actions';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'alert-btn alert-btn-primary';
        closeBtn.innerHTML = '<i class="fas fa-check watch-icon"></i> ' + (options.buttonText || 'Continue');
        closeBtn.onclick = function() {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(overlay);
                if (options.onClose) options.onClose();
            }, 300);
        };
        
        actions.appendChild(closeBtn);
        
        // Add secondary button if provided
        if (options.secondaryButton) {
            const secondaryBtn = document.createElement('button');
            secondaryBtn.className = 'alert-btn alert-btn-secondary';
            secondaryBtn.innerHTML = '<i class="fas fa-times watch-icon"></i> ' + options.secondaryButton.text;
            secondaryBtn.onclick = function() {
                overlay.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    if (options.secondaryButton.onClick) options.secondaryButton.onClick();
                }, 300);
            };
            actions.appendChild(secondaryBtn);
        }
        
        alert.appendChild(header);
        alert.appendChild(content);
        alert.appendChild(footer);
        alert.appendChild(actions);
        overlay.appendChild(alert);
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => overlay.classList.add('active'), 10);
        
        // Auto close after 8 seconds if no interaction
        let autoCloseTimer = setTimeout(() => {
            if (document.body.contains(overlay)) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
            }
        }, 8000);
        
        // Clear timer on interaction
        overlay.addEventListener('click', () => clearTimeout(autoCloseTimer));
        closeBtn.addEventListener('click', () => clearTimeout(autoCloseTimer));
    }
    
    // Newsletter Subscription Form
    const newsletterForm = document.querySelector('.btn-newsletter');
    const newsletterInput = document.querySelector('.input-group .form-control');
    
    if (newsletterForm && newsletterInput) {
        newsletterForm.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showCustomAlert({
                    icon: '✉️',
                    title: 'Email Required',
                    subtitle: 'Newsletter Subscription',
                    message: 'Please enter your email address to subscribe to our exclusive updates.',
                    details: [
                        { label: 'Field', value: 'Email Address' },
                        { label: 'Status', value: 'Missing' }
                    ],
                    buttonText: 'Enter Email',
                    onClose: () => newsletterInput.focus()
                });
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showCustomAlert({
                    icon: '⚠️',
                    title: 'Invalid Email',
                    subtitle: 'Please check your input',
                    message: 'The email address you entered appears to be invalid. Please enter a valid email address in the format: name@example.com',
                    details: [
                        { label: 'Entered', value: email },
                        { label: 'Expected', value: 'name@example.com' }
                    ],
                    buttonText: 'Try Again',
                    onClose: () => {
                        newsletterInput.focus();
                        newsletterInput.select();
                    }
                });
                return;
            }
            
            // Show success message
            showCustomAlert({
                icon: '✨',
                title: 'Welcome to ZenTime!',
                subtitle: 'Newsletter Subscription Successful',
                message: `Thank you for joining our exclusive community! You'll now receive:`,
                details: [
                    { label: 'Subscribed Email', value: email },
                    { label: 'Confirmation Sent', value: '✓ Yes' },
                    { label: 'First Update', value: 'Within 24 hours' }
                ],
                messagePreview: 'Exclusive offers • New collections • Watch care tips • Member-only events',
                footer: 'Welcome to the ZenTime family! Check your inbox for a special welcome gift.',
                buttonText: 'Awesome!',
                onClose: () => {
                    newsletterInput.value = '';
                    // Optional: Add AJAX call here
                    // submitNewsletter(email);
                }
            });
        });
        
        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                newsletterForm.click();
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-section form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.querySelector('.contact-section input[type="text"]:nth-of-type(1)');
            const emailInput = document.querySelector('.contact-section input[type="text"]:nth-of-type(2)');
            const messageInput = document.querySelector('.contact-section textarea');
            
            if (!nameInput || !emailInput || !messageInput) {
                showCustomAlert({
                    icon: '🔄',
                    title: 'Form Error',
                    message: 'Please refresh the page and try again.',
                    buttonText: 'Refresh Page',
                    onClose: () => location.reload()
                });
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            // Validation
            if (!name) {
                showCustomAlert({
                    icon: '👤',
                    title: 'Name Required',
                    message: 'Please enter your name so we know how to address you.',
                    buttonText: 'Enter Name',
                    onClose: () => nameInput.focus()
                });
                return;
            }
            
            if (!email) {
                showCustomAlert({
                    icon: '📧',
                    title: 'Email Required',
                    message: 'Please enter your email address so we can respond to you.',
                    buttonText: 'Enter Email',
                    onClose: () => emailInput.focus()
                });
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showCustomAlert({
                    icon: '⚠️',
                    title: 'Invalid Email Format',
                    message: 'Please enter a valid email address (e.g., name@example.com)',
                    buttonText: 'Correct Email',
                    onClose: () => {
                        emailInput.focus();
                        emailInput.select();
                    }
                });
                return;
            }
            
            if (!message) {
                showCustomAlert({
                    icon: '💭',
                    title: 'Message Required',
                    message: 'Please tell us what you would like to discuss.',
                    buttonText: 'Write Message',
                    onClose: () => messageInput.focus()
                });
                return;
            }
            
            if (message.length < 10) {
                showCustomAlert({
                    icon: '📝',
                    title: 'More Details Needed',
                    message: 'Please provide a more detailed message (minimum 10 characters).',
                    buttonText: 'Add Details',
                    onClose: () => {
                        messageInput.focus();
                        messageInput.select();
                    }
                });
                return;
            }
            
            // Show success message
            showCustomAlert({
                icon: '🎉',
                title: 'Message Sent Successfully!',
                subtitle: `Thank you, ${name}!`,
                message: 'Your message has been received and will be reviewed by our team.',
                details: [
                    { label: 'From', value: name },
                    { label: 'Reply To', value: email },
                    { label: 'Response Time', value: '24-48 hours' },
                    { label: 'Case ID', value: 'ZT-' + Date.now().toString().slice(-6) }
                ],
                messagePreview: message.length > 100 ? message.substring(0, 100) + '...' : message,
                footer: 'A confirmation email has been sent to your inbox.',
                buttonText: 'Perfect!',
                secondaryButton: {
                    text: 'Send Another',
                    onClick: () => {
                        nameInput.focus();
                    }
                },
                onClose: () => {
                    contactForm.reset();
                    // Optional: Add AJAX call here
                    // submitContactForm({ name, email, message });
                }
            });
        });
        
        // Also handle the existing Send Now button click
        const sendButton = document.querySelector('.contact-section .button input[type="button"]');
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                contactForm.dispatchEvent(new Event('submit'));
            });
        }
    }
    
    // Add animation to product cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Info button toggle animation
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Add some interactive hover effects to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Optional: Function to submit newsletter to server (for future implementation)
/*
function submitNewsletter(email) {
    fetch('/api/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Newsletter subscription successful:', data);
    })
    .catch(error => {
        console.error('Error subscribing to newsletter:', error);
    });
}
*/

// Optional: Function to submit contact form to server (for future implementation)
/*
function submitContactForm(formData) {
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contact form submitted successfully:', data);
    })
    .catch(error => {
        console.error('Error submitting contact form:', error);
    });
}
*/
