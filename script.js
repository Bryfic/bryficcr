document.addEventListener('DOMContentLoaded', function() {
    const countdown = document.getElementById('countdown');
    const launchMessage = document.getElementById('launchMessage');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    // Tanggal peluncuran yang sudah disesuaikan (sekitar 1 bulan dari sekarang)
    // Format: Bulan Tanggal, Tahun Jam:Menit:Detik
    const launchDate = new Date('August, 2026 09:00:00').getTime(); // Contoh: 25 Juni 2025, jam 09:00 pagi

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        // Perhitungan waktu untuk hari, jam, menit, dan detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Tampilkan hasil dalam elemen yang sesuai, dengan padding nol di depan jika angkanya kurang dari 10
        daysSpan.innerHTML = String(days).padStart(2, '0');
        hoursSpan.innerHTML = String(hours).padStart(2, '0');
        minutesSpan.innerHTML = String(minutes).padStart(2, '0');
        secondsSpan.innerHTML = String(seconds).padStart(2, '0');

        // Jika hitungan mundur selesai (waktu sudah lewat)
        if (distance < 0) {
            clearInterval(countdownInterval); // Hentikan interval hitungan mundur
            countdown.style.display = 'none'; // Sembunyikan hitungan mundur
            launchMessage.style.display = 'block'; // Tampilkan pesan peluncuran
            // Opsional: Anda bisa menambahkan redirect ke halaman utama blog di sini
            // window.location.href = "https://www.bryfic.com/blog"; // Ganti dengan URL blog Anda
        }
    }

    // Perbarui hitungan mundur setiap 1 detik
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Panggil updateCountdown sekali saat halaman dimuat untuk menghindari penundaan 1 detik pertama
    updateCountdown();

    // Animasi interaktif pada elemen ilustrasi
    const heroIllustration = document.querySelector('.hero-illustration');
    if (heroIllustration) {
        heroIllustration.addEventListener('mousemove', (e) => {
            const rect = heroIllustration.getBoundingClientRect();
            // Hitung posisi mouse relatif terhadap elemen ilustrasi (dari -0.5 hingga 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Efek parallax sederhana pada ilustrasi utama
            const placeholder = heroIllustration.querySelector('.illustration-placeholder');
            if (placeholder) {
                // Gerakan 10px dari pusat
                placeholder.style.transform = `translate(${x * 15}px, ${y * 15}px)`; // Corrected line
            }

            // Efek parallax pada floating elements
            const floatingElems = heroIllustration.querySelectorAll('.floating-elements .elem');
            floatingElems.forEach((elem, index) => {
                const speed = (index + 1) * 8; // Kecepatan berbeda untuk setiap elemen
                elem.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${index * 10 + (x * 5)}deg)`; // Corrected line
            });
        });

        heroIllustration.addEventListener('mouseleave', () => {
            // Kembali ke posisi awal (tanpa translate) saat mouse meninggalkan area
            const placeholder = heroIllustration.querySelector('.illustration-placeholder');
            if (placeholder) {
                placeholder.style.transform = 'translate(0, 0)';
            }
            const floatingElems = heroIllustration.querySelectorAll('.floating-elements .elem');
            floatingElems.forEach((elem) => {
                elem.style.transform = 'translate(0, 0) rotate(0deg)';
            });
        });
    }

    // Anda bisa menambahkan animasi scroll atau interaksi lain di sini jika diperlukan di masa depan
});