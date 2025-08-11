// map_functions.js
document.addEventListener('DOMContentLoaded', function () {

    // Function to open the video modal from the map iframe
    function openVideoPopup(fileName, startTime) {
        console.log('Attempting to open video modal');
        // Access the video element and modal in the parent document (iframe context)
        const videoElement = parent.document.getElementById('myVideo');
        const statusText = parent.document.getElementById('videoStatus');
        const modal = parent.document.getElementById('videoModal');

        if (!videoElement || !modal) {
            console.error("Video modal or video element not found");
            return;
        }

        // Set the video source
        videoElement.src = fileName;

        // Mute the video for autoplay
        videoElement.muted = true;

        // Display the modal
        modal.style.display = "flex";

        // Load the video after it's in the DOM
        videoElement.load();

        // Wait for metadata to be loaded
        videoElement.addEventListener('loadedmetadata', function playVideo() {
            // Set the start time
            videoElement.currentTime = startTime;

            // Attempt to autoplay the video
            const playPromise = videoElement.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Video is playing successfully
                    videoElement.muted = false; // Optionally unmute once playing
                    statusText.style.display = 'none'; // Hide the status text
                }).catch((error) => {
                    // Autoplay failed (likely due to browser policies)
                    statusText.style.display = 'block';
                    videoElement.muted = false; // Unmute for manual playback
                });
            }

            // Remove the event listener after playing
            videoElement.removeEventListener('loadedmetadata', playVideo);
        });
    }

    
    // Automatically reset the video to the beginning when it ends
    const videoElement = parent.document.getElementById('myVideo');
    if (videoElement) {
        videoElement.addEventListener('ended', function() {
            this.currentTime = 0; // Reset to the start when video ends
        });
    }

    
    function submitReason(idx) {
        var reasonElement = document.getElementById("reason_" + idx);
        var stressfulElement = document.getElementById("stressful_" + idx);
        var severityElement = document.getElementById("severity_" + idx);        

        var reasonValue = reasonElement.value || 'n/a';
        var wasStressfulValue = stressfulElement.value;
        var severityValue = parseInt(severityElement.value || 0, 10); // Convert to integer


        // Validation: Check if the "is_stressful" value is missing
        if (!wasStressfulValue) {
            showCustomAlert('The incident occurred field cannot be empty.', 'error');
            return;
        }

        var data = {
            index: idx,
            context: reasonValue,
            was_stressful: wasStressfulValue,
            severity_rating: severityValue
        };


        if (!wasStressfulValue) {
            // event.preventDefault();
            // alert('Please fill out both the reason and stressful fields.');
            showCustomAlert('The incident occured field cannot be empty.', 'error');
            return;

        } else {
            if (wasStressfulValue == 'Yes') {
                if (severityValue == 0 && reasonValue=='n/a') {
                    showCustomAlert('Please provide a severity rating and a description about the incident.', 'error');
                    return;
                } else if (severityValue==0) {
                    showCustomAlert('Please provide a severity rating of the the incident.', 'error');
                    return;
                } else if (reasonValue=='n/a') {
                    showCustomAlert('Please provide a description about the incident.', 'error');
                    return;
                }
            }
            

        }

            fetch('/update_reason', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Submission successful.");
                    var popup = document.getElementById("popup_" + idx);
                    if (popup) {
                        popup.innerHTML = `<span style="color: green; font-weight: bold;">Marked</span>`;
                    }
                    showCustomAlert('Update successful!', 'success');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showCustomAlert('Failed to update. Please try again.', 'error');

                });
        
    }


    // Function to show custom alerts
    function showCustomAlert(message, type) {
        // console.log("Custom alert is being created...");
        console.log("Custom alert function called with message:", message); // Add this


        // Create a div for the alert
        var alertDiv = document.createElement('div');
        alertDiv.textContent = message;

        // Apply styles based on success or error
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '400px';  // Position the alert at the top
        alertDiv.style.left = '50%';  // Center it horizontally
        alertDiv.style.transform = 'translateX(-50%)';  // Adjust the position to center it
        alertDiv.style.padding = '10px 20px';
        alertDiv.style.color = 'white';
        alertDiv.style.backgroundColor = (type === 'success') ? '#28a745' : '#dc3545'; // green for success, red for error
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.zIndex = '10000';
        alertDiv.style.fontFamily = 'Arial, sans-serif';
        alertDiv.style.fontSize = '16px';
        alertDiv.style.textAlign = 'center';
        alertDiv.style.opacity = '0';  // Start with hidden opacity for fade-in effect
        alertDiv.style.transition = 'opacity 0.5s';  // Add a transition for the fade-in/out

        // Append the alert to the body
        parent.document.body.appendChild(alertDiv);

        // Use requestAnimationFrame to ensure it's rendered
        requestAnimationFrame(() => {
            alertDiv.style.opacity = '1';  // Fade-in effect to ensure the element is visible
        });

        // Remove the alert after 2 seconds
        setTimeout(function() {
            alertDiv.style.opacity = '0';  // Fade out the alert
            setTimeout(function() {
                alertDiv.remove();  // Remove the alert from the DOM after the fade-out
            }, 500);  // Adjust delay to match the fade-out transition
        }, 2000);
    }

    // Expose functions globally (required when calling them from HTML)
    window.openVideoPopup = openVideoPopup;
    window.submitReason = submitReason;
});