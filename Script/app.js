"use strict";

// IIFE - Immediately Ivoked Function Expression

(function()
{

    function highLightActiveLink()
    {
        let title = document.title
        title = title.toLowerCase();
        console.log(`The title is ${title}`);

        let navbarAnchors = document.querySelectorAll("li a");

        for (const anchor of navbarAnchors)
        {
            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "about") && (anchorString === "index") || (title === anchorString))
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    function validateForm()
    {
        let contactForm = document.getElementsByTagName("form")[0];

        if(contactForm)
        {
            contactForm.noValidate = true;
            let errorMessage = document.getElementById("errorMessage");
            
            let firstName = document.getElementById("firstName");
            firstName.addEventListener("blur", (event) =>
            {
                if(firstName.value.length < 2)
                {
                    firstName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a valid first name. With at least 2 characters.";
                }
                else
                {
                    errorMessage.hidden = true;
                }
            });

            
            let lastName = document.getElementById("lastName");
            lastName.addEventListener("blur", (event) =>
            {
                if(lastName.value.length < 2)
                {
                    lastName.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a valid last name. With at least 2 characters.";
                }
                else
                {
                    errorMessage.hidden = true;
                }
            });

            let phoneNumber = document.getElementById("contactNumber");
            phoneNumber.addEventListener("blur", (event) =>
            {
                if(phoneNumber.value.match(/^\d{10}$/))
                {
                    errorMessage.hidden = true;
                }
                else
                {
                    phoneNumber.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a valid phone number with 10 digits and no symbols";
                }
            });

            let emailAdress = document.getElementById("contactNumber");
            emailAdress.addEventListener("blur", (event) =>
            {
                if(emailAdress.value.match(/^\d{10}$/))
                {
                    errorMessage.hidden = true;
                }
                else
                {
                    emailAdress.focus();
                    errorMessage.hidden = false;
                    errorMessage.textContent = "Please enter a valid phone number with 10 digits and no symbols";
                }
            });
        }

    }

    function Start ()
    {
        console.log('%cApp has started...', "color:purple; font-size: 24px;");

        let title = highLightActiveLink();

        let formValidation = validateForm();
        if(formValidation)
        {
            console.log("Successfully validated form");
        }
        else
        {
            console.warn("Form not validated - does not exist");
        }
    }

window.addEventListener("load", Start);

})();