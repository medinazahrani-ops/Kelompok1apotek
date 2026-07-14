/* order-script.js */

// Inisialisasi library ikon Lucide setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();
});

// Fungsi pengubah jumlah item (kuantitas obat)
// Data Harga Dasar Obat
const medicinePrices = {
    qty1: 8500,  // Paracetamol
    qty2: 14000, // Amoxicillin
    qty3: 35000  // Vitamin C
};
const defaultShipping = 15000;

// Format Angka ke Rupiah
function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

// Fungsi Hitung Keseluruhan Harga (Subtotal, Ongkir, Total)
function updateTariff() {
    const e1 = document.getElementById('qty1');
    const e2 = document.getElementById('qty2');
    const e3 = document.getElementById('qty3');

    if (!e1 || !e2 || !e3) return;

    const q1 = parseInt(e1.innerText) || 0;
    const q2 = parseInt(e2.innerText) || 0;
    const q3 = parseInt(e3.innerText) || 0;

    const totalItem = q1 + q2 + q3;
    const subtotal = (q1 * medicinePrices.qty1) + (q2 * medicinePrices.qty2) + (q3 * medicinePrices.qty3);
    
    // Logika Ongkir: jika tidak ada obat yang dipilih, ongkir jadi Rp 0
    let currentShippingCost = totalItem > 0 ? defaultShipping : 0;
    const totalEstimasi = subtotal + currentShippingCost;

    // Tampilkan ke Layar HTML
    if (document.getElementById('subtotal-display')) {
        document.getElementById('subtotal-display').innerText = formatRupiah(subtotal);
    }
    if (document.getElementById('shipping-display')) {
        document.getElementById('shipping-display').innerText = formatRupiah(currentShippingCost);
    }
    if (document.getElementById('total-display')) {
        document.getElementById('total-display').innerText = formatRupiah(totalEstimasi);
    }
}

// Fungsi Pengubah Jumlah Obat (+ / -) yang Dipicu dari HTML
function changeQty(elementId, change) {
    const qtyElement = document.getElementById(elementId);
    if (!qtyElement) return;

    let currentQty = parseInt(qtyElement.innerText) || 0;
    currentQty += change;

    // Batasi agar tidak bisa minus di bawah 0
    if (currentQty < 0) currentQty = 0;

    qtyElement.innerText = currentQty;
    
    // Hitung ulang harga keseluruhan sesaat setelah angka berubah
    updateTariff();
}

// Jalankan kalkulasi saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function() {
    updateTariff();
});


// Fungsi animasi Toast Notification modern
function showToast(message) {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-3 bg-[#1e222b] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 transition-all duration-300 transform translate-y-4 opacity-0 text-xs font-semibold';
    toast.innerHTML = `
        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons(); // perbarui ikon baru di dalam toast

    // Animasi masuk
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    // Animasi keluar dan penghapusan elemen setelah 3 detik
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Integrasi Fitur Unggah Resep Dokter
document.addEventListener("DOMContentLoaded", function() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('prescription-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('prescription-preview');
    const pdfIcon = document.getElementById('pdf-icon');
    const fileNameText = document.getElementById('file-name');
    const fileSizeText = document.getElementById('file-size');
    const btnDelete = document.getElementById('btn-delete-prescription');

    // Memicu klik jendela file manager saat area dashed ditekan
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
    }

    // Membaca file resep yang dimasukkan pasien
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];

            if (file) {
                // Validasi batas ukuran file (Maks 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Ukuran file terlalu besar! Maksimal batas ukuran adalah 5MB.');
                    this.value = ''; 
                    return;
                }

                fileNameText.innerText = file.name;
                fileSizeText.innerText = (file.size / 1024).toFixed(1) + ' KB';

                // Tampilkan preview foto jika file berupa gambar
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        previewImage.classList.remove('hidden');
                        pdfIcon.classList.add('hidden');
                    };
                    reader.readAsDataURL(file);
                } 
                // Tampilkan ikon berkas jika file berupa dokumen PDF
                else if (file.type === 'application/pdf') {
                    previewImage.classList.add('hidden');
                    pdfIcon.classList.remove('hidden');
                }

                previewContainer.classList.remove('hidden');
            }
        });
    }

    // Fungsi membatalkan/menghapus file resep
    if (btnDelete) {
        btnDelete.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah memicu klik area dashed secara tidak sengaja
            fileInput.value = ''; 
            previewImage.src = '';
            previewContainer.classList.add('hidden');
        });
    }
});

// Handler pengiriman formulir pesanan
function submitOrder(event) {
    event.preventDefault();
    showToast('Pesanan obat berhasil dikirim! Menunggu konfirmasi apoteker.');
}