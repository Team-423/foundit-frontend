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
        <body className="bg-gray-200">
          <Header />
          <main>{children}</main>
          {/* footer */}
        </body>
      </html>
    </>
  );
}
