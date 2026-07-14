// Data Harga Obat untuk Referensi Sistem Utama
const MEDICINE_PRICES = {
    qty1: 8500,  // Paracetamol 500mg
    qty2: 14000, // Amoxicillin 500mg
    qty3: 35000  // Vitamin C 1000mg
};

// Helper Utility: Mengubah angka murni menjadi format Rupiah terstandardisasi
function formatToRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Inisialisasi Fungsi Utama saat Dokumen Selesai Dimuat oleh Browser
document.addEventListener("DOMContentLoaded", function() {
    // 1. Render seluruh SVG Ikon Lucide yang ada di berkas HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Gagal memuat Lucide Icons library. Pastikan CDN terpasang.");
    }

    // 2. Logika tambahan: Deteksi status aktif menu navigasi (Opsional)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('text-white', 'font-semibold', 'border-b-2', 'border-emerald-400'));
            this.classList.add('text-white', 'font-semibold', 'border-b-2', 'border-emerald-400');
        });
    });
});