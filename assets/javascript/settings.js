/* script.js */
// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();
});

// Function to Switch Tabs
function switchTab(tabId) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.replace('block', 'hidden');
    });
    
    // Show selected content
    document.getElementById(`tab-${tabId}`).classList.replace('hidden', 'block');
    
    // Reset all buttons style
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-slate-100', 'text-blue-600');
        btn.classList.add('text-slate-600', 'hover:bg-slate-50');
    });
    
    // Add active style to selected button
    const activeBtn = document.getElementById(`btn-${tabId}`);
    activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-50');
    activeBtn.classList.add('bg-slate-100', 'text-blue-600');
}

// Custom Modern Toast Notification
function showToast(message) {
    const container = document.getElementById('toast-container');
    
    // Create element
    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-3 bg-[#1e222b] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 transition-all duration-300 transform translate-y-4 opacity-0 text-xs font-semibold';
    toast.innerHTML = `
        <i data-lucide="check-circle" class="w-4 h-4 text-green-400"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();

    // Trigger animation in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    // Trigger animation out and remove
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Form Submit Handler
function handleSave(event) {
    event.preventDefault();
    showToast('Pengaturan Anda berhasil diperbarui!');
}
