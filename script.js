const elements = document.querySelectorAll('[id="course"]');
elements.forEach(ele => {
    ele.style.fontWeight = 'normal';
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let formData = new FormData(this);
    let formStatus = document.getElementById('form-status');
    
    fetch('https://formspree.io/f/mldrjral', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formStatus.innerHTML = "Thanks for your submission!";
            this.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form";
                }
            })
        }
    }).catch(error => {
        formStatus.innerHTML = "Oops! There was a problem submitting your form";
    });
});
