import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 text-center py-3">
      <div className="flex justify-between">
        <p className="text-gray-400 text-lg">© 2025 Fitness Tracker</p>
       <ThemeToggle />
      </div>

    </footer>
  );
}

