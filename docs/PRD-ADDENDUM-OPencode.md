# PRD ADDENDUM — OPencode WORKING PROTOCOL
> Superset ke master PRD. Atur cara kerja, bukan hasil akhir.
> Fokus: ngubah "harus keliatan bagus" jadi "harus lulus angka X".

## 0. REALITAS KAPABILITAS (baca dulu)

Model yang jalanin ini **gak punya vision input**. Artinya:
- GAK BISA: "bandingin dengan referensi", "cek balance", "nilai hierarki", "terlalu kosong", "aneh"
- BISA: pixel-exact geometry, alpha-channel collision, coverage grid, timing, DOM audit, build/lint/test

Konsekuensi: **setiap requirement visual HARUS diconvert jadi angka** di addendum ini.
Kalau gak ada angkanya, itu tugas USER (lo) buat verify via screenshot checkpoint.

Referensi `94363.png` saat ini **tidak ada di filesystem**. Kalau mau dipakai:
```
letakkan di /home/wijaya/folder\ web\ sukma/fotofolio\ wijaya/reference/94363.png
```
Setelah itu user bisa request "compare section X" dan model akan extract
geometry dari PNG referensi (PIL) lalu bandingkan numerik dengan render.

---

## 1. GATE NUMERIK HERO (1536×864)

Semua angka ini diverifikasi via script, bukan klaim.

| Check | Gate | Cara verifikasi |
|---|---|---|
| Person center-X | 50.0% ± 1% (768±8px) | bounding box center vs viewport |
| Person head top-Y | ≤ 200px (no head crop) | alpha bbox top vs viewport 0 |
| Person feet bottom | == viewport bottom (0px float) | alpha bbox bottom vs 864 |
| Person width | 410–470px | img rendered width |
| Aspect ratio | preserved (ratio delta < 0.5%) | rendered ratio vs asset ratio |
| Right cluster clearance | ≥ 40px dari figure silhouette | alpha-pixel mapping (bukan bbox!) |
| Title "WIJAYA" | height 130–185px, top ≤ 80px | font metrics |
| Slogan | width ≥ 45% viewport | bbox |
| Accidental overlap | 0 (kecuali title/slogan/person deliberate) | pairwise bbox ∩ alpha check |
| scrollWidth | ≤ innerWidth + 1 | DOM |

**Rule keras:** cluster kanan/kiri yang geser, BUKAN person.
Person off-center > 1% = FAIL, fix cluster-nya.

---

## 2. DEAD-SPACE GATE (semua section, semua viewport)

Metric: grid coverage 24×14 cell, content = img/svg/text-leaf.

| Section | Min coverage | Max empty block |
|---|---|---|
| hero | 60% | 15% |
| about | 40% | 25% |
| journey | 45% | 20% |
| skills | 45% | 20% |
| work | 35% | 25% |
| projects | 55% | 20% |
| case-study | 70% | 15% |
| education | 45% | 22% |
| achievements | 40% | 22% |
| creative-lab | 50% | 25% |
| manifesto | 30% (typo-driven) | 30% (boleh, ada teks raksasa) |
| contact | 40% | 25% |

Section dengan coverage < minimum = dead viewport = wajib isi konten,
BUKAN tambah dekorasi random.

---

## 3. CONTENT GATE (ini yang paling sering kelewat)

Layout sempurna pun gak akan keliatan jadi kalau isinya placeholder.
Status sekarang (cek ulang tiap sesi):

- [ ] projects.ts → "PROJEK NAMA" masih placeholder
- [ ] education.ts → "XX" certificates placeholder
- [ ] achievements.ts → "99+" stats placeholder
- [ ] gallery.ts → "SPECIMEN NN" placeholder
- [ ] experiences.ts → role/org placeholder
- [ ] journey.ts → process stages (sudah non-factual, AMAN)
- [ ] skills.ts → real tooling (AMAN)
- [ ] profile.ts → real data (AMAN)

**Rule:** placeholder yang labeled editable = boleh ada (PRD §51).
Tapi harus konsisten — jangan sebagian "99+" sebagian kosong.

---

## 4. FEEDBACK PROTOCOL (cara lo request perbaikan)

Jangan bilang "kurang bagus". Bilang gini:

```
fix: [section] [elemen] [masalah] [koordinat]
contoh: fix: hero person head 40px terlalu rendah, mungkin kepotong title
contoh: fix: journey stage-03 card ketutup route line
contoh: fix: skills module grid ada gap 80px kosong di row-2
```

Model balas dengan: angka sebelum → angka sesudah → re-screenshot.
Kalau lo bilang "bagus" tanpa angka, model cuma bisa tebak.

---

## 5. CHECKPOINT SCREENSHOT WAJIB

Tiap sesi visual fix, model WAJIB capture (path fixed):
- /tmp/opencode/chk-hero-1536.png
- /tmp/opencode/chk-hero-390.png
- /tmp/opencode/chk-[sectionid]-1536.png (section yang diutak-atik)

User review screenshot itu, kasih verdict PASS atau fix-list terstruktur.
Model dilarang klaim "sudah bagus" sebelum verdict PASS dari user.

---

## 6. URUTAN PRIORITAS NEXT SESSION

1. Isi content data asli (project, education, achievement) — paling impact
2. User supply reference PNG kalau ada → extract geometry referensi
3. Visual pass per-section dengan verdict user
4. Micro-polish: spacing rhythm, corner radius consistency, shadow levels

---

## 7. DILARANG

- Klaim visual fix tanpa screenshot + angka
- Tambah dekorasi untuk nutupin dead space (PRD anti-slop §M)
- Pindah person demi ngindarin cluster (prioritas: pindah cluster)
- Rebuild project dari nol (addendum, bukan rewrite)
- Invfak data (tetap labeled placeholder sampai user supply)
