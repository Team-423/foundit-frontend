import Header from "./header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          {/* footer */}
        </body>
      </html>
    </>
  );
}
