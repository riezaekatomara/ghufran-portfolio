import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-background">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3">
            Ghufran Travel
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Travel terpercaya untuk perjalanan umroh dan haji Anda. Memberikan
            pelayanan terbaik dengan harga bersahabat.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/paket"
                className="hover:text-primary transition-colors"
              >
                Paket
              </Link>
            </li>
            <li>
              <Link
                href="/daftar"
                className="hover:text-primary transition-colors"
              >
                Daftar
              </Link>
            </li>
            <li>
              <Link
                href="/kontak"
                className="hover:text-primary transition-colors"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📍 Jakarta, Indonesia</li>
            <li>📞 +62 812 3456 7890</li>
            <li>✉️ info@ghufrantravel.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-primary">Ghufran Travel</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
