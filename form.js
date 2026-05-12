const forminit = new Forminit();
const FORM_ID = 'pka3sexbnu5';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const statusText = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('.sendBtn');
    const phoneInput = document.getElementById('phone-input');
    const hiddenPhone = document.getElementById('hidden-phone');

    // --- FORM SUBMISSION LOGIC ---
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        statusText.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const finalData = new FormData();

            const getValue = (name) => {
                const el = contactForm.querySelector(`[name="${name}"]`);
                return el ? el.value : "";
            };

            // 1. Grab the Full Name directly from your HTML name="fi-sender-fullName"
            finalData.append("fi-sender-fullName", getValue("fi-sender-fullName"));

            // 2. Append other fields exactly as they appear in your HTML
            finalData.append("fi-sender-email", getValue("fi-sender-email"));
            finalData.append("fi-sender-phone", hiddenPhone.value);
            finalData.append("fi-sender-city", getValue("fi-sender-city"));
            finalData.append("fi-sender-address", getValue("fi-sender-address"));
            finalData.append("fi-text-message", getValue("fi-text-message"));

            const { data, error } = await forminit.submit(FORM_ID, finalData);

            submitBtn.disabled = false;
            statusText.textContent = "";

            if (error) {
                const errorBody = document.getElementById('errorToastbody');
                if (errorBody) errorBody.textContent = error.message;
                
                const errToastEl = document.getElementById('errorToast');
                if (errToastEl) {
                    const errToast = new bootstrap.Toast(errToastEl);
                    errToast.show();
                }
                return;
            }

            // --- SUCCESS ---
            contactForm.reset();
            hiddenPhone.value = "";
            const successToastEl = document.getElementById('successToast');
            if (successToastEl) {
                const successToast = new bootstrap.Toast(successToastEl);
                successToast.show();
            }

        } catch (err) {
            console.error("Submission Error:", err);
            statusText.textContent = "";
            submitBtn.disabled = false;
            const errorBody = document.getElementById('errorToastbody');
            if (errorBody) errorBody.textContent = "Connection error.";
            const errToastEl = document.getElementById('errorToast');
            if (errToastEl) new bootstrap.Toast(errToastEl).show();
        }
    });

    // --- PHONE FORMATTING LOGIC ---
    if (phoneInput && hiddenPhone) {
        phoneInput.addEventListener('input', (e) => {
            let numbers = e.target.value.replace(/\D/g, '');
            hiddenPhone.value = numbers.length > 0 ? "+" + numbers : "";
            if (numbers.length === 0) { e.target.value = ""; return; }
            let formattedValue = "+";
            let x = numbers.match(/(\d{0,4})(\d{0,3})(\d{0,2})(\d{0,2})/);
            let parts = [];
            if (x[1]) parts.push(x[1]);
            if (x[2]) parts.push(x[2]);
            if (x[3]) parts.push(x[3]);
            if (x[4]) parts.push(x[4]);
            formattedValue += parts.join('-');
            if (numbers.length > 11) formattedValue += "+" + numbers.substring(11);
            e.target.value = formattedValue;
        });
    }
});