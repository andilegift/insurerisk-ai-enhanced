// DOM elements
const calculateBtn = document.getElementById('calculate-btn');
const riskScoreElement = document.getElementById('risk-score');
const riskLabelElement = document.getElementById('risk-label');
const premiumElement = document.getElementById('premium');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const authModalOverlay = document.getElementById('auth-modal-overlay');
const closeModal = document.getElementById('close-modal');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginSubmit = document.getElementById('login-submit');
const registerSubmit = document.getElementById('register-submit');
const userWelcome = document.getElementById('user-welcome');
const usernameDisplay = document.getElementById('username-display');
const userAvatar = document.getElementById('user-avatar');
const landingContent = document.getElementById('landing-content');
const appContent = document.getElementById('app-content');
const tryDemoBtn = document.getElementById('try-demo-btn');

// Form input elements
const ageInput = document.getElementById('age');
const drivingExperienceInput = document.getElementById('drivingExperience');
const vehicleTypeSelect = document.getElementById('vehicleType');
const vehicleValueInput = document.getElementById('vehicleValue');
const locationSelect = document.getElementById('location');
const claimsHistorySelect = document.getElementById('claimsHistory');
const creditScoreInput = document.getElementById('creditScore');

// New feature elements
const predictTimelineBtn = document.getElementById('predict-timeline-btn');
const riskTrendElement = document.getElementById('risk-trend');
const premiumTrendElement = document.getElementById('premium-trend');
const predictedSavingsElement = document.getElementById('predicted-savings');
const comparisonToggle = document.getElementById('comparison-toggle');
const comparisonMetricSelect = document.getElementById('comparison-metric');
const comparisonTableBody = document.getElementById('comparison-table-body');
const comparisonInsights = document.getElementById('comparison-insights');
const licenseUpload = document.getElementById('license-upload');
const registrationUpload = document.getElementById('registration-upload');
const scannerPreview = document.getElementById('scanner-preview');
const scannerStatus = document.getElementById('scanner-status');

// Charts
let riskChart, timelineChart, comparisonChart;

