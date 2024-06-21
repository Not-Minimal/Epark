import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <h1 className="font-bold text-xl">E-park</h1>
        <Button>Login</Button>
      </div>
    </div>
  );
}
