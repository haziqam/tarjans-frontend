## Deskripsi

Projek ini merupakan aplikasi berbasis web fullstack yang dapat menerima input graf dan menemukan Strongly Connected Component (SCC) serta Bridges pada graf tersebut. Input graf, SCC, serta Bridge tersebut akan divisualisasikan pada aplikasi web pada projek ini.

### Strongly Connected Comoponents

Strongly Connected Component (SCC) adalah suatu upagraf di mana tiap simpul yang ada pada upagraf tersebut dapat dijangkau (reachable) dari simpul lainnya pada upagraf yang sama. Salah satu algoritma yang dapat digunakan untuk menemukan SCC adalah algoritma Tarjan. Algoritma Tarjan memanfaatkan Depth First Search (DFS) dalam pengunjungan simpul-simpul pada graf. Algoritma tarjan memanfaatkan informasi berikut

- Penelusuran secara DFS menghasilkan pohon/hutan DFS
- Suatu SCC merupakan upapohon dari pohon DFS
- Dengan menemukan akar dari upapohon yang berisi SCC, tiap simpul yang berada pada upapohon tersebut dapat ditandai sebagai SCC

### Bridges

Bridges adalah suatu simpul pada graf yang apabila dihapus akan meningkatkan jumlah komponen terhubung pada graf. Pada projek ini, graf diasumsikan berarah untuk pencarian SCC dan tidak berarah untuk pencarian bridges.

### Kompleksitas algoritma Tarjan

Misalkan graf terdiri atas himpunan simpul `V` dan sisi `E`. Pada penelusuran berbasis DFS, untuk mengunjungi setiap simpul pada graf, dibutuhkan sebanyak `|V|` tahap pengunjunggan simpul serta `|E|` tahap untuk melakukan runut balik (backtrack). Oleh karena itu, algoritma ini membutuhkan kompleksitas waktu `O(|V| + |E|)`

### Modifikasi yang dilakukan pada algoritma tarjan untuk mendeteksi bridges

Pada algoritma pendeteksi bridges, tidak diperlukan stack karena stack hanya diperlukan untuk mencatat SCC. Selain itu, terdapat pula perbedaan pada fungsi DFS. Misalkan U adalah simpul yang sedang dikunjungi saat ini. Maka, untuk setiap simpul V yang merupakan tetangga U, akan dilakukan pemanggilan fungsi DFS lagi dan setelah pemanggilan selesai, akan dilakukan pengecekan apakah V memiliki back edge terhadap U atau tidak. V dikatakan memiliki back edge apabila V terhubung dengan ansestor U. Apabila V memiliki back edge terhadap U, artinya U dapat dijangkau dari V meskipun sisi U-V dihapuskan, sehingga sisi U-V bukan bridge. Namun apabila V tidak memiliki back edge terhadap U, maka U tidak dapat dijangkau dari V jika sisi U-V dihapus, sehingga sisi U-V merupakan bridge. Pada fungsi DFS dibutuhkan parameter tambahan yaitu parent. Hal ini bertujuan agar simpul yang sedang dikunjungi tidak mengunjungi parentnya, sehingga pencarian back edge dapat dilakukan.

### Penjelasan jenis sisi (edge) yang ada pada graf

Pada penelusuran graf dengan DFS, terdapat beberapa jenis sisi.

