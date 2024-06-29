import { UsersTable } from "@/components/dashboard/UsersTable";

export default function Users() {
  return (
    <>
      <div className="flex w-full flex-col bg-muted/100">
        <div className="flex flex-col">
          <UsersTable />
        </div>
      </div>
    </>
  );
}
