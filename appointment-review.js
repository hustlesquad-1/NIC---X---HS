 type="module"
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBgtzx3R7WkQ05sprADf_iiiVrHhuUSIJs",
            authDomain: "hospital-a1bcc.firebaseapp.com",
            databaseURL: "https://hospital-a1bcc-default-rtdb.firebaseio.com",
            projectId: "hospital-a1bcc",
            storageBucket: "hospital-a1bcc.appspot.com",
            messagingSenderId: "1011214120740",
            appId: "1:1011214120740:web:97c32f4885b59a665fe5b1"
        };

        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // Function to retrieve appointment data
        function loadAppointments() {
            const appointmentsRef = ref(database, 'appointments/');
            onValue(appointmentsRef, (snapshot) => {
                const data = snapshot.val();
                const appointmentDetailsBody = document.getElementById('appointment-details-body');
                appointmentDetailsBody.innerHTML = ''; // Clear existing data

                for (const key in data) {
                    const appointment = data[key];
                    const row = document.createElement('tr');
                    row.setAttribute('data-id', key); // Store the key in a data attribute
                    row.innerHTML = `
                        <td>${appointment.name}</td>
                        <td>${appointment.age}</td>
                        <td>${appointment.gender}</td>
                        <td>${appointment.phone}</td>
                        <td>${appointment.email}</td>
                        <td>${appointment.department}</td>
                        <td>${appointment.date}</td>
                        <td>${appointment.time}</td>
                        <td>${appointment.purpose}</td>
                        <td><button class="action-btn approve-btn">Approve</button></td>
                        <td><button class="action-btn reject-btn">Reject</button></td>
                    `;
                    appointmentDetailsBody.appendChild(row);
                }

                // Add event listeners for approve and reject buttons
                const approveButtons = document.querySelectorAll('.approve-btn');
                const rejectButtons = document.querySelectorAll('.reject-btn');

                approveButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = this.closest('tr');
                        const appointmentId = row.getAttribute('data-id');
                        // Remove the row from the table
                        row.remove();
                        // Optionally, remove the appointment from the database
                        const appointmentRef = ref(database, 'appointments/' + appointmentId);
                        remove(appointmentRef);
                    });
                });

                rejectButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const row = this.closest('tr');
                        const appointmentId = row.getAttribute('data-id');
                        const confirmation = confirm("Are you sure you want to reject this appointment?");
                        if (confirmation) {
                            // Remove the row from the table
                            row.remove();
                            // Optionally, remove the appointment from the database
                            const appointmentRef = ref(database, 'appointments/' + appointmentId);
                            remove(appointmentRef);
                        }
                    });
                });
            });
        }

        document.addEventListener('DOMContentLoaded', loadAppointments);
