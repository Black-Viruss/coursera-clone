document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chat-icon');
    const chatbox = document.getElementById('chatbox');
    const closeBtn = document.getElementById('close-btn');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const chatboxAnswer = document.getElementById('chatbox-answer');

    // Open chatbox when the chat icon is clicked
    chatIcon.addEventListener('click', function() {
        chatbox.style.display = 'block';
    });

    // Close chatbox when the close button is clicked
    closeBtn.addEventListener('click', function() {
        chatbox.style.display = 'none';
        chatboxAnswer.style.display = 'none'; // Hide answer when chatbox is closed
    });

    // Show the answer when a question is clicked
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.getAttribute('data-answer');
            chatboxAnswer.textContent = answer;
            chatboxAnswer.style.display = 'block';
        });
    });
});
