import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Pencil, Plus } from "lucide-react"

const users = [
  { id: 1, name: "Joseph Martinez", email: "olivia.rodriguez@example.com", role: "Admin" },
  { id: 2, name: "Sophia Hernandez", email: "jacob.davis@example.com", role: "Editor" },
  { id: 3, name: "Isabella Anderson", email: "ava.martinez@example.com", role: "Editor" },
  { id: 4, name: "Joseph Martinez", email: "michael.kim@example.com", role: "Editor" },
]

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor all system users and their roles</p>
        </div>
        <Button className="bg-[#F16F00] hover:bg-[#F16F00]/90 text-white shrink-0 gap-2">
          <Plus className="size-4" />
          Add New User
        </Button>
      </div>

      {/* Users Table Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">All Users</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-foreground font-semibold">Role</TableHead>
                  <TableHead className="text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell className="text-foreground font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={
                          user.role === "Admin"
                            ? "text-[#F16F00] font-medium"
                            : "text-teal-400 font-medium"
                        }
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="destructive" size="icon">
                          <Trash2 />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
