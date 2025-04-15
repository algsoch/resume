// Resume Data
const resumeContext = {
    name: "Vicky Kumar",
    title: "AI Engineer / Full-Stack ML Engineer",
    education: "B.S. Data Science and Applications at IIT Madras (2024-2028)",
    skills: [
        "Python", "JavaScript", "FastAPI", "LangChain", "PyTorch", 
        "Docker", "GitHub Actions", "MongoDB", "REST APIs", "HTML/CSS",
        "Java", "SQL", "C", "Data Annotation", "Prompt Engineering"
    ],
    projects: [
        {
            name: "Vicky App",
            description: "Real-time AI Assistant system with dynamic backend execution"
        },
        {
            name: "Vicky Server",
            description: "FastAPI-powered logic engine that processes YouTube transcripts"
        }
    ],
    experiences: [
        {
            company: "Outlier Platform",
            role: "Prompt Engineer & AI Trainer",
            period: "Oct 2024 - Feb 2025",
            location: "Remote",
            responsibilities: [
                "Train AI systems in 10+2 level mathematics and advanced calculus",
                "Teach various programming languages including Python, Java, HTML, CSS",
                "Develop structured lessons to enhance AI's understanding of coding concepts",
                "Annotate and label text, images, and structured data"
            ]
        },
        {
            company: "Avid Surgico",
            role: "Web Developer & Data Entry Intern",
            period: "Feb 2024 - Jul 2024",
            location: "Remote",
            responsibilities: [
                "Developed a responsive website with user-friendly dashboard",
                "Integrated client feedback management system",
                "Used HTML, CSS, JavaScript, and MongoDB",
                "Created polished, image-rich catalogs"
            ]
        }
    ]
};

/**
 * Main initialization function - called when DOM is fully loaded
 */
function initializeResume() {
    console.log("Initializing resume application...");
    
    // First set up core visual features
    setupThemeToggle();
    setupScrollProgress();
    
    // Set up content features
    setupAboutMeTemplates();
    loadGitHubStats();
    
    // Set up animations
    setupScrollAnimations();
    setupTypewriter();
    
    // Set up interactive elements
    setupContactForm();
    setupFloatingElements();
    setupChatFunctionality();
    
    // Set up advanced features with delay to ensure external libraries are loaded
    setTimeout(() => {
        try {
            setupParticlesBackground();
            generateQRCode();
            setupSkillsRadarChart();
            setupPDFPreview();
        } catch (error) {
            console.error("Error setting up advanced features:", error);
        }
    }, 800);
}

/**
 * GitHub Stats - Display user profile and repositories
 */