// Initialize all charts
function initializeCharts() {
    // Risk Distribution Chart
    const riskCtx = document.getElementById('risk-chart').getContext('2d');
    riskChart = new Chart(riskCtx, {
        type: 'doughnut',
        data: {
            labels: ['No Data'],
            datasets: [{
                data: [100],
                backgroundColor: ['#95a5a6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { enabled: false }
            }
        }
    });

    // Timeline Chart
    const timelineCtx = document.getElementById('timeline-chart').getContext('2d');
    timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: {
            labels: ['Current', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                {
                    label: 'Risk Score',
                    data: [],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Premium (R)',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Risk Score (0-100)'
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Premium (R)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    // Comparison Chart
    const comparisonCtx = document.getElementById('comparison-chart').getContext('2d');
    comparisonChart = new Chart(comparisonCtx, {
        type: 'bar',
        data: {
            labels: ['Risk Score', 'Premium', 'Age Impact', 'Vehicle Risk', 'Location', 'Credit'],
            datasets: [
                {
                    label: 'Your Profile',
                    data: [],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Market Average',
                    data: [],
                    backgroundColor: 'rgba(149, 165, 166, 0.8)',
                    borderColor: 'rgba(149, 165, 166, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Market averages data
const marketAverages = {
    riskScore: 55,
    premium: 12500,
    ageFactor: 2,
    drivingExperience: -8,
    vehicleRisk: 5,
    locationRisk: 3,
    claimsFactor: 2,
    creditImpact: -2
};

// Check if user is logged in
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        userWelcome.style.display = 'flex';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        usernameDisplay.textContent = user.name;
        userAvatar.textContent = user.name.charAt(0).toUpperCase();
        landingContent.style.display = 'none';
        appContent.style.display = 'block';
    } else {
        userWelcome.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        landingContent.style.display = 'block';
        appContent.style.display = 'none';
    }
}

// Validate form inputs
function validateForm() {
    const inputs = [
        ageInput, 
        drivingExperienceInput, 
        vehicleTypeSelect, 
        vehicleValueInput, 
        locationSelect, 
        claimsHistorySelect, 
        creditScoreInput
    ];
    
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.value === '' || input.value === null) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Calculate risk and premium
calculateBtn.addEventListener('click', function() {
    if (!validateForm()) {
        alert('Please fill in all required fields before calculating.');
        return;
    }
    
    const age = parseInt(ageInput.value);
    const drivingExperience = parseInt(drivingExperienceInput.value);
    const vehicleType = vehicleTypeSelect.value;
    const vehicleValue = parseInt(vehicleValueInput.value);
    const location = locationSelect.value;
    const claimsHistory = parseInt(claimsHistorySelect.value);
    const creditScore = parseInt(creditScoreInput.value);
    
    // Validate ranges
    if (age < 18 || age > 100) {
        alert('Age must be between 18 and 100');
        ageInput.focus();
        return;
    }
    
    if (drivingExperience < 0 || drivingExperience > 82) {
        alert('Driving experience must be between 0 and 82 years');
        drivingExperienceInput.focus();
        return;
    }
    
    if (vehicleValue < 5000 || vehicleValue > 150000) {
        alert('Vehicle value must be between R5,000 and R150,000');
        vehicleValueInput.focus();
        return;
    }
    
    if (creditScore < 300 || creditScore > 850) {
        alert('Credit score must be between 300 and 850');
        creditScoreInput.focus();
        return;
    }
    
    // Calculate risk factors
    let riskScore = 50;
    let ageFactor = 0;
    let experienceFactor = Math.max(-20, -drivingExperience);
    let vehicleFactor = 0;
    let locationFactor = 0;
    const claimsFactor = claimsHistory * 10;
    let creditFactor = 0;
    
    // Age factor
    if (age < 25) {
        ageFactor = 15;
    } else if (age < 40) {
        ageFactor = -5;
    } else if (age < 60) {
        ageFactor = -10;
    } else {
        ageFactor = 5;
    }
    
    // Vehicle type factor
    switch(vehicleType) {
        case 'economy': vehicleFactor = -5; break;
        case 'sedan': vehicleFactor = 0; break;
        case 'suv': vehicleFactor = 5; break;
        case 'sports': vehicleFactor = 15; break;
        case 'luxury': vehicleFactor = 10; break;
        case 'truck': vehicleFactor = 8; break;
    }
    
    // Location factor
    switch(location) {
        case 'rural': locationFactor = -10; break;
        case 'suburban': locationFactor = 0; break;
        case 'urban': locationFactor = 15; break;
    }
    
    // Credit score factor
    if (creditScore > 800) {
        creditFactor = -15;
    } else if (creditScore > 700) {
        creditFactor = -10;
    } else if (creditScore > 600) {
        creditFactor = 0;
    } else {
        creditFactor = 10;
    }
    
    // Calculate total risk score
    riskScore = riskScore + ageFactor + experienceFactor + vehicleFactor + locationFactor + claimsFactor + creditFactor;
    riskScore = Math.max(0, Math.min(100, riskScore));
    
    // Calculate premium
    let premium = 500 + (vehicleValue * 0.03) + (riskScore * 10);
    
    // Update UI with results
    riskScoreElement.textContent = Math.round(riskScore) + '/100';
    premiumElement.textContent = 'R' + Math.round(premium).toLocaleString();
    
    // Update risk label
    riskLabelElement.className = 'risk-label';
    if (riskScore < 30) {
        riskLabelElement.classList.add('low-risk');
        riskLabelElement.textContent = 'Low Risk';
    } else if (riskScore < 70) {
        riskLabelElement.classList.add('medium-risk');
        riskLabelElement.textContent = 'Medium Risk';
    } else {
        riskLabelElement.classList.add('high-risk');
        riskLabelElement.textContent = 'High Risk';
    }
    
    // Update factors list
    updateFactorElement('age-factor', getFactorRating(ageFactor), ageFactor);
    updateFactorElement('experience-factor', getFactorRating(experienceFactor), experienceFactor);
    updateFactorElement('vehicle-factor', getFactorRating(vehicleFactor), vehicleFactor);
    updateFactorElement('location-factor', getFactorRating(locationFactor), locationFactor);
    updateFactorElement('claims-factor', claimsHistory === 0 ? 'Clean' : `${claimsHistory} Claim(s)`, claimsFactor);
    updateFactorElement('credit-factor', getFactorRating(creditFactor), creditFactor);
    
    // Update risk chart
    updateRiskChart(riskScore);
    
    // Update comparisons if enabled
    if (comparisonToggle.checked) {
        updateComparison();
    }
});

function getFactorRating(value) {
    if (value < -5) return 'Excellent';
    if (value < 0) return 'Good';
    if (value === 0) return 'Neutral';
    if (value < 5) return 'Fair';
    return 'Poor';
}

function updateFactorElement(elementId, text, value) {
    const element = document.getElementById(elementId);
    element.textContent = text;
    
    element.className = 'factor-value';
    if (value < 0) {
        element.classList.add('positive');
    } else if (value > 0) {
        element.classList.add('negative');
    } else {
        element.classList.add('neutral');
    }
}

function updateRiskChart(riskScore) {
    let lowRisk, mediumRisk, highRisk;
    
    if (riskScore < 30) {
        lowRisk = 70;
        mediumRisk = 25;
        highRisk = 5;
    } else if (riskScore < 70) {
        lowRisk = 30;
        mediumRisk = 50;
        highRisk = 20;
    } else {
        lowRisk = 10;
        mediumRisk = 30;
        highRisk = 60;
    }
    
    riskChart.data.labels = ['Low Risk', 'Medium Risk', 'High Risk'];
    riskChart.data.datasets[0].data = [lowRisk, mediumRisk, highRisk];
    riskChart.data.datasets[0].backgroundColor = ['#2ecc71', '#f39c12', '#e74c3c'];
    riskChart.options.plugins.tooltip.enabled = true;
    riskChart.update();
}

// Document Scanner Functionality
licenseUpload.addEventListener('change', function(e) {
    handleDocumentUpload(e, 'license');
});

registrationUpload.addEventListener('change', function(e) {
    handleDocumentUpload(e, 'registration');
});

function handleDocumentUpload(event, documentType) {
    const file = event.target.files[0];
    if (!file) return;
    
    scannerStatus.textContent = 'Processing document...';
    scannerStatus.className = 'scanner-status scanner-processing';
    
    const reader = new FileReader();
    reader.onload = function(e) {
        scannerPreview.innerHTML = `
            <img src="${e.target.result}" alt="Document Preview" class="preview-image">
        `;
        
        // Simulate OCR processing
        setTimeout(() => {
            autoFillFromDocument(documentType);
            scannerStatus.textContent = 'Document processed successfully!';
            scannerStatus.className = 'scanner-status scanner-success';
            showToast(`${documentType === 'license' ? 'Driver\'s License' : 'Vehicle Registration'} scanned successfully!`);
        }, 1500);
    };
    
    reader.onerror = function() {
        scannerStatus.textContent = 'Error reading file. Please try again.';
        scannerStatus.className = 'scanner-status scanner-error';
    };
    
    reader.readAsDataURL(file);
}

function autoFillFromDocument(documentType) {
    if (documentType === 'license') {
        // Simulate data extraction from driver's license
        const simulatedAge = Math.floor(Math.random() * (65 - 25 + 1)) + 25;
        const simulatedExperience = Math.max(0, simulatedAge - 18);
        
        ageInput.value = simulatedAge;
        drivingExperienceInput.value = simulatedExperience;
        
        // Highlight fields
        ageInput.style.borderColor = '#2ecc71';
        ageInput.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.2)';
        drivingExperienceInput.style.borderColor = '#2ecc71';
        drivingExperienceInput.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.2)';
        
        setTimeout(() => {
            ageInput.style.boxShadow = '';
            drivingExperienceInput.style.boxShadow = '';
        }, 3000);
        
    } else if (documentType === 'registration') {
        // Simulate data extraction from vehicle registration
        const vehicleTypes = ['economy', 'sedan', 'suv', 'sports', 'luxury', 'truck'];
        const simulatedType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const simulatedValue = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;
        
        vehicleTypeSelect.value = simulatedType;
        vehicleValueInput.value = simulatedValue;
        
        // Highlight fields
        vehicleTypeSelect.style.borderColor = '#2ecc71';
        vehicleTypeSelect.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.2)';
        vehicleValueInput.style.borderColor = '#2ecc71';
        vehicleValueInput.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.2)';
        
        setTimeout(() => {
            vehicleTypeSelect.style.boxShadow = '';
            vehicleValueInput.style.boxShadow = '';
        }, 3000);
    }
}

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// AI-Powered Risk Prediction Timeline
predictTimelineBtn.addEventListener('click', function() {
    if (riskScoreElement.textContent === '--/100') {
        alert('Please calculate your current risk score first');
        return;
    }
    
    const currentRisk = parseInt(riskScoreElement.textContent);
    const currentPremium = parseInt(premiumElement.textContent.replace(/[^0-9]/g, ''));
    
    // Generate 5-year predictions
    const predictions = generate5YearPredictions(currentRisk, currentPremium);
    
    // Update timeline chart
    timelineChart.data.datasets[0].data = predictions.riskScores;
    timelineChart.data.datasets[1].data = predictions.premiums;
    timelineChart.update();
    
    // Update summary
    updateTimelineSummary(predictions);
});

function generate5YearPredictions(currentRisk, currentPremium) {
    const riskScores = [currentRisk];
    const premiums = [currentPremium];
    
    const age = parseInt(ageInput.value);
    const drivingExp = parseInt(drivingExperienceInput.value);
    const claims = parseInt(claimsHistorySelect.value);
    const credit = parseInt(creditScoreInput.value);
    
    for (let year = 1; year <= 5; year++) {
        let riskChange = 0;
        let premiumChange = 0;
        
        // Age improvement (up to age 60)
        if (age + year <= 60) {
            riskChange -= 0.5;
        }
        
        // Experience improvement
        if (drivingExp + year > 5) {
            riskChange -= 1;
        }
        
        // Claims history impact
        if (claims > 0) {
            riskChange += 0.3;
        }
        
        // Credit improvement
        if (credit < 700) {
            riskChange -= 0.2;
            premiumChange -= 100;
        }
        
        // Add some randomness
        riskChange += (Math.random() * 2 - 1);
        premiumChange += (Math.random() * 300 - 150);
        
        const newRisk = Math.max(0, Math.min(100, 
            riskScores[riskScores.length - 1] + riskChange
        ));
        
        const newPremium = Math.max(500,
            premiums[premiums.length - 1] + premiumChange
        );
        
        riskScores.push(Math.round(newRisk));
        premiums.push(Math.round(newPremium));
    }
    
    return { riskScores, premiums };
}

function updateTimelineSummary(predictions) {
    const riskChange = predictions.riskScores[5] - predictions.riskScores[0];
    const premiumChange = predictions.premiums[5] - predictions.premiums[0];
    const savingsVsMarket = marketAverages.premium - predictions.premiums[5];
    
    riskTrendElement.textContent = riskChange >= 0 ? `+${riskChange}` : riskChange;
    premiumTrendElement.textContent = premiumChange >= 0 ? `+R${premiumChange}` : `-R${Math.abs(premiumChange)}`;
    predictedSavingsElement.textContent = `R${Math.abs(savingsVsMarket).toFixed(0)}`;
    
    // Set colors
    riskTrendElement.className = 'trend-value ' + (riskChange > 0 ? 'negative' : 'positive');
    premiumTrendElement.className = 'trend-value ' + (premiumChange > 0 ? 'negative' : 'positive');
    predictedSavingsElement.className = 'trend-value ' + (savingsVsMarket > 0 ? 'positive' : 'negative');
}

// Comparative Analysis Dashboard
comparisonToggle.addEventListener('change', updateComparison);
comparisonMetricSelect.addEventListener('change', updateComparison);

function updateComparison() {
    if (!comparisonToggle.checked) {
        comparisonChart.data.datasets[0].data = [];
        comparisonChart.data.datasets[1].data = [];
        comparisonChart.update();
        comparisonTableBody.innerHTML = '';
        comparisonInsights.innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> Key Insights</h4>
            <p>Toggle comparison to see analysis</p>
        `;
        return;
    }
    
    if (riskScoreElement.textContent === '--/100') {
        comparisonInsights.innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> Key Insights</h4>
            <p>Generate your risk assessment to see comparison</p>
        `;
        return;
    }
    
    const currentRisk = parseInt(riskScoreElement.textContent);
    const currentPremium = parseInt(premiumElement.textContent.replace(/[^0-9]/g, ''));
    const age = parseInt(ageInput.value);
    const creditScore = parseInt(creditScoreInput.value);
    
    // Get factor values
    const ageFactor = parseFloat(document.getElementById('age-factor').dataset.value) || 0;
    const vehicleFactor = parseFloat(document.getElementById('vehicle-factor').dataset.value) || 0;
    const locationFactor = parseFloat(document.getElementById('location-factor').dataset.value) || 0;
    const creditFactor = parseFloat(document.getElementById('credit-factor').dataset.value) || 0;
    
    // Update chart based on selected metric
    const metric = comparisonMetricSelect.value;
    let userData = [];
    let marketData = [];
    
    if (metric === 'all') {
        userData = [
            currentRisk,
            currentPremium / 1000,
            Math.abs(ageFactor),
            Math.abs(vehicleFactor),
            Math.abs(locationFactor),
            Math.abs(creditFactor)
        ];
        marketData = [
            marketAverages.riskScore,
            marketAverages.premium / 1000,
            Math.abs(marketAverages.ageFactor),
            Math.abs(marketAverages.vehicleRisk),
            Math.abs(marketAverages.locationRisk),
            Math.abs(marketAverages.creditImpact)
        ];
    } else if (metric === 'risk') {
        userData = [currentRisk, 0, 0, 0, 0, 0];
        marketData = [marketAverages.riskScore, 0, 0, 0, 0, 0];
    } else if (metric === 'premium') {
        userData = [0, currentPremium / 1000, 0, 0, 0, 0];
        marketData = [0, marketAverages.premium / 1000, 0, 0, 0, 0];
    } else if (metric === 'age') {
        userData = [0, 0, age, 0, 0, 0];
        marketData = [0, 0, 42, 0, 0, 0];
    }
    
    comparisonChart.data.datasets[0].data = userData;
    comparisonChart.data.datasets[1].data = marketData;
    comparisonChart.update();
    
    // Update comparison table
    updateComparisonTable(currentRisk, currentPremium, ageFactor, vehicleFactor, locationFactor, creditFactor);
    
    // Generate insights
    generateInsights(currentRisk, currentPremium, age, creditScore);
}

function updateComparisonTable(currentRisk, currentPremium, ageFactor, vehicleFactor, locationFactor, creditFactor) {
    const tableData = [
        { metric: 'Risk Score', userValue: currentRisk, marketAvg: marketAverages.riskScore },
        { metric: 'Annual Premium (R)', userValue: currentPremium, marketAvg: marketAverages.premium },
        { metric: 'Age Impact', userValue: ageFactor, marketAvg: marketAverages.ageFactor },
        { metric: 'Vehicle Risk', userValue: vehicleFactor, marketAvg: marketAverages.vehicleRisk },
        { metric: 'Location Risk', userValue: locationFactor, marketAvg: marketAverages.locationRisk },
        { metric: 'Credit Impact', userValue: creditFactor, marketAvg: marketAverages.creditImpact }
    ];
    
    let tableHTML = '';
    tableData.forEach(item => {
        const difference = item.userValue - item.marketAvg;
        const diffClass = difference < 0 ? 'positive' : difference > 0 ? 'negative' : '';
        const diffSymbol = difference > 0 ? '+' : '';
        const formattedUserValue = typeof item.userValue === 'number' ? item.userValue.toFixed(1) : item.userValue;
        const formattedMarketAvg = item.marketAvg.toFixed(1);
        
        tableHTML += `
            <tr>
                <td>${item.metric}</td>
                <td>${formattedUserValue}</td>
                <td>${formattedMarketAvg}</td>
                <td class="${diffClass}">${diffSymbol}${difference.toFixed(1)}</td>
            </tr>
        `;
    });
    
    comparisonTableBody.innerHTML = tableHTML;
}

function generateInsights(currentRisk, currentPremium, age, creditScore) {
    const insights = [];
    
    if (currentRisk < 40) {
        insights.push('Your risk profile is better than 75% of our customers');
    } else if (currentRisk < 60) {
        insights.push('Your risk profile is average for your demographic');
    } else {
        insights.push('Consider improving your credit score to lower premiums');
    }
    
    if (currentPremium < marketAverages.premium * 0.9) {
        insights.push('You\'re paying 10% less than market average');
    } else if (currentPremium > marketAverages.premium * 1.1) {
        insights.push('Your premium is 10% higher than market average');
    }
    
    if (age < 25) {
        insights.push('Young drivers often see premium reductions after 3 years of clean driving');
    } else if (age > 60) {
        insights.push('Mature drivers may qualify for senior discounts');
    }
    
    if (creditScore > 750) {
        insights.push('Excellent credit score - you qualify for our best rates');
    } else if (creditScore < 600) {
        insights.push('Improving your credit could save 15% on premiums');
    }
    
    let insightsHTML = '<h4><i class="fas fa-lightbulb"></i> Key Insights</h4>';
    insights.forEach(insight => {
        insightsHTML += `<div class="insight-item">${insight}</div>`;
    });
    
    comparisonInsights.innerHTML = insightsHTML;
}

// Setup input validation
function setupInputValidation() {
    const inputs = [
        ageInput, 
        drivingExperienceInput, 
        vehicleTypeSelect, 
        vehicleValueInput, 
        locationSelect, 
        claimsHistorySelect, 
        creditScoreInput
    ];
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = '';
        });
        
        input.addEventListener('change', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = '';
        });
    });
}

