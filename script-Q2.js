document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobApplicationForm');
    const viewApplicationsBtn = document.getElementById('viewApplicationsBtn');
    const applicationsTable = document.getElementById('applicationsTable');
    const applicationsData = document.getElementById('applicationsData');
    let applications = [];


    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const applicationData = Object.fromEntries(formData.entries());
            applications.push(applicationData);
            console.log('Application submitted:', applicationData);
            form.reset();
            showAlert('Application submitted successfully!', 'success');
        }
    });

    // View applications button
    viewApplicationsBtn.addEventListener('click', function() {
        if (applications.length === 0) {
            showAlert('No applications submitted yet.', 'warning');
            return;
        }
        displayApplicationsTable();
        applicationsTable.style.display = 'block';
    });

    // Form validation
    function validateForm() {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            showAlert('Please fill out all required fields correctly.', 'danger');
            return false;
        }

        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'danger');
            return false;
        }

        const phone = document.getElementById('phone').value;
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            showAlert('Please enter a valid 10-digit phone number.', 'danger');
            return false;
        }

        return true;
    }

    // Display applications table
    function displayApplicationsTable() {
        const tbody = applicationsData.querySelector('tbody');
        tbody.innerHTML = '';
        applications.forEach(app => {
            const row = tbody.insertRow();
            row.insertCell().textContent = `${app.firstName} ${app.lastName}`;
            row.insertCell().textContent = app.email;
            row.insertCell().textContent = app.phone;
            row.insertCell().textContent = `${app.educationLevel} - ${app.school}`;
            row.insertCell().textContent = `${app.jobTitle} at ${app.company}`;
        });
    }

    // Show alert function
    function showAlert(message, type) {
        const alertPlaceholder = document.createElement('div');
        alertPlaceholder.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        form.parentNode.insertBefore(alertPlaceholder, form);

        // Auto-dismiss alert after 5 seconds
        setTimeout(() => {
            const alert = alertPlaceholder.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }

    // File input custom styling
    const fileInput = document.getElementById('resume');
    const fileLabel = document.querySelector('label[for="resume"]');
    fileInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name || 'No file chosen';
        fileLabel.textContent = fileName;
    });
});