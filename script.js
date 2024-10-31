let items = null;
let customers = null;
let orders = [];
document.addEventListener("DOMContentLoaded", function () {
    
    async function loadCustomers() {
        try {
            const res = await fetch('../jsones/customers.json');
            const data = await res.json();
            customers = data;
            console.log(customers);


        } catch (error) {
            console.log('error loading customers (customers)', error);
        }

    }
    loadCustomers();
    
    async function loadItems() {
        try {
            const res = await fetch('../jsones/items.json');
            const data = await res.json();
            items= data;
           console.log(items)
        } catch (error) {
            console.log('erron loading items (items)',error);
        }
    }
    loadItems();
     $(document).ready(function() {
            $('.hamburger').on('click', function() {
                $('.sidebar').toggleClass('show');
            });

            // Close sidebar when a link is clicked on small screens
            $('.sidebar a').on('click', function() {
                $('.sidebar').removeClass('show');
            });
        });
    const links = document.querySelectorAll('nav > a');
    const dynamicContent = document.getElementById('dynamic_content');

    function loadContent(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok ${response.statusText}`);
                }
                return response.text();
            })
            .then(responseText => {
                // Clear the previous content
                dynamicContent.innerHTML = '';

                // Parse the response text
                // const tempContainer = document.createElement('div');
                // tempContainer.innerHTML = responseText;
                // dynamicContent.appendChild(tempContainer);
                dynamicContent.innerHTML=responseText;

                // Load external scripts
                const scripts = dynamicContent.querySelectorAll('script[src]');
                scripts.forEach(script => {
                    const existingScript = document.querySelector(`script[src="${script.src}"]`);
                    if (existingScript) {
                        existingScript.remove();
                    }
                    const newScript = document.createElement('script');
                    newScript.src = `${script.src}?t=${new Date().getTime()}`;
                    newScript.onload = () => console.log(`Script loaded: ${script.src}`);
                    newScript.onerror = () => console.error(`Error loading script: ${script.src}`);
                    document.body.appendChild(newScript);
                });

                // Execute inline scripts
                const inlineScripts = dynamicContent.querySelectorAll('script:not([src])');
                inlineScripts.forEach(script => {
                    try {
                        console.log('Executing inline script:', script.textContent);
                        (function () {
                            eval(script.textContent);
                        })();
                    } catch (e) {
                        console.error('Error executing inline script:', e);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading content:', error);
                dynamicContent.innerHTML = '<p>Error loading content. Please try again later.</p>';
            });
    }

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            const file = this.getAttribute('data-file'); // Get the file name from data-file attribute
            loadContent(file);
        });
    });

    // Optionally, load the default content (e.g., home.html) from the subfolder
    const defaultFile = links[0].getAttribute('data-file');
    loadContent(defaultFile);

    
});