// Auth modal functionality
loginBtn.addEventListener('click', function() {
    authModalOverlay.style.display = 'flex';
});

registerBtn.addEventListener('click', function() {
    authModalOverlay.style.display = 'flex';
    switchAuthTab('register');
});

closeModal.addEventListener('click', function() {
    authModalOverlay.style.display = 'none';
});

authModalOverlay.addEventListener('click', function(e) {
    if (e.target === authModalOverlay) {
        authModalOverlay.style.display = 'none';
    }
});

// Auth tabs functionality
authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchAuthTab(tabName);
    });
});

function switchAuthTab(tabName) {
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

// Login functionality
loginSubmit.addEventListener('click', function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        authModalOverlay.style.display = 'none';
        checkAuthStatus();
        showToast('Login successful!');
    } else {
        alert('Invalid email or password');
    }
});

// Register functionality
registerSubmit.addEventListener('click', function() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('User with this email already exists');
        return;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    authModalOverlay.style.display = 'none';
    checkAuthStatus();
    showToast('Registration successful!');
});

// Logout functionality
logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    checkAuthStatus();
    showToast('You have been logged out');
});

// Try demo without login
tryDemoBtn.addEventListener('click', function() {
    landingContent.style.display = 'none';
    appContent.style.display = 'block';
});

// Initialize when page loads
window.onload = function() {
    initializeCharts();
    checkAuthStatus();
    setupInputValidation();
    
    // Initialize factors with data attributes
    document.querySelectorAll('.factor-value').forEach(el => {
        el.dataset.value = "0";
    });
};