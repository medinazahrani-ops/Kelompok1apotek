char="pilihan"
int="alas, tinggi, panjang, lebar"
tampilkan_pilihan = input("Masukkan pilihan (T=segitiga, P=persegi panjang): ")
if tampilkan_pilihan == "T":
    alas = float(input("Masukkan alas segitiga: "))
    tinggi = float(input("Masukkan tinggi segitiga: "))
    luas = (alas * tinggi) / 2
    print("Luas segitiga dengan alas", alas, "dan tinggi", tinggi, "adalah", luas)
elif tampilkan_pilihan == "P":
    panjang = float(input("Masukkan panjang persegi panjang: "))
    lebar = float(input("Masukkan lebar persegi panjang: "))
    luas = panjang * lebar
    print("Luas persegi panjang dengan panjang", panjang, "dan lebar", lebar, "adalah", luas)
else:
    print("Pilihan tidak valid")

lagi = input("\nApakah ingin menghitung luas (T/P)")

if tampilkan_pilihan == "T":
    alas = float(input("Masukkan alas segitiga: "))
    tinggi = float(input("Masukkan tinggi segitiga: "))
    luas = (alas * tinggi) / 2
    print("Luas segitiga dengan alas", alas, "dan tinggi", tinggi, "adalah", luas)
elif tampilkan_pilihan == "P":
    panjang = float(input("Masukkan panjang persegi panjang: "))
    lebar = float(input("Masukkan lebar persegi panjang: "))
    luas = panjang * lebar
    print("Luas persegi panjang dengan panjang", panjang, "dan lebar", lebar, "adalah", luas)
else:
    print("Pilihan tidak valid")