- Tree edge: sisi graf yang terdapat pada pohon DFS. Tree edge merupakan sisi U-V, di mana U adalah parent dari V pada pohon DFS
- Forward edge: sisi U-V, di mana U adalah ansestor dari V tapi U bukan parent dari V pada pohon DFS
- Back edge: sisi U-V, di mana V adalah ansestor U tapi V bukan parent dari U pada pohon DFS. Adanya back edge mengindikasikan terdapat siklus (cycle) pada graf
- Cross edge: sisi U-V, di mana U bukan ansestor maupun desendan (keturunan) dari V pada pohon DFS

  Perhatikan gambar berikut.
  
  ![DFSedges](https://github.com/haziqam/tarjans-frontend/assets/103514359/654f9902-1572-4369-9138-e567838af8e3)


## Cara penggunaan aplikasi
<img width="960" alt="demo1" src="https://github.com/haziqam/tarjans-frontend/assets/103514359/b36a5bba-303d-4b1c-a234-07c840490154">
<img width="960" alt="demo2" src="https://github.com/haziqam/tarjans-frontend/assets/103514359/429ea328-08cb-4ae2-9410-20791bc15e58">
<img width="960" alt="demo3" src="https://github.com/haziqam/tarjans-frontend/assets/103514359/069229b5-a2c9-4662-81f3-cb4365576a40">

1. Jalankan aplikasi secara lokal
2. Masukkan data graf pada form graf. Berikut adalah contoh yang valid

```
A B
B C
C A
B D
D E
E F
F E
```

    Catatan: pada pencarian SCC, graf diasumsikan berarah, sehingga simpul A B != B A sedangkan pada pencarian bridges, graf diasumsikan tidak berarah, sehingga simpul A B == B A

3. Simpan data graf dengan menekan tombol `Save` pada form graf. Tampilan graf akan muncul pada bagian `Graph Preview`
4. Untuk mencari SCC, tekan tombol `Generate SCC`. Tampilan SCC akan muncul pada bagian `SCC Preview`. Waktu pencarian SCC akan ditampilkan pada notifikasi apabila pencarian berhasil
5. Untuk mencari bridges, tekan tombol `Generate Bridges`. Tampilan bridges akan muncul pada bagian `bridges Preview`. Waktu pencarian bridges akan ditampilkan pada notifikasi apabila pencarian berhasil

## Cara menjalankan aplikasi secara lokal

### Menjalankan backend

1. Pastikan Go telah terinstall dan workspace Go telah tersedia pada mesin anda. Workspace umumnya terletak pada direktori berikut

```
~/go/src
```

Apabila workspace belum tersedia, buatlah workspace pada komputer anda dengan command berikut

```
mkdir ~/go/src
```

tutorial Go: https://www.youtube.com/watch?v=C8LgvuEBraI

2. Masuk ke dalam workspace, kemudian download source code backend atau clone repositori backend

```
cd ~/go/src
git clone https://github.com/haziqam/tarjans-algo.git
```

3. Buka root directory projek, kemudian jalankan command berikut pada terminal untuk menjalankan server backend.

```
cd tarjans-algo
go run main.go
```

4. Secara default, server backend akan berjalan pada port 5000. Untuk mengubah port, buka source code `main.go` dan ganti nilai variabel `port` dan jalankan command pada langkah sebelumnya

### Menjalankan frontend

1. Pastikan node.js telah terinstall. Download source code frontend atau clone repositori frontend (lokasi direktori dibebaskan frontend)

```
git clone https://github.com/haziqam/tarjans-frontend.git
```

2. Buka root directory projek, kemudian install dependency

```
cd tarjans-frontend
npm install
```

3. Jalankan local development server dengan command berikut

```
npm run dev
```

4. Secara default, aplikasi akan berada pada port 3000 (URL dan port local akan ditampilkan di terminal setelah menjalankan command pada lagnkah sebelumnya). Click URL untuk menggunakan aplikasi (http://localhost:3000/)

## Teknologi yang digunakan

- Go, digunakan pada sisi backend aplikasi
- Next.js, digunakan pada sisi frontend aplikasi
- Vis.js, library untuk visualisasi graf
- PrimeReact, library untuk UI component
- CSS, untuk kustomisasi tampilan web

## Tautan GitHub

- Frontend: https://github.com/haziqam/tarjans-frontend.git
- Backend: https://github.com/haziqam/tarjans-algo.git

## Referensi

- https://github.com/williamfiset/algorithms
- https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/
- https://www.cs.yale.edu/homes/aspnes/pinewiki/DepthFirstSearch.html

## Penulis

- Haziq Abiyyu Mahdy (13521170)
