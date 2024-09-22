document.addEventListener('DOMContentLoaded', function () {
    const cities = ["Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai"];
    const hospitals = {
        "Mumbai": ["Hospital A", "Hospital B"],
        "Delhi": ["Hospital C", "Hospital D"],
        "Bengaluru": ["Hospital E", "Hospital F"],
        "Kolkata": ["Hospital G", "Hospital H"],
        "Chennai": ["Hospital I", "Hospital J"]
    };
    const wards = {
        "Hospital A": ["Ward 1", "Ward 2"],
        "Hospital B": ["Ward 3", "Ward 4"],
        "Hospital C": ["Ward 5", "Ward 6"],
        "Hospital D": ["Ward 7", "Ward 8"],
        "Hospital E": ["Ward 9", "Ward 10"],
        "Hospital F": ["Ward 11", "Ward 12"],
        "Hospital G": ["Ward 13", "Ward 14"],
        "Hospital H": ["Ward 15", "Ward 16"],
        "Hospital I": ["Ward 17", "Ward 18"],
        "Hospital J": ["Ward 19", "Ward 20"]
    };
    const bedData = [
        { city: "Mumbai", hospital: "Hospital A", ward: "Ward 1", beds: 10 },
        { city: "Mumbai", hospital: "Hospital A", ward: "Ward 2", beds: 8 },
        { city: "Mumbai", hospital: "Hospital B", ward: "Ward 3", beds: 12 },
        { city: "Delhi", hospital: "Hospital C", ward: "Ward 5", beds: 12 },
        { city: "Delhi", hospital: "Hospital C", ward: "Ward 6", beds: 6 },
        { city: "Delhi", hospital: "Hospital D", ward: "Ward 7", beds: 14 },
        { city: "Bengaluru", hospital: "Hospital E", ward: "Ward 9", beds: 20 },
        { city: "Bengaluru", hospital: "Hospital F", ward: "Ward 11", beds: 18 },
        { city: "Kolkata", hospital: "Hospital G", ward: "Ward 13", beds: 15 },
        { city: "Kolkata", hospital: "Hospital H", ward: "Ward 15", beds: 10 },
        { city: "Chennai", hospital: "Hospital I", ward: "Ward 17", beds: 22 },
        { city: "Chennai", hospital: "Hospital J", ward: "Ward 19", beds: 11 },
    ];

    // Populate cities dropdown
    const citySelect = document.getElementById('city-select');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    // Populate hospitals and wards based on selected city
    function updateHospitalOptions(city) {
        const hospitalSelect = document.getElementById('hospital-select');
        hospitalSelect.innerHTML = '<option value="">All Hospitals</option>';

        if (hospitals[city]) {
            hospitals[city].forEach(hospital => {
                const option = document.createElement('option');
                option.value = hospital;
                option.textContent = hospital;
                hospitalSelect.appendChild(option);
            });
        }
        updateWardOptions(''); // Reset ward options when city changes
    }

    function updateWardOptions(hospital) {
        const wardSelect = document.getElementById('ward-select');
        wardSelect.innerHTML = '<option value="">All Wards</option>';

        if (hospital && wards[hospital]) {
            wards[hospital].forEach(ward => {
                const option = document.createElement('option');
                option.value = ward;
                option.textContent = ward;
                wardSelect.appendChild(option);
            });
        }
    }

    // Update table with available beds and total beds
    function updateTable() {
        const selectedCity = document.getElementById('city-select').value;
        const selectedHospital = document.getElementById('hospital-select').value;
        const selectedWard = document.getElementById('ward-select').value;

        const tbody = document.getElementById('beds-table').querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        let filteredData = bedData;

        // Apply filters based on user selection
        if (selectedCity) {
            filteredData = filteredData.filter(data => data.city === selectedCity);
        }
        if (selectedHospital) {
            filteredData = filteredData.filter(data => data.hospital === selectedHospital);
        }
        if (selectedWard) {
            filteredData = filteredData.filter(data => data.ward === selectedWard);
        }

        // Initialize total number of beds for the table
        let totalAvailableBeds = 0;
        let totalBeds = 0; // Assume total beds are always fixed

        // Update table with filtered data and add a "Total Beds" column
        filteredData.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.city}</td>
                <td>${data.hospital}</td>
                <td>${data.ward}</td>
                <td>${data.beds}</td>
                <td>30</td> <!-- Assume each ward has a total of 30 beds -->
            `;
            tbody.appendChild(row);

            // Sum up available beds for total available beds
            totalAvailableBeds += data.beds;
            totalBeds += 30; // Add 30 for each entry (or use dynamic data for total beds)
        });

        // Add a final row for the total available beds and total beds
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>${totalAvailableBeds}</strong></td>
            <td><strong>${totalBeds}</strong></td>
        `;
        tbody.appendChild(totalRow);
    }

    // Event listeners for dropdown changes
    citySelect.addEventListener('change', function () {
        updateHospitalOptions(this.value);
        updateTable(); // Update table when city changes
    });

    document.getElementById('hospital-select').addEventListener('change', function () {
        updateWardOptions(this.value);
        updateTable(); // Update table when hospital changes
    });

    document.getElementById('ward-select').addEventListener('change', updateTable); // Update table when ward changes

    // Initialize with the first city
    updateHospitalOptions(cities[0]);
    updateTable();

    // Event listener for the hospital link
    document.getElementById("hospital-link").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.location.href = "hab.html"; // Redirect to hab.html
    });
});