async function loadGitHubStats() {
    const statsContainer = document.getElementById('github-stats');
    if (!statsContainer) return;
    
    try {
        const username = 'algsoch';
        const specificRepos = ['BodhAi', 'Yantra_progress', 'portfolio'];
        
        // Show loading state
        statsContainer.innerHTML = `
            <div class="flex justify-center p-8" id="github-loader">
                <div class="loader"></div>
            </div>
        `;
        
        // Fetch basic user data
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();
        
        if (!response.ok) {
            throw new Error("Failed to fetch GitHub user data");
        }
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const allRepos = await reposResponse.json();
        
        if (!reposResponse.ok) {
            throw new Error("Failed to fetch GitHub repositories");
        }
        
        // Filter to get specific repos
        const highlightedRepos = [];
        
        // First try to find the specific repos requested
        for (const repoName of specificRepos) {
            const repo = allRepos.find(r => r.name === repoName);
            if (repo) {
                highlightedRepos.push(repo);
            }
        }
        
        // If we couldn't find all requested repos, fill with other repos
        if (highlightedRepos.length < 3) {
            const otherRepos = allRepos
                .filter(repo => !specificRepos.includes(repo.name))
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 3 - highlightedRepos.length);
                
            highlightedRepos.push(...otherRepos);
        }
        
        // Calculate stats
        const totalStars = allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = allRepos.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        // Update the UI
        statsContainer.innerHTML = `
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6">
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="lg:w-1/4 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <img src="${userData.avatar_url}" alt="GitHub Avatar" class="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-500 shadow-sm">
                        <p class="font-bold mt-3 text-lg dark:text-white">${userData.name || username}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-300">@${username}</p>
                        <div class="grid grid-cols-2 gap-4 mt-4 w-full">
                            <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p class="font-bold text-xl dark:text-white">${userData.public_repos}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Repositories</p>
                            </div>
                            <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p class="font-bold text-xl dark:text-white">${userData.followers}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Followers</p>
                            </div>
                            <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p class="font-bold text-xl dark:text-white">${totalStars}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Stars</p>
                            </div>
                            <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p class="font-bold text-xl dark:text-white">${totalForks}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Forks</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lg:w-3/4">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Featured Projects</h3>
                        <div class="grid md:grid-cols-3 gap-4">
                            ${highlightedRepos.map(repo => `
                                <a href="${repo.html_url}" target="_blank" class="block">
                                    <div class="h-full p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                                        <div class="flex justify-between items-start">
                                            <h4 class="font-medium text-blue-600 dark:text-blue-400 hover:underline">${repo.name}</h4>
                                            <div class="flex items-center">
                                                <span class="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full flex items-center">
                                                    <i class="fas fa-star mr-1 text-yellow-500"></i> ${repo.stargazers_count}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">${repo.description || 'No description available'}</p>
                                        <div class="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span>${repo.language || 'N/A'}</span>
                                            <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("GitHub API Error:", error);
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <div class="text-center">
                        <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                        <p class="text-red-500">Failed to load GitHub stats. Please try again later.</p>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a href="https://github.com/algsoch/BodhAi" target="_blank" class="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                                <h4 class="font-medium text-blue-600 dark:text-blue-400">BodhAi</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">AI assistant project for education</p>
                            </a>
                            <a href="https://github.com/algsoch/Yantra_progress" target="_blank" class="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                                <h4 class="font-medium text-blue-600 dark:text-blue-400">Yantra_progress</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Progress tracking for Yantra project</p>
                            </a>
                            <a href="https://github.com/algsoch/portfolio" target="_blank" class="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition">
                                <h4 class="font-medium text-blue-600 dark:text-blue-400">portfolio</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Personal portfolio website</p>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

/**
 * About Me Templates - Switch between different bio versions
 */
function setupAboutMeTemplates() {
    const defaultBtn = document.getElementById('template-default');
    const researchBtn = document.getElementById('template-research');
    const engineerBtn = document.getElementById('template-engineer');
    
    const template1 = document.getElementById('template-1');
    const template2 = document.getElementById('template-2');
    const template3 = document.getElementById('template-3');
    const roleTitle = document.getElementById('role-title');
    
    if (!template1 || !template2 || !template3) {
        console.warn("About Me template elements not found");
        return;
    }
    
    // Function to show a template and hide others
    function showTemplate(templateNumber) {
        [template1, template2, template3].forEach((template, index) => {
            if (index + 1 === templateNumber) {
                template.classList.remove('hidden');
            } else {
                template.classList.add('hidden');
            }
        });
        
        // Reset all buttons to inactive style
        if (defaultBtn && researchBtn && engineerBtn) {
            [defaultBtn, researchBtn, engineerBtn].forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            // Set active button style
            if (templateNumber === 1 && defaultBtn) {
                defaultBtn.classList.remove('bg-gray-200', 'text-gray-700');
                defaultBtn.classList.add('bg-indigo-600', 'text-white');
                if (roleTitle) roleTitle.textContent = 'AI Engineer';
            } else if (templateNumber === 2 && researchBtn) {
                researchBtn.classList.remove('bg-gray-200', 'text-gray-700');
                researchBtn.classList.add('bg-indigo-600', 'text-white');
                if (roleTitle) roleTitle.textContent = 'AI Researcher-in-Training';
            } else if (templateNumber === 3 && engineerBtn) {
                engineerBtn.classList.remove('bg-gray-200', 'text-gray-700');
                engineerBtn.classList.add('bg-indigo-600', 'text-white');
                if (roleTitle) roleTitle.textContent = 'Software Engineer';
            }
        }
    }
    
    // Event listeners for template buttons
    if (defaultBtn) defaultBtn.addEventListener('click', () => showTemplate(1));
    if (researchBtn) researchBtn.addEventListener('click', () => showTemplate(2));
    if (engineerBtn) engineerBtn.addEventListener('click', () => showTemplate(3));
    
    // Also listen for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('role')) {
        const role = urlParams.get('role').toLowerCase();
        if (role === 'research') {
            showTemplate(2);
        } else if (role === 'engineer') {
            showTemplate(3);
        } else {
            showTemplate(1);
        }
    }
    
    // Add keyword detection for input fields
    document.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            const textInput = event.target.value.toLowerCase();
            if (textInput.includes('research')) {
                showTemplate(2);
            } else if (textInput.includes('engineer')) {
                showTemplate(3);
            }
        }
    });
}

