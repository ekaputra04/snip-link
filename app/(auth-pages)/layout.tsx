/**
 * The main layout component for all auth pages.
 *
 * It renders a vertically stacked page with a maximum width of 7xl.
 */
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-12 max-w-7xl">{children}</div>
  );
}
