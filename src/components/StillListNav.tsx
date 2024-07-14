export function StillListNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="tablet:w-auto relative flex w-full flex-col items-center">
      {children}
    </nav>
  );
}