/**
 * Chat Functionality - Interactive chat assistant
 */
function setupChatFunctionality() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const typingIndicator = document.getElementById('typing-indicator');
    const floatingChatInput = document.getElementById('floating-chat-input');
    const floatingChatMessages = document.getElementById('floating-chat-messages');
    const floatingSendButton = document.getElementById('floating-send-message');
    const floatingTypingIndicator = document.getElementById('floating-typing-indicator');

    if (!chatMessages && !floatingChatMessages) return;

    // Function to add a message to the chat
    function addMessage(message, isUser = false, isFloating = false) {
        const targetMessages = isFloating ? floatingChatMessages : chatMessages;
        if (!targetMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser 
            ? 'user-message mb-2 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg self-end max-w-3/4 text-right' 
            : 'ai-message mb-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg self-start max-w-3/4';
        messageDiv.textContent = message;
        targetMessages.appendChild(messageDiv);
        targetMessages.scrollTop = targetMessages.scrollHeight;
    }

    // Handle sending a message
    async function sendMessage(input, isFloating = false) {
        const message = input.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, true, isFloating);
        input.value = '';
        
        // Show typing indicator
        if (typingIndicator && !isFloating) typingIndicator.classList.remove('hidden');
        if (floatingTypingIndicator && isFloating) floatingTypingIndicator.classList.remove('hidden');
        
        try {
            // Using a simpler approach for reliability
            const fallbackResponses = [
                "I'm a resume assistant for Vicky Kumar. He's an AI Engineer with experience in FastAPI, LangChain, and machine learning.",
                "Vicky has built several production-ready AI applications using Python and JavaScript.",
                "Vicky's technical stack includes Python, JavaScript, Docker, and various ML frameworks.",
                "Vicky is a Data Science student at IIT Madras with a strong focus on practical AI engineering.",
                "Vicky has experience with AI systems development and backend engineering.",
                "Vicky built the 'Vicky Data Science Assistant' as a robust platform integrating FastAPI and webhook automations."
            ];
            
            // Simulate AI thinking time
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Choose response based on keywords in message
            let aiResponse;
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
                aiResponse = "Vicky has worked as a Prompt Engineer & AI Trainer at Outlier Platform and as a Web Developer & Data Entry Intern at Avid Surgico.";
            } else if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
                aiResponse = "Vicky is pursuing a B.S. in Data Science and Applications at IIT Madras (2024-2028).";
            } else if (lowerMessage.includes('skill') || lowerMessage.includes('know')) {
                aiResponse = "Vicky's key skills include Python, JavaScript, FastAPI, LangChain, PyTorch, Docker, GitHub Actions, MongoDB, REST APIs, and more.";
            } else if (lowerMessage.includes('project')) {
                aiResponse = "Vicky's notable projects include the Vicky App (a real-time AI Assistant system) and Vicky Server (a FastAPI-powered logic engine that processes YouTube transcripts).";
            } else {
                // Choose a random fallback response
                aiResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            }
            
            // Hide typing indicator and add AI response
            if (typingIndicator && !isFloating) typingIndicator.classList.add('hidden');
            if (floatingTypingIndicator && isFloating) floatingTypingIndicator.classList.add('hidden');
            
            addMessage(aiResponse, false, isFloating);
            
        } catch (error) {
            console.error('Chat error:', error);
            
            // Hide typing indicator
            if (typingIndicator && !isFloating) typingIndicator.classList.add('hidden');
            if (floatingTypingIndicator && isFloating) floatingTypingIndicator.classList.add('hidden');
            
            addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", false, isFloating);
        }
    }

    // Add event listeners
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', () => sendMessage(chatInput, false));
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(chatInput, false);
            }
        });
    }
    
    if (floatingSendButton && floatingChatInput) {
        floatingSendButton.addEventListener('click', () => sendMessage(floatingChatInput, true));
        floatingChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(floatingChatInput, true);
            }
        });
    }
}

