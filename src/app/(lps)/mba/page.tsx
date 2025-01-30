import { Hero } from "../components/Hero";

export default function DashboardPage() {
  return (
    <div>
      <Hero />
      <h1>Welcome to the Dashboard</h1>
      <p>This is isolated from the global layout.</p>
    </div>
  );
}
