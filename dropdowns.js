// =====================
// Dropdown Data and Functions
// =====================

const genders = ["Male", "Female", "Other"];
const cities = ["Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam"];
const hospitals = ["Hospital A", "Hospital B", "Hospital C", "Hospital D"];
const purposes = ["Consultation", "Checkup", "Follow-up", "Emergency", "Routine Examination"];

const updateOptions = (elementId, items, selectCallback) => {
    const optionsContainer = document.getElementById(elementId);
    optionsContainer.innerHTML = items.length
        ? items.map(item => `<li onclick="${selectCallback}('${item}', this)">${item}</li>`).join('')
        : '<li class="no-results">Oops! No results found</li>';
};

const selectOption = (btnId, contentId, option, listItem) => {
    document.getElementById(btnId).firstChild.textContent = option;
    document.getElementById(contentId).classList.remove('active');
    const allOptions = document.querySelectorAll(`#${contentId} li`);
    allOptions.forEach(opt => opt.classList.remove('selected'));
    listItem.classList.add('selected');
};

// Track currently open dropdown
let openDropdown = null;

const closeOpenDropdown = () => {
    if (openDropdown) {
        openDropdown.classList.remove('active');
        openDropdown = null;
    }
};

// Initialize Dropdowns
updateOptions('gender-options', genders, 'selectGender');
updateOptions('city-options', cities, 'selectCity');
updateOptions('hospital-options', hospitals, 'selectHospital');
updateOptions('purpose-options', purposes, 'selectPurpose');

// Dropdown Selection Functions
window.selectGender = (gender, listItem) => selectOption('gender-btn', 'gender-content', gender, listItem);
window.selectCity = (city, listItem) => selectOption('city-btn', 'city-content', city, listItem);
window.selectHospital = (hospital, listItem) => selectOption('hospital-btn', 'hospital-content', hospital, listItem);
window.selectPurpose = (purpose, listItem) => selectOption('purpose-btn', 'purpose-content', purpose, listItem);

// City Search Filter
document.getElementById('city-search').addEventListener('input', function() {
    updateOptions('city-options', cities.filter(city => city.toLowerCase().includes(this.value.toLowerCase())), 'selectCity');
});

// Hospital Search Filter
document.getElementById('hospital-search').addEventListener('input', function() {
    updateOptions('hospital-options', hospitals.filter(hospital => hospital.toLowerCase().includes(this.value.toLowerCase())), 'selectHospital');
});

// Dropdown Toggle
document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (openDropdown && openDropdown !== content) {
            closeOpenDropdown();
        }
        content.classList.toggle('active');
        openDropdown = content.classList.contains('active') ? content : null;
    });
});

// Close dropdown when clicking outside
window.addEventListener('click', (event) => {
    if (!event.target.closest('.select-btn') && !event.target.closest('.content')) {
        closeOpenDropdown();
    }
});