/**
 * Contact Form - Handle form submissions
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const floatingFeedbackForm = document.getElementById('floating-feedback-form');
    const floatingFormStatus = document.getElementById('floating-form-status');

    // Setup main contact form
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            if (!name || !email || !message) {
                formStatus.classList.remove('hidden');
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'mt-2 text-red-500';
                return;
            }
            
            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'mt-2 text-blue-500';
            
            try {
                // Simulating successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'mt-2 text-green-500';
                contactForm.reset();
            } catch (error) {
                console.error('Error sending notification:', error);
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.className = 'mt-2 text-red-500';
            }
        });
    }
    
    // Setup floating feedback form
    if (floatingFeedbackForm && floatingFormStatus) {
        floatingFeedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('feedback-name')?.value.trim();
            const email = document.getElementById('feedback-email')?.value.trim();
            const message = document.getElementById('feedback-message')?.value.trim();
            
            if (!name || !email || !message) {
                floatingFormStatus.classList.remove('hidden');
                floatingFormStatus.textContent = 'Please fill out all fields.';
                floatingFormStatus.className = 'mt-2 text-red-500 text-sm';
                return;
            }
            
            floatingFormStatus.classList.remove('hidden');
            floatingFormStatus.textContent = 'Sending feedback...';
            floatingFormStatus.className = 'mt-2 text-blue-500 text-sm';
            
            try {
                // Simulating successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                floatingFormStatus.textContent = 'Feedback sent successfully! Thank you.';
                floatingFormStatus.className = 'mt-2 text-green-500 text-sm';
                floatingFeedbackForm.reset();
            } catch (error) {
                console.error('Error sending feedback:', error);
                floatingFormStatus.textContent = 'Failed to send feedback. Please try again later.';
                floatingFormStatus.className = 'mt-2 text-red-500 text-sm';
            }
        });
    }
}

/**
 * Floating Elements - Chat and feedback buttons
 */
function setupFloatingElements() {
    const chatIcon = document.getElementById('chat-icon');
    const feedbackIcon = document.getElementById('feedback-icon');
    const floatingChat = document.getElementById('floating-chat');
    const floatingFeedback = document.getElementById('floating-feedback');
    const closeChat = document.getElementById('close-chat');
    const closeFeedback = document.getElementById('close-feedback');
    
    if (chatIcon && floatingChat) {
        chatIcon.addEventListener('click', () => {
            floatingChat.classList.remove('scale-0');
            floatingChat.classList.add('scale-100');
            if (floatingFeedback) {
                floatingFeedback.classList.remove('scale-100');
                floatingFeedback.classList.add('scale-0');
            }
        });
    }
    
    if (closeChat && floatingChat) {
        closeChat.addEventListener('click', () => {
            floatingChat.classList.remove('scale-100');
            floatingChat.classList.add('scale-0');
        });
    }
    
    if (feedbackIcon && floatingFeedback) {
        feedbackIcon.addEventListener('click', () => {
            floatingFeedback.classList.remove('scale-0');
            floatingFeedback.classList.add('scale-100');
            if (floatingChat) {
                floatingChat.classList.remove('scale-100');
                floatingChat.classList.add('scale-0');
            }
        });
    }
    
    if (closeFeedback && floatingFeedback) {
        closeFeedback.addEventListener('click', () => {
            floatingFeedback.classList.remove('scale-100');
            floatingFeedback.classList.add('scale-0');
        });
    }
}

/**
 * Scroll Animations - Fade in elements as they scroll into view
 */
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    if (sections.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Once visible, no need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.1});
        
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        sections.forEach(section => {
            section.classList.add('is-visible');
        });
    }
}

/**
 * Scroll Progress - Show a progress bar as user scrolls
 */
function setupScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

/**
 * Skills Radar Chart - Visualize skills
 */
function setupSkillsRadarChart() {
    const ctx = document.getElementById('skills-radar');
    if (!ctx) return;
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error("Chart.js library not loaded");
        ctx.innerHTML = '<div class="text-center text-red-500 p-4">Chart library failed to load</div>';
        return;
    }
    
    const darkMode = document.documentElement.classList.contains('dark');
    
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Machine Learning',
                'Backend Development',
                'Frontend Development',
                'DevOps & Cloud',
                'Research',
                'Python Ecosystem',
                'Data Processing',
                'System Design'
            ],
            datasets: [{
                label: 'Skill Level',
                data: [85, 90, 75, 80, 78, 92, 88, 83],
                fill: true,
                backgroundColor: darkMode ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.2)',
                borderColor: darkMode ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)',
                pointBackgroundColor: darkMode ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)',
                pointBorderColor: darkMode ? '#374151' : '#fff',
                pointHoverBackgroundColor: darkMode ? '#374151' : '#fff',
                pointHoverBorderColor: darkMode ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 50,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 10,
                        backdropColor: 'transparent',
                        color: darkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)'
                    },
                    pointLabels: {
                        color: darkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Update chart when theme toggles
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Update colors based on theme
        chart.data.datasets[0].backgroundColor = isDark ? 'rgba(79, 70, 229, 0.3)' : 'rgba(79, 70, 229, 0.2)';
        chart.data.datasets[0].borderColor = isDark ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)';
        chart.data.datasets[0].pointBackgroundColor = isDark ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)';
        chart.data.datasets[0].pointBorderColor = isDark ? '#374151' : '#fff';
        chart.data.datasets[0].pointHoverBackgroundColor = isDark ? '#374151' : '#fff';
        
        // Update scale colors
        chart.options.scales.r.angleLines.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        chart.options.scales.r.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        chart.options.scales.r.ticks.color = isDark ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)';
        chart.options.scales.r.pointLabels.color = isDark ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)';
        
        chart.update();
    });
}

/**
 * QR Code Generation for sharing the resume
 */
function generateQRCode() {
    console.log("Attempting to generate QR code...");
    const qrContainer = document.getElementById('qrcode-container');
    
    if (!qrContainer) {
        console.warn("QR code container not found");
        return;
    }

    // Clear any existing content
    qrContainer.innerHTML = '';
    
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.error("QRCode library not loaded");
        qrContainer.innerHTML = '<div class="text-red-500 text-center p-4">QR Code library not loaded. Please refresh the page.</div>';
        return;
    }
    
    try {
        // Get the current URL of the resume
        const url = window.location.href.split('?')[0]; // Remove any query params
        
        console.log("Generating QR code for URL:", url);
        
        // Create a canvas element first
        const canvas = document.createElement('canvas');
        qrContainer.appendChild(canvas);
        
        // Create QR code
        QRCode.toCanvas(canvas, url, {
            width: 200,
            margin: 4,
            color: {
                dark: '#10b981',  // Emerald color to match section theme
                light: '#ffffff'  // White background
            }
        }, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                qrContainer.innerHTML = '<div class="text-red-500 text-center p-4">Failed to generate QR code</div>';
            } else {
                console.log("QR code successfully generated");
            }
        });
        
        // Set up the download QR code button
        const downloadButton = document.getElementById('download-qr');
        if (downloadButton) {
            downloadButton.addEventListener('click', function() {
                const canvas = qrContainer.querySelector('canvas');
                if (canvas) {
                    try {
                        // Create download link for the QR code
                        const link = document.createElement('a');
                        link.download = 'vicky-kumar-resume-qr.png';
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    } catch (e) {
                        console.error("Error downloading QR code:", e);
                        alert("Could not download QR code. This might be due to browser security restrictions.");
                    }
                }
            });
        }
    } catch (e) {
        console.error("Error in QR code generation:", e);
        qrContainer.innerHTML = '<div class="text-red-500 text-center p-4">Error generating QR code</div>';
    }
}

/**
 * Theme Toggle - Switch between light and dark mode
 */
function setupThemeToggle() {
    console.log("Setting up theme toggle...");
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.warn("Theme toggle button not found");
        return;
    }
    
    // Ensure we have dark mode styles in a <style> tag if not defined in CSS
    const darkModeStyles = document.getElementById('dark-mode-styles');
    if (!darkModeStyles) {
        const styleEl = document.createElement('style');
        styleEl.id = 'dark-mode-styles';
        styleEl.textContent = `
            .dark { color-scheme: dark; }
            .dark body { background-color: #111827; color: #f3f4f6; }
            .dark .bg-white { background-color: #1f2937 !important; }
            .dark .bg-gray-50 { background-color: #111827 !important; }
            .dark .text-gray-700 { color: #e5e7eb !important; }
            .dark .text-gray-600 { color: #d1d5db !important; }
            .dark .border-gray-200 { border-color: #374151 !important; }
            .dark .from-indigo-50 { --tw-gradient-from: rgba(67, 56, 202, 0.1) !important; }
            .dark .to-blue-50 { --tw-gradient-to: rgba(37, 99, 235, 0.1) !important; }
            .dark input, .dark textarea { background-color: #374151 !important; color: #f3f4f6 !important; border-color: #4b5563 !important; }
            .dark .dark\\:hidden { display: none !important; }
            .dark .dark\\:block { display: block !important; }
            .dark .dark\\:bg-gray-700 { background-color: #374151 !important; }
            .dark .dark\\:bg-gray-800 { background-color: #1f2937 !important; }
            .dark .dark\\:bg-gray-900 { background-color: #111827 !important; }
            .dark .dark\\:text-white { color: #ffffff !important; }
            .dark .dark\\:text-gray-300 { color: #d1d5db !important; }
            .dark .dark\\:text-gray-400 { color: #9ca3af !important; }
            .dark .dark\\:border-gray-700 { border-color: #374151 !important; }
            .dark .dark\\:from-gray-800 { --tw-gradient-from: #1f2937 !important; }
            .dark .dark\\:to-gray-900 { --tw-gradient-to: #111827 !important; }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Apply the correct theme on page load
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        console.log("Dark mode applied on page load");
    } else {
        document.documentElement.classList.remove('dark');
        console.log("Light mode applied on page load");
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        console.log("Theme toggle clicked");
        
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            console.log("Switched to light mode");
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log("Switched to dark mode");
        }
    });
}

/**
 * PDF Preview functionality
 */
function setupPDFPreview() {
    // Check if PDF modal exists
    const pdfModal = document.getElementById('pdf-modal');
    if (!pdfModal) {
        console.warn("PDF modal not found, creating one");
        
        // Create the modal if it doesn't exist
        const modalDiv = document.createElement('div');
        modalDiv.id = 'pdf-modal';
        modalDiv.className = 'fixed inset-0 bg-black bg-opacity-50 z-[100] hidden flex items-center justify-center';
        modalDiv.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg w-11/12 max-w-4xl h-5/6 p-1 flex flex-col">
                <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 class="text-xl font-bold dark:text-white">Resume Preview</h2>
                    <button id="close-pdf-modal" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="flex-1 overflow-hidden">
                    <iframe id="pdf-iframe" class="w-full h-full"></iframe>
                </div>
                <div class="p-4 border-t dark:border-gray-700 flex justify-between items-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Viewing PDF resume preview
                    </p>
                    <a href="vickyresume.pdf" download class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <i class="fas fa-download"></i>
                        Download PDF
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }
    
    // Add a preview button next to the floating download button
    const downloadButtonContainer = document.querySelector('.fixed.bottom-5.left-5');
    if (!downloadButtonContainer) {
        // Create the floating download button container if it doesn't exist
        const downloadContainer = document.createElement('div');
        downloadContainer.className = 'fixed bottom-5 left-5 z-40 animate-bounce-slow';
        downloadContainer.innerHTML = `
            <a href="vickyresume.pdf" download class="group flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div class="p-2 bg-white bg-opacity-20 rounded-full mr-2">
                    <i class="fas fa-file-download text-white"></i>
                </div>
                <span>Download CV</span>
                <i class="fas fa-arrow-down ml-2 group-hover:animate-bounce"></i>
            </a>
        `;
        document.body.appendChild(downloadContainer);
    }
    
    // Now proceed with setting up the preview button
    const downloadButton = document.querySelector('.fixed.bottom-5.left-5');
    if (downloadButton) {
        // Check if preview button already exists
        if (!downloadButton.querySelector('.preview-button')) {
            const previewButton = document.createElement('button');
            previewButton.className = 'preview-button flex items-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mt-3';
            previewButton.innerHTML = `
                <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-2">
                    <i class="fas fa-eye text-blue-600 dark:text-blue-400"></i>
                </div>
                <span>Preview CV</span>
            `;
            downloadButton.appendChild(previewButton);
            
            const modal = document.getElementById('pdf-modal');
            const closeModal = document.getElementById('close-pdf-modal');
            const pdfIframe = document.getElementById('pdf-iframe');
            
            previewButton.addEventListener('click', () => {
                modal.classList.remove('hidden');
                pdfIframe.src = 'vickyresume.pdf';
                document.body.classList.add('overflow-hidden');
            });
            
            closeModal.addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }
            });
        }
    }
}

/**
 * Typewriter Effect for title text
 */
function setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const phrases = [
        'AI Engineer',
        'Full-Stack ML Engineer',
        'Data Scientist',
        'AI Researcher',
        'Software Developer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If finished typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        }
        
        // If finished deleting the phrase
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(type, 1000);
}

/**
 * Particles Background
 */
function setupParticlesBackground() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) {
        console.warn("Particles container not found");
        return;
    }
    
    if (typeof particlesJS === 'undefined') {
        console.error("particlesJS library not loaded");
        return;
    }
    
    particlesJS("particles-js", {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#4f46e5" },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" }
            },
            opacity: {
                value: 0.3,
                random: true,
                animation: { enable: true, speed: 0.5, minimumValue: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4f46e5",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: false, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } }
            }
        },
        retina_detect: true
    });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeResume);